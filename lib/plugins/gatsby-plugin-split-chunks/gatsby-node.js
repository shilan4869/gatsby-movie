exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      optimization: {
        splitChunks: {
          cacheGroups: {
            fontawesome: {
              test: /[\\/]lib[\\/]fontawesome/,
              chunks: 'all',
              priority: 35,
              enforce: true,
            },
            library: {
              test: /[\\/]lib[\\/]/,
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            src: {
              test: /[\\/]src[\\/]components[\\/](?:Footer|Generic|Header)|[\\/]src[\\/](?:constants|utilities)/,
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
          },
          minSize: 10000,
        },
      },
    })
  }
}
