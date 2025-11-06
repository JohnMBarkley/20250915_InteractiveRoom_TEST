import { useRef } from "react"
import { easing } from "maath"
import { useFrame } from "@react-three/fiber"
import { Text, Mask, useMask } from "@react-three/drei"

export const Price = ({ value, currency = "$", ...props }) => (
  <group {...props}>
    <Text children={currency} anchorY="middle" position={[-4 * 1.1, -0.25, 0]} fontSize={1} font="PlaywriteDESAS-Regular.woff" />
    {[...`✨✨✨${value}`.slice(-4)].map((num, index) => (
      <Counter index={index} value={num === "✨" ? -1 : num} key={index} speed={0.1 * (4 - index)} />
    ))}
    <Mask id={1}>
      <planeGeometry args={[10, 1.55]} />
    </Mask>
  </group>
)

function Counter({ index, value, speed = 0.5 }) {
  const ref = useRef()
console.log(index, value)
  useFrame((state, delta) => easing.damp(ref.current.position, "y", value * -2, speed, delta))

  return (
    <group position-x={index * 1.1} ref={ref}>
      {['$', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <Text key={number} position={[1, number * 2, 0]} fontSize={1.5} font="PlaywriteDESAS-Regular.woff">
          {number}
          <meshBasicMaterial {...useMask(1)} />
        </Text>
      ))}
    </group>
  )
}
