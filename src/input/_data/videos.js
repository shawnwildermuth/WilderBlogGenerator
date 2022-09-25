const Cache = require("@11ty/eleventy-cache-assets");
const keys = require("./keys");
const otherVideos = require("./thirdPartyVideos.json");

module.exports = async function () {
  if (!keys.youtube) {
    console.log("YOUTUBE KEY MISSING");
    return;
  }

  try {
    const playlists = [
      {
        name: "Coding Shorts",
        id: "PLtOvnDRdH12fj4eLqBmjgCfdvsh2u3tN9",
        order: 1,
        omit: "Coding Shorts: ",
      },
      {
        name: "Shawn's Rants",
        id: "PLtOvnDRdH12eDLwEdCwK-YrZXQ_vhJrHv",
        order: 2,
        omit: "Shawn's Rants - ",
      },
      {
        name: "The Maintainers",
        id: "PLtOvnDRdH12eFFFW3M3mp_HHyT0WJoyHf",
        order: 3,
        omit: "The Maintainers: ",
      },
    ];

    otherVideos.forEach((i) => {
      if (!i.previewImageUrl) {
        if (i.videoType === "YouTube") {
          i.previewImageUrl = `https://i.ytimg.com/vi/${i.videoCode}/mqdefault.jpg`;
        } else {
          i.previewImageUrl = "/img/videoplaceholder.jpg";
        }
      }
    });

    let data = {
      categorized: [],
      all: [...otherVideos],
    };

    playlists.forEach(async (playlist) => {
      const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=snippet&maxResults=50&playlistId=${playlist.id}&key=${keys.youtube}`;

      /* This returns a promise */
      const response = await Cache(url, {
        duration: "4h", // save for 4 hours
        type: "json", // we’ll parse JSON for you
      });

      let playListItems = response.items
        .filter((i) => i.contentDetails.videoPublishedAt)
        .map((n) => {
          return {
            videoCode: n.contentDetails.videoId,
            title: n.snippet.title.replace(playlist.omit, ""),
            description: "",
            videoType: "YouTube",
            datePublished: n.contentDetails.videoPublishedAt,
            previewImageUrl: n.snippet.thumbnails.medium
              ? n.snippet.thumbnails.medium.url
              : "",
          };
        });

      data.categorized.push({
        name: playlist.name,
        items: playListItems,
        order: playlist.order,
      });
      playListItems.forEach((i) => data.all.push(i));
    });

    data.categorized.push({
      order: 999,
      name: "Other",
      items: otherVideos,
    });

    return data;
  } catch (e) {
    console.log(`VIDEOS FAILED TO PROCESS: ${e}`);
  }
};
