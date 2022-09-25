module.exports = {
  eleventyComputed: {
    title: data => `Posts Tagged With '${data.tag}' - Shawn Wildermuth's Rants and Raves`,
    pageBlurb: data => `Latest Stories Tagged with "${data.tag}"`
  }
};