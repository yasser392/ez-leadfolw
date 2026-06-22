import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Torus } from '@react-three/drei'

function Ring({ radius, tilt, speed, color, axis }) {
  const ref = useRef()

  useFrame((_, delta) => {
    ref.current.rotation[axis] += delta * speed
  })

  return (
    <group rotation={tilt}>
      <Torus ref={ref} args={[radius, 0.012, 16, 100]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} wireframe transparent opacity={0.5} />
      </Torus>
    </group>
  )
}

export default function OrbitRings() {
  return (
    <>
      <Ring radius={2.6} tilt={[Math.PI / 2.2, 0, 0.3]} speed={0.25} axis="z" color="#A855F7" />
      <Ring radius={3.2} tilt={[Math.PI / 3, 0.6, 0]} speed={-0.18} axis="z" color="#4F46E5" />
    </>
  )
}
