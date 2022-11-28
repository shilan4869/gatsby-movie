require('./env')
module.exports = {
  siteMetadata: {
    title: `Movie Cinema`,
    description: `This is my first product on ReactJS, enjoy!`,
    image: `/divine-icon.png`,
    siteUrl: `https://movie.tienlm.tech`,
  },
  pathPrefix: '/gatsby-movie',
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
