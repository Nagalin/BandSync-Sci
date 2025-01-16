import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Circle cx={12} cy={12} r={9} fill="#2A4157" fillOpacity={0.24} />
    <Path
      stroke="#222"
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m16 8-8 8M8 8l8 8"
    />
  </Svg>
)
export default SvgComponent
