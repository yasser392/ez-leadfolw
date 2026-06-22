import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { getWhatsappUrl } from '../config'

export default function WhatsappButton({ label = 'تواصل معنا الآن على واتساب', size = 'lg', message, className = '' }) {
  const sizes = {
    lg: 'px-8 py-4 text-base md:text-lg gap-3',
    xl: 'px-10 py-5 text-lg md:text-xl gap-4',
  }

  return (
    <motion.a
      href={getWhatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-brand font-cairo font-bold text-white shadow-glow ${sizes[size]} ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="absolute inset-0 rounded-full bg-glow/50 animate-pulse-ring" aria-hidden="true" />
      <MessageCircle className="relative z-10 shrink-0" size={size === 'xl' ? 26 : 22} />
      <span className="relative z-10">{label}</span>
    </motion.a>
  )
}
