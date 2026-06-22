import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const GEOMETRIES = {
  icosahedron: <icosahedronGeometry args={[1, 0]} />,
  torus: <torusGeometry args={[0.8, 0.32, 32, 64]} />,
  octahedron: <octahedronGeometry args={[1.1, 0]} />,
  torusKnot: <torusKnotGeometry args={[0.7, 0.22, 128, 16]} />,
}

function RotatingShape({ shape, color }) {
  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.4
    ref.current.rotation.y += delta * 0.6
  })

  return (
    <mesh ref={ref}>
      {GEOMETRIES[shape]}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.6} roughness={0.25} />
    </mesh>
  )
}

export default function ServiceIcon3D({ shape, color }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 40 }}
      dpr={[1, 1.5]}
      style={{ width: 120, height: 120 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 2, 2]} color={color} intensity={1.4} />
      <pointLight position={[-2, -1, -1]} color="#A855F7" intensity={0.6} />
      <RotatingShape shape={shape} color={color} />
    </Canvas>
  )
}
