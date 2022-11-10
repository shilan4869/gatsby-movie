import clsx from 'lib/utilities/clsx'

/**
 * @param {React.SVGProps<SVGSVGElement> & {icon: [number, number, string], title: string?}} props
 */
const FontAwesome = ({ className, icon: [ w, h, path ], title, ...props }) => (
  <svg
    className={ clsx('fill-current', className) }
    xmlns='http://www.w3.org/2000/svg'
    viewBox={ `0 0 ${ w } ${ h }` }
    { ...props }
  >
    { title && <title>{ title }</title> }
    <path d={ path } />
  </svg>
)

export default FontAwesome
