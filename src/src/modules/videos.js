export default function videos() {
  const toggles = document.getElementsByClassName("video-toggle");
  const videoContainers = document.getElementsByClassName("video-container");

  function clickHandler(e) {
    const videoItemId = `video-${e.target.attributes["data-id"].value}`;
    const video = document.getElementById(videoItemId);
    if (video) {
      if (e.target.innerText === "Show Video") {
        e.target.innerText = "Hide Video";
        video.classList.remove("hidden");
        loadVideo(video);
      } else {
        video.classList.add("hidden");
        e.target.innerText = "Show Video";
      }
    }
  }

  function loadVideo(video) {
    const iframes = video.getElementsByTagName("iframe");
    if (iframes) {
      if (iframes &&
        !iframes[0].attributes["src"] &&
        iframes[0].attributes["data-src"]) {
        const dataSrc = iframes[0].attributes["data-src"].value;
        iframes[0].setAttribute("src", dataSrc);
      }
    }
  }

  // Wire up clicks
  if (toggles) {
    for (let x = 0; x < toggles.length; ++x) {
      toggles[x].addEventListener("click", clickHandler);
    }
  }

  if (videoContainers) {
    for (let x = 0; x < videoContainers.length; ++x) {
      if (videoContainers[x].classList.contains("auto-load"))
        loadVideo(videoContainers[x]);
    }
  }
}
