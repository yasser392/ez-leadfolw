import { motion } from 'framer-motion'
import Counter from './Counter'

const stats = [
  { target: 3, label: 'مراكز تكوين' },
  { target: 7, label: 'دورات ناجحة' },
  { target: 14, label: 'يوم فقط' },
]

export default function Stats() {
  return (
    <section className="relative py-24 px-6 border-t border-border" style={{ boxShadow: '0 -1px 80px rgba(168,85,247,0.15)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <Counter target={stat.target} />
              <span className="font-cairo text-muted mt-2 text-lg">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-cairo text-muted text-lg leading-[1.9] max-w-2xl mx-auto"
        >
          ساعدنا 3 مراكز تكوين محلقة تملأ مقاعد قاعاتها بمتربصين خلال 14 يوم فقط، بتميز ثابتة إعلانات صغيرة جدا.
        </motion.p>
      </div>
    </section>
  )
}
