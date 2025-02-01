import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Clock = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 6v6M16.24 16.24 12 12"
    />
  </Svg>
)
export default Clock
