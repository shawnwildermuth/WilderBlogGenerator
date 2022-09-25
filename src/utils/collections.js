module.exports = function (cfg) {
  cfg.addCollection("sortedPosts", function (collectionApi) {
    // get unsorted items
    return collectionApi
      .getFilteredByTag("post")
      .sort(function (a, b) {
        return a.date > b.date ? 1 : -1;
      })
      .reverse();
  });

  cfg.addCollection("years", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("post")
      .map((item) => {
        if (item.date) return item.date.getFullYear();
      })
      .filter((value, index, self) => self.indexOf(value) === index)
      .reverse();
  });

  cfg.addCollection("tags", function (collectionApi) {
    const result = new Set();
    const collection = collectionApi.getFilteredByTag("post");
    for (let i = 0; i < collection.length; i++) {
      const tags = collection[i].data.categories;
      if (tags) {
        for (let j = 0; j < tags.length; j++) {
          result.add(tags[j].toLowerCase());
        }
      }
    }

    return [...result];
  });
};
