exports.onCreateWebpackConfig = ({ getConfig, rules, loaders, actions }) => {
  const tests = [ 'images', 'media' ]
    .map(name => rules[ name ])
    .map(rule => String(rule().test))

  const config = getConfig()

  config.module.rules.forEach(rule => {
    if (!tests.includes(String(rule.test))) {
      return
    }

    rule.exclude = /[\\/]static[\\/]/

    rule.use
      .filter(({ loader }) => loader.includes('url-loader'))
      .forEach(({ options }) => {
        options.limit = 150
        options.name = options.name.replace(/\[name\]-?/, '')
      })
  })

  config.module.rules.unshift(
    {
      test: /[\\/]static[\\/].+\.js$/,
      use: loaders.raw(),
    },
    {
      test: /[\\/]static[\\/]/,
      exclude: /\.js$/,
      use: {
        loader: loaders.file().loader,
        options: {
          name: '[name].[ext]?hash=[hash]',
        },
      },
    },
  )

  actions.replaceWebpackConfig(config)
}
