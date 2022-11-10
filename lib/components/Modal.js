import clsx from 'lib/utilities/clsx'

/**
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {onBackdrop: () => void, onClose: () => void}} props
 */
const Modal = ({ className, children, onBackdrop, onClose, ...props }) => (
  <div className='fixed inset-0 p-6 bg-black-75' onClick={ onBackdrop }>
    <div className='flex justify-center items-center h-full'>
      <div
        { ...props }
        className={ clsx('relative flex flex-col items-stretch max-w-full max-h-full rounded-md bg-light', className) }
      >
        <div className='max-h-full w-full h-full overflow-y-auto scrollbar-none'>
          { children }
        </div>
        { onClose && (
          <button
            type='button'
            className='absolute top-2.5 right-2.5 sm:top-6 sm:right-6 button p-2.5 opacity-50 hover:opacity-100 focus:opacity-100'
            autoFocus
            onClick={ onClose }
          >
            <div className='w-7 h-7 rounded bg-white bg-times bg-contain bg-center bg-no-repeat' />
          </button>
        ) }
      </div>
    </div>
  </div>
)

export default Modal
