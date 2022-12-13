import clsx from 'lib/utilities/clsx'
import { useCallback, useMemo, useState } from 'react'

/**
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {label: JSX.Element}} props
 */
export const Input = ({ className, label, children, ...props }) => {
  const { type } = props
  const datetime = type && (type.startsWith('date') || type.startsWith('time'))

  const [ active, setActive ] = useState((
    !!(label && (props.defaultValue || props.value))
  ))
  const [ invalid, setInvalid ] = useState(false)

  const handleChange = useMemo(
    () => invalid || label
      ? ({ target: { value } }) => {
        if (invalid) {
          setInvalid(false)
        }

        if (label) {
          setActive(!!value)
        }
      }
      : null,
    [ invalid, label ],
  )
  const handleInvalid = useCallback(() => setInvalid(true), [])

  return (
    <div
      className={ clsx('relative', children && 'flex') }
      onChange={ handleChange }
      onInvalid={ handleInvalid }
    >
      <input
        className={ clsx('field-input', label && 'field-label', (active || datetime) && 'field-active', invalid && 'field-invalid', className) }
        { ...props }
      />
      { label && <label>{ label }</label> }
      { children }
    </div>
  )
}

const calculateRows = v => Math.min(Math.max(v.split('\n').length, 4), 9)

/**
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {label: JSX.Element}} props
 */
export const Textarea = ({ className, label, ...props }) => {
  const [ active, setActive ] = useState(!!(
    label
    && (props.defaultValue || props.value)
  ))
  const [ invalid, setInvalid ] = useState(false)
  const [ rows, setRows ] = useState(() => (
    calculateRows(props.defaultValue || props.value || '')
  ))

  const handleChange = useCallback(
    ({ target: { value } }) => {
      if (invalid) {
        setInvalid(false)
      }

      if (label) {
        setActive(!!value)
      }

      setRows(calculateRows(value))
    },
    [ invalid, label ],
  )
  const handleInvalid = useCallback(() => setInvalid(true), [])

  return (
    <div
      className='relative'
      onChange={ handleChange }
      onInvalid={ handleInvalid }
    >
      <textarea
        className={ clsx('field-input py-4 h-auto', label && 'field-label', active && 'field-active', invalid && 'field-invalid', className) }
        { ...props }
        rows={ rows }
      />
      { label && <label>{ label }</label> }
    </div>
  )
}

/**
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {label: JSX.Element, options: [[string, string]]}} props
 */
export const Select = ({ className, label, options, ...props }) => {
  const [ invalid, setInvalid ] = useState(false)

  const handleChange = useMemo(
    () => invalid ? () => setInvalid(false) : null,
    [ invalid ],
  )
  const handleInvalid = useCallback(() => setInvalid(true), [])

  return (
    <div
      className='relative'
      onChange={ handleChange }
      onInvalid={ handleInvalid }
    >
      <select
        className={ clsx('field-input field-select bg-chevron-down', label && 'field-label field-active', invalid && 'field-invalid', className) }
        { ...props }
      >
        { options.map(([ value, text ]) => (
          <option value={ value } key={ value }>{ text }</option>
        )) }
      </select>
      { label && <label>{ label }</label> }
    </div>
  )
}

export const Checkbox = ({ children, ...props }) => {
  const [ invalid, setInvalid ] = useState(false)

  const handleChange = useMemo(
    () => invalid ? () => setInvalid(false) : null,
    [ invalid ],
  )
  const handleInvalid = useCallback(() => setInvalid(true), [])

  return (
    <label
      className='group flex items-center cursor-pointer'
      onChange={ handleChange }
      onInvalid={ handleInvalid }
    >
      <input className={ clsx('shrink-0 checkbox cursor-pointer', invalid && 'check-invalid') } type='checkbox' { ...props } />
      <div>{ children }</div>
    </label>
  )
}

export const Radio = ({ children, ...props }) => {
  const [ invalid, setInvalid ] = useState(false)

  const handleChange = useMemo(
    () => invalid ? () => setInvalid(false) : null,
    [ invalid ],
  )
  const handleInvalid = useCallback(() => setInvalid(true), [])

  return (
    <label
      className='group flex items-center cursor-pointer'
      onChange={ handleChange }
      onInvalid={ handleInvalid }
    >
      <input className={ clsx('shrink-0 radio cursor-pointer', invalid && 'check-invalid') } type='radio' { ...props } />
      <div>{ children }</div>
    </label>
  )
}
