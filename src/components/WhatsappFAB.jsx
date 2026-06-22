import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { getWhatsappUrl } from '../config'

export default function WhatsappFAB() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={getWhatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="تحدث معنا الآن على واتساب"
    >
      {hovered && (
        <span className="hidden md:block absolute right-[72px] whitespace-nowrap glass-card text-text text-sm font-cairo font-semibold px-4 py-2 rounded-full shadow-glow-sm">
          تحدث معنا الآن
        </span>
      )}

      <span className="absolute inset-0 rounded-full bg-emerald-500/60 animate-pulse-ring" aria-hidden="true" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40">
        <MessageCircle className="text-white" size={28} />
      </span>
    </a>
  )
}
