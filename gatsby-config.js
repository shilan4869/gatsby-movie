require("./env")
module.exports = {
  plugins: [
    "gatsby-plugin-jsconfig",
    "gatsby-plugin-postcss",
    "gatsby-plugin-url-loader",
    "gatsby-plugin-lodash",
    "gatsby-plugin-serve-static-dev",
    process.env.NODE_ENV !== "development" && [
      "gatsby-plugin-no-sourcemaps",
      "gatsby-plugin-split-chunks",
      "gatsby-plugin-minify-css",
      "gatsby-plugin-disable-inline-css",
      "gatsby-plugin-bundle-analyzer",
    ],
  ]
    .flat()
    .filter(Boolean),
}
