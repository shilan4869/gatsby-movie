const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.BUNDLE_ANALYZER ? 'static' : 'disabled',
        reportFilename: `report-${ stage }.html`,
      }),
    ],
  })
}
