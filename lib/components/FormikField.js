import React, { useState, useCallback } from 'react'
import clsx from 'lib/utilities/clsx'
import { useField } from 'formik'

export const FormikInput = ({ label, children, className, ...props }) => {
  const [ active, setActive ] = useState(false)
  const [ field, meta ] = useField(props)
  const { onChange, onBlur } = field

  const handleBlur = useCallback(e => {
    if (label) {
      setActive(!!(e.target.value))
    }

    onBlur(e)
  }, [ label, setActive, onBlur ])

  const handleFocus = useCallback(() => {
    setActive(true)
  }, [ setActive ])

  return (
    <div
      className={ clsx('relative', children && 'flex') }
    >
      <input
        className={ clsx('field-input', label && 'field-label', active && 'field-active', meta.error && meta.touched && 'field-error field-label-error', className) }
        onFocus={ handleFocus }
        onBlur={ handleBlur }
        onChange={ onChange }
        { ...props }
      />
      <label>{ label }</label>
      { meta.error && meta.touched && <p className='text-danger pt-2'>{ meta.error }</p> }
    </div>
  )
}

