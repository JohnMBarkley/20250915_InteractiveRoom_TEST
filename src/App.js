import * as THREE from "three"
import { easing } from "maath"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sky, Bvh } from "@react-three/drei"
import { EffectComposer, Selection, Outline, N8AO, TiltShift2, ToneMapping } from "@react-three/postprocessing"
import { Scene } from "./Scene"

export const App = () => {

  return(
    <Canvas flat dpr={[1, 1.5]} gl={{ antialias: false }} camera={{ position: [0, 1, 6], fov: 40, near: 1, far: 20 }}>
      <CameraPosition />
      <ambientLight intensity={1.5 * Math.PI} />
      <Sky />
      <Bvh firstHitOnly>
        <Selection>
          <Effects />
          <Scene rotation={[0, Math.PI / 2, 0]} position={[0, -1, -0.85]} />
        </Selection>
      </Bvh>
    </Canvas>
  )
}

function CameraPosition(){
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [state.pointer.x+ 0.3, 0.4 + state.pointer.y * 0.7, 6], 0.3, delta)
    state.camera.lookAt(state.camera.position.x * 0.9, 0, -4)
  })
  return (<></>)
}

function Effects() {
  const { size } = useThree()

  return (
    <EffectComposer stencilBuffer disableNormalPass autoClear={false} multisampling={4}>
      <N8AO halfRes aoSamples={5} aoRadius={0.4} distanceFalloff={0.75} intensity={1} />
      <Outline visibleEdgeColor="white" hiddenEdgeColor="white" blur width={size.width * 1.25} edgeStrength={20} />
      <TiltShift2 samples={5} blur={0.1} />
      <ToneMapping />
    </EffectComposer>
  )
}
