const request = require('../lib/utilities/request')

const nodes = [
  {
    type: 'Product',
    pages: true,
    url: '/api/gatsby/product/all/index.php',
  },
  {
    type: 'Search',
    pages: true,
    url: '/api/gatsby/product/searches/index.php',
  },
  {
    type: 'SiteMetadata',
    url: '/api/gatsby/product/searches/index.php',
  },
  // {
  //   type: "HomeTopMenu",
  //   url: "/api/gatsby/header/menu",
  // },
  {
    type: 'ProductListing',
    url: '/api/gatsby/product/searches/index.php',
  },
  {
    type: 'ProductCategoryList',
    url: '/api/gatsby/product/searches/index.php',
  },
  // {
  //   type: 'ProductTagList',
  //   url: '/api/gatsby/product/tags/index.php',
  // },
]

const source
  = ({ createContentDigest, actions: { createNode } }) => async ({ type, pages, url }) => {
    const data = await fetch(`http://localhost/divineshop${ url }`)
      .then(r => r.json())
      .then(v => v)
    const nodes = pages ? data.list : [ data ]

    nodes.forEach((node, index) => {
      const id
        = type === 'Product'
          ? node.id.toString() || index
          : type + (node.id || index)
      const content = JSON.stringify(node)
      const contentDigest = createContentDigest(node)

      createNode({
        ...node,
        id,
        _id: node.id,
        internal: {
          type,
          content,
          contentDigest,
          mediaType: 'application/json',
        },
        parent: null,
        children: [],
      })
    })
  }

const sourceNodes = (...args) => Promise.all(nodes.map(source(...args)))

module.exports = sourceNodes
