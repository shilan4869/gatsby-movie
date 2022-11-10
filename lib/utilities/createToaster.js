import { memo, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

export const createToaster = (Toast, container) => {
  /**
   * @type {React.Dispatch<(prevState: [React.ReactNode]) => [React.ReactNode]>}
   */
  let setState
  let count = 0

  /**
   * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} props
   */
  const toast = props => setState(toasts => {
    const toast = props.id ? { ...props, key: ++count } : { ...props, id: ++count }
    const { id } = toast

    const index = toasts.findIndex(toast => toast.id === id)

    return index !== -1
      ? toasts.slice(0, index).concat(toast, toasts.slice(index + 1))
      : toasts.concat(toast)
  })

  /**
   * @param {(number|string)} id
   */
  const dismiss = id => setState(toast => {
    const index = toast.findIndex(toast => toast.id === id)

    return index !== -1
      ? toast.slice(0, index).concat(toast.slice(index + 1))
      : toast
  })

  // auto-dismissable toast
  const Toastable = ({ id, ...props }) => {
    const onDismiss = useCallback(() => dismiss(id), [ id ])

    return <Toast { ...props } onDismiss={ onDismiss } />
  }

  if (process.env.NODE_ENV === 'development') {
    Toastable.displayName = `Toastable(${ Toast.displayName || Toast.name || 'Toast' })`
  }

  const Toaster = () => {
    const [ value, setValue ] = useState([])

    setState = setValue

    return value.length > 0
      ? createPortal(
        value.map(props => (
          <Toastable { ...props } key={ props.key || props.id } />
        )),
        container,
      )
      : null
  }

  return { Toaster: memo(Toaster), toast, dismiss }
}
