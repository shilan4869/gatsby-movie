/**
 *
 * @param {HTMLFormControlsCollection} elements
 * @param {(element: (HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement), name: string) => void} callback
 */
export const forEach = (elements, callback) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[ i ]
    const { name } = element

    if (name) {
      callback(element, name)
    }
  }
}

/**
 * @param {HTMLFormElement} form
 * @returns {{[k: string]: string}}
 */
export const entries = form => {
  const data = new FormData(form)

  if (data.entries) {
    // while form is being disabled,
    // this returns an empty object
    return Object.fromEntries(data)
  }

  const result = {}

  forEach(form.elements, (element, name) => {
    result[ name ] = element.value
  })

  return result
}

export const textify = form => {
  const result = {}

  forEach(form.elements, (element, name) => {
    result[ name ] = element.type === 'select-one'
      ? element.options[ element.selectedIndex ].text
      : element.value
  })

  return result
}

/**
 * @typedef {import('lib/errors/FormError').default} FormError
 * @param {HTMLFormControlsCollection} elements
 * @param {FormError} error
 */
export const setCustomValidity = (elements, { payload }) => {
  Object.entries(payload).forEach(([ key, message ]) => {
    // in case of multiple elements with the same name,
    // we need to set validity for each of the elements
    // so we can't use elements[ name ] but iterate over the elements
    forEach(elements, (element, name) => {
      if (name === key) {
        element.setCustomValidity(message)
      }
    })
  })
}

/**
 * @param {HTMLFormElement} form
 */
export const reportValidity = ({ elements }) => {
  let validated = true

  forEach(elements, (element, name) => {
    if (name && !element.checkValidity()) {
      validated = false
    }
  })

  return validated
}
