const CssMinifierWebpackPlugin = require('./CssMinifierWebpackPlugin')

exports.onCreateWebpackConfig = ({ cache, actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new CssMinifierWebpackPlugin({
        cache,
      }),
    ],
  })
}
