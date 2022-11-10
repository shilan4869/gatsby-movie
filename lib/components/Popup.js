import { createPortal } from 'react-dom'
import { isClient } from 'lib/utilities/is'
import Modal from 'lib/components/Modal'

const container = isClient ? document.getElementById('__popup') : null

export const PopupPortal = ({ children }) => createPortal(children, container)

/**
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {onBackdrop: () => void, onClose: () => void}} props
 */
const Popup = ({ children, ...props }) => (
  <PopupPortal>
    <Modal { ...props } className='w-screen-md'>
      <div className='min-h-main w-full h-full p-6 sm:p-10'>
        { children }
      </div>
    </Modal>
  </PopupPortal>
)

export default Popup
