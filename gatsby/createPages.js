const path = require("path")
const createPages = async ({ actions: { createPage } }) => {
  const productPage = path.resolve("src/components/product.js")
  const data = await fetch(
    "http://localhost/divineshop/api/gatsby/product/all/index.php"
  )
    .then((r) => r.json())
    .then((v) => v)

  const products = data.list
  products.map((node) => {
    createPage({
      path: node.slug,
      component: productPage,
      context: {
        data: node,
      },
    })
  })
}

module.exports = createPages
