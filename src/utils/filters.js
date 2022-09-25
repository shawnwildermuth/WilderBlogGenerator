const util = require("util");
const datefns = require("date-fns");
const { format, utcToZonedTime } = require("date-fns-tz");
const markdown = require("./markdown");
const slugify = require("slugify");

module.exports = {
  format: datefns.format,
  formatISO: datefns.formatISO,
  formatDate: (data, fmt) => {
    return format(utcToZonedTime(data, "UTC"), "MMMM d, yyyy", {
      timeZone: "UTC",
    });
  },
  take: (data, num) => {
    if (data instanceof Array) {
      if (!num) num = 25;
      return data.slice(0, num);
    }

    return data;
  },
  skip: (data, num) => {
    if (data instanceof Array) {
      if (!num) num = 25;
      return data.slice(num);
    }

    return data;
  },
  published: (data, val) => data.filter((i) => i.status === val),
  log: (data) => console.log(`\n\n${util.inspect(data)}\n\n`),
  markdown: (content) => markdown.renderInline(content),
  byYear: (data, year) =>
    data.filter((d) => {
      return d.date.getFullYear() === year;
    }),
  byTag: (data, tag) =>
    data.filter((d) => {
      if (d.data.categories)
        return (
          d.data.categories.findIndex(
            (t) => t.toLowerCase() === tag.toLowerCase()
          ) > -1
        );
      return false;
    }),
  activeYear: (year) => {
    let currentYear = new Date().getFullYear();
    return year == currentYear ? "active" : "";
  },
  afterDate: (data, prop, after) => {
    return data.filter((data) => {
      let theDate = data[prop];
      let theAfter = after;
      if (!(theDate instanceof Date)) theDate = new Date(theDate);
      if (!(theAfter instanceof Date)) theAfter = new Date(theAfter);
      return theDate > theAfter;
    });
  },
  future: (data, prop) => {
    return data.filter((data) => {
      let theDate = data[prop];
      if (!(theDate instanceof Date)) theDate = new Date(theDate);
      return theDate > new Date();
    });
  },
  noneAfterDate: (data, prop) => {
    const result = data.filter((data) => {
      let theDate = data[prop];
      if (!(theDate instanceof Date)) theDate = new Date(theDate);
      return theDate > new Date();
    });

    return !result || result.length === 0;
  },
  // REMOVE ONCE WE GET TO 1.0
  myslug: function (str, options = {}) {
    if (!str) return str;
    const result = slugify("" + str.replace("#", "-sharp")).toLowerCase();

    return result;
  },
  bust: function (url) {
    return `${url}?v=${Date.now()}`  
  },
};
