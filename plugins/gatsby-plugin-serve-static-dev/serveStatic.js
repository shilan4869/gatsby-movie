const { R_OK } = require('constants')
const { createReadStream } = require('fs')
const { lstat } = require('fs/promises')

const serveStatic = ({
  root = 'static',
  tryFiles = [ '', '.html', '/index.html' ],
}) => {
  const resolve = async uri => {
    for (const rule of tryFiles) {
      try {
        const path = `${ root }${ uri }${ rule }`
        const stats = await lstat(path, R_OK)

        if (stats.isFile()) {
          return path
        }
      } catch {
        //
      }
    }

    return null
  }

  const cache = new Map()

  return async (req, res, next) => {
    const { originalUrl: uri } = req

    if (!cache.has(uri)) {
      cache.set(uri, await resolve(uri))
    }

    const path = cache.get(uri)

    if (!path) {
      return void next()
    }

    createReadStream(path).pipe(res)
  }
}

module.exports = serveStatic
