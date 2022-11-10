import useToast from 'lib/hooks/useToast'
import clsx from 'lib/utilities/clsx'

/**
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {duration: number, onDismiss: () => void}} param0
 */
const Toast = ({ className, duration, onDismiss, ...props }) => {
  const { pause, resume } = useToast(duration, onDismiss)

  return (
    <div
      className={ clsx('border rounded-md px-5 py-4 bg-light shadow-sm', className) }
      onMouseEnter={ pause }
      onMouseLeave={ resume }
      { ...props }
    />
  )
}

export default Toast
