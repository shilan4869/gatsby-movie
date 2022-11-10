const { readFileSync } = require("fs")
const plugin = require("tailwindcss/plugin")

const components = ({ addComponents, postcss: { parse } }) => {
  // in node, do nothing as importing styles.css is correctly handled
  // we just need to push components only to tailwind intellisense
  if (process.env.NODE_ENV) {
    return
  }

  const content = readFileSync(`${__dirname}/styles.css`, "utf8")
    .match(/(?<=@layer components {\n)[\s\S]+(?=\n})/)
    .shift()
    .replace(/\n{1,}/g, "\n")
    .replace(/^ {2}/gm, "")

  parse(content).nodes.forEach(addComponents)
}

module.exports = plugin(components)
