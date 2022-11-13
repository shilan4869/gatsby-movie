require('./env')
module.exports = {
  plugins: [
    'gatsby-plugin-jsconfig',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-url-loader',
    'gatsby-plugin-lodash',
    'gatsby-plugin-serve-static-dev',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /icon/,
        },
      },
    },
    process.env.NODE_ENV !== 'development' && [
      'gatsby-plugin-no-sourcemaps',
      'gatsby-plugin-split-chunks',
      'gatsby-plugin-minify-css',
      'gatsby-plugin-disable-inline-css',
      'gatsby-plugin-bundle-analyzer',
    ],
  ]
    .flat()
    .filter(Boolean),
}
