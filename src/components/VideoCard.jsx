import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import useIsMobile from '../hooks/useIsMobile'

export default function VideoCard({ src }) {
  const isMobile = useIsMobile()
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    setPlaying(true)
    videoRef.current?.play()
  }

  return (
    <div className="relative rounded-2xl overflow-hidden glass-card shadow-glow-sm aspect-[9/16]">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay={!isMobile}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={() => isMobile && !playing && handlePlay()}
      />

      {isMobile && !playing && (
        <button
          onClick={handlePlay}
          aria-label="تشغيل الفيديو"
          className="absolute inset-0 flex items-center justify-center bg-black/30"
        >
          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-brand shadow-glow">
            <Play className="text-white" size={28} fill="white" />
          </span>
        </button>
      )}

      <div
        className="absolute bottom-0 inset-x-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(124,58,237,0.35), rgba(124,58,237,0))' }}
      />
    </div>
  )
}
