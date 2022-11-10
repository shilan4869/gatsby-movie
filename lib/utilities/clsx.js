const clsx = (...classNames) => {
  const result = []

  for (let i = 0; i < classNames.length; i++) {
    const value = classNames[ i ]

    if (!value) {
      continue
    }

    if (typeof value !== 'object') {
      result.push(value)
      continue
    }

    if (value.map) {
      for (let i = 0; i < value.length; i++) {
        if (value[ i ]) {
          result.push(value[ i ])
        }
      }

      continue
    }

    for (const key in value) {
      if (value[ key ]) {
        result.push(key)
      }
    }
  }

  return result.length ? result.join(' ') : void 0
}

export default clsx
