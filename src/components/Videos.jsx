import { motion } from 'framer-motion'
import { config } from '../config'
import VideoCard from './VideoCard'

export default function Videos() {
  return (
    <section id="videos" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-cairo font-extrabold text-3xl md:text-5xl text-center mb-14 gradient-text"
        >
          نتائج حقيقية
        </motion.h2>

        <div
          className={`grid gap-6 mx-auto ${
            config.videoUrls.length === 1
              ? 'grid-cols-1 max-w-sm'
              : 'grid-cols-1 md:grid-cols-2 max-w-2xl md:max-w-4xl'
          }`}
        >
          {config.videoUrls.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <VideoCard src={src} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
