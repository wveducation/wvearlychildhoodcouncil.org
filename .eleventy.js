const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");
const markdownIt = require('markdown-it');
const util = require('util');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Plugin for Eleventy Navigation
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // Render markdown to html
  eleventyConfig.addFilter("markdown", (content) => {
    return markdownIt({ html: true }).render(content);
  });
  
  // Console log variables
  eleventyConfig.addFilter('console', function(value) {
    const str = util.inspect(value);
    return `<pre class="block" style="max-height: 500px; overflow-y: scroll;">${unescape(str)}</pre>`
  });
  
  // Removes a given character from a string
  eleventyConfig.addFilter('replaceChar', (str, char, replacement) => {
    return str.replace(char, replacement);
  });

  // Filters and sorts items by a sorting array (order)
  eleventyConfig.addFilter('sortByKeys', (items, order) => {
    const data = [...items]; // prevents mutation of collection
    return data.filter((item) => {
      if (order.includes(item.data.id)) {
        return true;
      }
      return false;
    }).sort((a, b) => order.indexOf(a.data.id) - order.indexOf(b.data.id));
  });

  // Limit to a number of top results
  eleventyConfig.addFilter('limit', (items, quantity) => {
    const data = [...items]; // prevents mutation of collection
    return data.slice(0, quantity);
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}` );

  eleventyConfig.addShortcode("randInt", (max) => {
    max = max ? max : 99999;
    // Bug in Nunjucks engines means you have to convert integers to strings to return.
    // https://github.com/11ty/eleventy/issues/856
    return Math.floor(Math.random() * max).toString();
  });

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
    "./src/static/js/cookies.min.js": "./static/js/cookies.min.js",
    "./src/static/js/components": "./static/js/components",
    "./node_modules/prismjs/themes/prism-tomorrow.css": "./static/css/prism-tomorrow.css",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");
  eleventyConfig.addPassthroughCopy("./src/static/docs");

  // Copy Video Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/video");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/static/favicon");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
