import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei'

export default function DistortOrb() {
  const meshRef = useRef()

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.15
    meshRef.current.rotation.x += delta * 0.05
  })

  return (
    <Float speed={2} floatIntensity={0.6} rotationIntensity={0.3}>
      <Sphere ref={meshRef} args={[1.6, 64, 64]}>
        <MeshDistortMaterial
          color="#7C3AED"
          emissive="#4F46E5"
          emissiveIntensity={0.4}
          distort={0.5}
          speed={1.5}
          metalness={0.8}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  )
}
