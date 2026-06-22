import { Canvas } from '@react-three/fiber'
import StarField from './StarField'
import DistortOrb from './DistortOrb'
import OrbitRings from './OrbitRings'

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} color="#A855F7" intensity={1.2} />
        <pointLight position={[-4, -2, -2]} color="#4F46E5" intensity={0.8} />
        <StarField />
        <DistortOrb />
        <OrbitRings />
      </Canvas>
    </div>
  )
}
