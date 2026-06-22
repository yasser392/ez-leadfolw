import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const COUNT = 3000
const SPREAD_XY = 40
const Z_NEAR = 6
const Z_FAR = -40

// Generated once at module load (not during a component render), so the
// star field is randomized but stable across re-renders without violating
// component purity rules.
function createStarPositions() {
  const arr = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * SPREAD_XY
    arr[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_XY
    arr[i * 3 + 2] = Z_FAR + Math.random() * (Z_NEAR - Z_FAR)
  }
  return arr
}

// A single shared buffer is fine since only one StarField is ever mounted.
const positions = createStarPositions()

export default function StarField() {
  const pointsRef = useRef()

  useFrame((_, delta) => {
    const geom = pointsRef.current.geometry
    const pos = geom.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3 + 2
      pos[idx] += delta * 0.6
      if (pos[idx] > Z_NEAR) {
        pos[idx] = Z_FAR
      }
    }
    geom.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y += delta * 0.01
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.045} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}
