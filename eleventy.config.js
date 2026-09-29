module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  eleventyConfig.addCollection("podcasts", (api) =>
    api.getFilteredByGlob("src/content/podcasts/*.md").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("partners", (api) =>
    api.getFilteredByGlob("src/content/partners/*.md").sort((a,b) => (a.data.order||0)-(b.data.order||0))
  );
  eleventyConfig.addCollection("actionsList", (api) =>
    api.getFilteredByGlob("src/content/actions/*.md").sort((a,b) => (a.data.order||0)-(b.data.order||0))
  );
  eleventyConfig.addCollection("photos", (api) =>
    api.getFilteredByGlob("src/content/photos/*.md").sort((a,b) => (a.data.order||0)-(b.data.order||0))
  );

  eleventyConfig.addFilter("dateFr", (d) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  });

  return {
    dir: { input: "src", includes: "../_includes", data: "../_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
