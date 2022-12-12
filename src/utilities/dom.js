export const id = id => document.getElementById(id)

export const cls = className => document.getElementsByClassName(className)

export const attr = (element, name, value) => element.setAttribute(name, value)

export const listener = (element, name, listener) => element.addEventListener(name, listener)

export const create = (tag, attributes, parent = document.body) => {
  const element = document.createElement(tag)

  for (const key in attributes) {
    attr(element, key, attributes[ key ])
  }

  return parent.appendChild(element)
}
