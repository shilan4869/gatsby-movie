export const ASSET_ORIGIN = process.env.NODE_ENV !== 'development'
  ? process.env.GATSBY_CDN_ORIGIN
  : null

export const IMAGE_ORIGIN = process.env.NODE_ENV !== 'development'
  ? process.env.GATSBY_IMAGE_ORIGIN || process.env.GATSBY_CDN_ORIGIN
  : null

export const withAssetPrefix = ASSET_ORIGIN
  ? path => path && path.startsWith('/') ? ASSET_ORIGIN + path : path
  : path => path

export const withImagePrefix = IMAGE_ORIGIN
  ? path => path && path.startsWith('/') ? IMAGE_ORIGIN + path : path
  : path => path
