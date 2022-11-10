const START = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-'

const unsafe = new Set([ 'ad', 'adv', 'qc' ])

const short = index => {
  let string = START[ index % START.length ]

  if (index < START.length) {
    return string
  }

  index = Math.floor(index / START.length) - 1

  while (true) {
    string += CHARS[ index % CHARS.length ]

    if (index < CHARS.length) {
      break
    }

    index = Math.floor(index / CHARS.length) - 1
  }

  // escape unsafe class names with prefix '-'
  return unsafe.has(string) ? `-${ string }` : string
}

class CssMinifierWebpackPlugin {
  /**
   * @param {{cache: import('gatsby').GatsbyCache}} options
   */
  constructor({ cache } = {}) {
    this.cache = cache

    /**
     * @type {[Map<string, string>]}
     */
    this.maps = null
  }

  /**
   * @param {import('webpack').Compiler} compiler
   */
  apply(compiler) {
    const { name } = this.constructor
    const { Compilation } = compiler.webpack

    compiler.hooks.thisCompilation.tap(name, compilation => {
      compilation.hooks.processAssets.tapPromise(
        {
          name,
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
          additionalAssets: true,
        },
        assets => this.minify(
          compiler,
          compilation,
          Object.keys(assets).map(name => compilation.getAsset(name)),
        ),
      )
    })
  }

  /**
   * @param {import('webpack').Compiler} compiler
   * @param {import('webpack').Compilation} compilation
   * @param {[import('webpack').Asset]} assets
   */
  async minify(compiler, compilation, assets) {
    const { ReplaceSource } = compiler.webpack.sources

    await this.initialize()

    // first minify css class names
    assets.forEach(({ name, source, info: { minified } }) => {
      if (minified || !name.endsWith('.css')) {
        return
      }

      const replace = new ReplaceSource(source)
      let matches

      source = source.source()

      // minify class names
      // name group 0

      matches = [ ...source.matchAll(/(?<=[}\s]\.)(?:[a-zA-Z_-]|\\.)+(?:[\w-]|\\.)+/g) ]

      matches.forEach(({ 0: match, index }) => replace.replace(
        index,
        index + match.length - 1,
        this.short(match.replaceAll('\\', '')),
      ))

      // css variables
      // name group 1

      matches = [ ...source.matchAll(/(?<=--)tw-[\w-]+/g) ]

      matches.forEach(({ 0: match, index }) => replace.replace(
        index,
        index + match.length - 1,
        this.short(match, 1),
      ))

      compilation.updateAsset(name, replace, { minified: true })
    })

    this.save()

    const pattern = [ ...this.short().keys() ]
      .map(key => key.replace(/([[\]])/g, '\\$1'))
      .join('|')

    if (!pattern.length) {
      return
    }

    const individual = new RegExp(`(?<=["'\` ])(?:${ pattern })(?=["'\` ])`, 'g')

    assets.forEach(({ name, source, info: { minified } }) => {
      if (minified || !name.endsWith('.js')) {
        return
      }

      const replace = new ReplaceSource(source)
      // className:'...'
      // (0,...clsx...)('...')
      // (0,...clsx...)(hover()?'text-primary':'text-secondary')
      // utilities_clsx('...')
      const matches = [ ...source.source().matchAll(/className:["'`].+?["'`]|(?:\(0,\w*clsx[^)]*?\.\w+\)|\w*clsx\w*)\((?:[^()]+|[^()]*(?:[^()]+\([^)]*\)[^()]*)+[^()]*)\)/g) ]

      matches
        .map(({ 0: match, index: offset }) => {
          const matches = [ ...match.matchAll(/["'`].+?["'`]/g) ]

          return matches.map(({ 0: match, index }) => ({
            0: match,
            index: offset + index,
          }))
        })
        .flat()
        .forEach(({ 0: match, index: offset }) => {
          const matches = [ ...match.matchAll(individual) ]

          matches.forEach(({ 0: match, index }) => {
            const start = offset + index
            const value = this.short(match)

            if (!value) {
              throw Error(`no replacement for class name ${ match }`)
            }

            replace.replace(start, start + match.length - 1, value)
          })
        })

      compilation.updateAsset(name, replace, { minified: true })
    })
  }

  short(name, group = 0) {
    const map = this.maps[ group ]

    if (!name) {
      return map
    }

    if (!map.has(name)) {
      map.set(name, short(map.size))
    }

    return map.get(name)
  }

  initialize() {
    if (this.maps) {
      return
    }

    return this.cache.get(this.constructor.name)
      .then(maps => {
        this.maps = (maps || Array(2).fill(void 0)).map(map => new Map(map))
      })
  }

  save() {
    this.cache.set(
      this.constructor.name,
      this.maps.map(map => [ ...map.entries() ]),
    )
  }
}

module.exports = CssMinifierWebpackPlugin
