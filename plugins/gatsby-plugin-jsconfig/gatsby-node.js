const { readFileSync } = require('fs')
const { resolve } = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  const root = process.cwd()
  const jsconfig = JSON.parse(readFileSync(`${ root }/jsconfig.json`))

  actions.setWebpackConfig({
    resolve: {
      modules: [
        'node_modules',
        resolve(root, jsconfig.compilerOptions.baseUrl),
      ],
    },
  })
}
