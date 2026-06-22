import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from '../config'

const AUTO_INTERVAL = 4000
const SWIPE_THRESHOLD = 60

export default function Testimonials() {
  const images = config.testimonialImages
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback(
    (i) => setIndex(((i % images.length) + images.length) % images.length),
    [images.length],
  )

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => goTo(index + 1), AUTO_INTERVAL)
    return () => clearInterval(id)
  }, [index, paused, goTo])

  return (
    <section id="testimonials" className="relative py-24 px-6">
      <div className="max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-cairo font-extrabold text-3xl md:text-5xl text-center mb-14 gradient-text"
        >
          ماذا قال عملاؤنا
        </motion.h2>

        <div
          className="relative h-[480px] sm:h-[520px] rounded-2xl overflow-hidden glass-card bg-black/30"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) goTo(index + 1)
                else if (info.offset.x > SWIPE_THRESHOLD) goTo(index - 1)
              }}
            >
              <img
                src={images[index]}
                alt="شهادة عميل حقيقية"
                className="w-full h-full object-contain select-none"
                draggable={false}
              />

              <span className="absolute top-4 right-4 bg-emerald-500/90 text-white text-xs font-cairo font-bold px-3 py-1.5 rounded-full shadow-lg">
                شهادة حقيقية
              </span>

              <div
                className="absolute bottom-0 inset-x-0 h-16"
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  background: 'linear-gradient(to top, rgba(10,10,15,0.85), rgba(10,10,15,0))',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`الانتقال إلى الشهادة ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-glow' : 'w-2 bg-muted/40 hover:bg-muted/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
