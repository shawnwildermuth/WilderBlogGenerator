module.exports = {
  eleventyComputed: {
    title: data => `Hello World Podcast: ${data.episode.guestName} (#${data.episode.episodeNumber})`,
    pageBlurb: data => `${data.episode.guestName} (#${data.episode.episodeNumber})`
  }
};