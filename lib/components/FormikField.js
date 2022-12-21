import React, { useState, useCallback } from 'react'
import clsx from 'lib/utilities/clsx'
import { useField } from 'formik'

const FormikField = ({ label, children, className, ...props }) => {
  const [ active, setActive ] = useState(false)
  const [ field, meta ] = useField(props)
  const { onChange } = field

  const handleBlur = useCallback(e => {
    console.log(e.target.value)

    if (label) {
      setActive(!!(e.target.value))
    }
  }, [ label, setActive ])

  const handleFocus = useCallback(() => {
    setActive(true)
  }, [ setActive ])

  return (
    <div
      className={ clsx('relative', children && 'flex') }
    >
      <input
        className={ clsx('field-input', label && 'field-label', active && 'field-active', className) }
        onFocus={ handleFocus }
        onBlur={ handleBlur }
        onChange={ onChange }
        { ...props }
      />
      <label>{ label }</label>
    </div>
  )
}

export default FormikField
