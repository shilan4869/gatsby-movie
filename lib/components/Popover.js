import { useRef } from 'react'
import usePopover from 'lib/hooks/usePopover'

/**
 * @param {{popover: JSX.Element, children: JSX.Element}} props
 */
const Popover = ({ popover, children }) => {
  const ref = useRef()
  const { visible, show, hide, blur } = usePopover(ref)

  return (
    <div
      ref={ ref }
      className='relative w-full h-full'
      onMouseEnter={ show }
      onMouseLeave={ hide }
      onFocus={ show }
      onBlur={ blur }
      onClick={ show }
    >
      { children }
      { visible && popover && (
        <div className='absolute inset-x-0 bottom-0 h-0 z-10'>
          { popover }
        </div>
      ) }
    </div>
  )
}

export default Popover
