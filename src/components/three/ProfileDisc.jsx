import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, useTexture } from '@react-three/drei'

function Disc({ photoUrl }) {
  const groupRef = useRef()
  const texture = useTexture(photoUrl)

  useFrame((state) => {
    const { x, y } = state.pointer
    const maxTilt = (15 * Math.PI) / 180
    groupRef.current.rotation.y = x * maxTilt
    groupRef.current.rotation.x = -y * maxTilt
  })

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 0, -2]} color="#A855F7" intensity={3} distance={8} />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.15, 64]} />
        <meshStandardMaterial map={texture} metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <torusGeometry args={[1.52, 0.04, 16, 100]} />
        <meshStandardMaterial color="#A855F7" emissive="#7C3AED" emissiveIntensity={0.8} metalness={0.7} roughness={0.2} />
      </mesh>
    </group>
  )
}

export default function ProfileDisc({ photoUrl }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} color="#A855F7" intensity={1} />
      <Suspense fallback={null}>
        <Float floatIntensity={1.5} speed={2} rotationIntensity={0.2}>
          <Disc photoUrl={photoUrl} />
        </Float>
      </Suspense>
    </Canvas>
  )
}
