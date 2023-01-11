const NavigationPlugin = require("@11ty/eleventy-navigation");
const ErrorOverlayPlugin = require("eleventy-plugin-error-overlay");
const createCollections = require("./utils/collections");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const filters = require("./utils/filters");
const markdown = require("./utils/markdown");
const shortcodes = require("./utils/shortcodes");
const transforms = require("./utils/transforms");

require("dotenv").config();

module.exports = function (cfg) { 

  if (process.env.NODE_ENV !== "production") {
    const ignores = [
      "input/hwpod/",
      "input/music/",
      "input/search/",
      "input/videos/",
      "input/tags.njk",
      //"input/*.njk",
      "input/stories/200*/**/",
      "input/stories/201*/**/",
      //"input/stories/202*/",
    ];
    for (let ignore of ignores) {
      cfg.ignores.add(ignore);
    }
  }

  cfg.setLibrary("md", markdown);
  cfg.addPlugin(NavigationPlugin);
  cfg.addPlugin(ErrorOverlayPlugin);
  cfg.addPlugin(pluginRss);

  Object.keys(filters).forEach((key) => {
    cfg.addFilter(key, filters[key]);
  });

  Object.keys(transforms).forEach((key) => {
    cfg.addTransform(key, transforms[key]);
  });

  cfg.addShortcode("icon", shortcodes.icon);
  cfg.addShortcode("now", shortcodes.now);
  cfg.addPairedShortcode("markdown", shortcodes.markdown);
  cfg.addNunjucksAsyncShortcode("image", shortcodes.image);
  cfg.addNunjucksAsyncShortcode("webpack", shortcodes.webpack);

  // Copy Path/Files
  const paths = ["img", "css", "js", "lib", "fonts", "3rdParty", "music"];
  for (var x = 0; x < paths.length; x++) {
    cfg.addPassthroughCopy(`input/${paths[x]}`);
  }

  cfg.addPassthroughCopy('input/staticwebapp.config.json');
  cfg.addPassthroughCopy('input/.wellknown');

  // Collections
  createCollections(cfg);

  return {
    dir: {
      input: "input",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    // Allow nunjucks, markdown and 11ty files to be processed
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "md",
    markdownTemplateEngine: false
  };
};
