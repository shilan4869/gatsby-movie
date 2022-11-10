import { withImagePrefix } from "lib/utilities/withPrefix"
import { memo } from "react"

/**
 * @param {React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>} props
 */
const Image = ({ src, ...props }) => (
  <img loading="lazy" src={withImagePrefix(src)} {...props} />
)

export default memo(Image)
