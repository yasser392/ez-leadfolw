import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { getWhatsappUrl } from '../config'

export default function WhatsappButton({ label = 'تواصل معنا الآن على واتساب', size = 'lg', message, className = '' }) {
  const sizes = {
    lg: 'px-5 py-3 text-sm sm:px-6 sm:py-3.5 sm:text-base md:px-8 md:py-4 md:text-lg gap-2 sm:gap-2.5 md:gap-3',
    xl: 'px-5 py-3 text-sm sm:px-7 sm:py-4 sm:text-base md:px-10 md:py-5 md:text-xl gap-2 sm:gap-3 md:gap-4',
  }

  return (
    <motion.a
      href={getWhatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-flex max-w-full items-center justify-center rounded-full bg-gradient-brand font-cairo font-bold text-white shadow-glow whitespace-normal text-center ${sizes[size]} ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="absolute inset-0 rounded-full bg-glow/50 animate-pulse-ring" aria-hidden="true" />
      <MessageCircle className="relative z-10 shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-auto md:h-auto" size={size === 'xl' ? 26 : 22} />
      <span className="relative z-10">{label}</span>
    </motion.a>
  )
}
