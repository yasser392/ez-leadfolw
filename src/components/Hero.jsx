import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import HeroBackground from './three/HeroBackground'
import WhatsappButton from './WhatsappButton'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <HeroBackground />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label-ui text-muted mb-6 border border-border rounded-full px-4 py-2 glass-card"
          dir="ltr"
        >
          EZ LeadFlow — Lead Generation System
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cairo font-extrabold text-[26px] sm:text-4xl md:text-6xl leading-[1.35] break-normal gradient-text mb-6"
        >
          نساعد مراكز التكوين تحل مشكلة المقاعد الفارغة عن طريق نظام Qualified Course Leads Gen في أقل من 14 يوم
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-cairo text-muted text-lg leading-[1.9] max-w-2xl mb-10"
        >
          نحل مشكلة نقص المتربصين عن طريق إعلانات مؤهلة + leads متابعة ذكية تضمن تسجيلات حقيقية، ماشي مجرد أرقام
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <WhatsappButton size="xl" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  )
}
