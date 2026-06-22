import { motion } from 'framer-motion'
import ServiceIcon3D from './three/ServiceIcon3D'

const services = [
  {
    shape: 'icosahedron',
    color: '#4F46E5',
    title: 'إعلانات Meta مؤهلة',
    outcome: 'احمر تامن التال — الإيجار والأجور معطاة',
  },
  {
    shape: 'torus',
    color: '#7C3AED',
    title: 'نظام المتابعة الذكي',
    outcome: 'ما تحسرش ولا مهتم واحد بسبب التأخر أو النسيان',
  },
  {
    shape: 'octahedron',
    color: '#A855F7',
    title: 'تتبع وتحسين التحويلات',
    outcome: 'تعرف بالضبط وين تربح ووين تخسر — قرارات مبنية على أرقام، ماشي تخمين',
  },
  {
    shape: 'torusKnot',
    color: '#6366F1',
    title: 'إدارة الحملة بالكامل',
    outcome: 'ركز وقتك وطاقتك على التكوين والتدريس، وحلي التسويق علينا',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-cairo font-extrabold text-3xl md:text-5xl text-center mb-16 gradient-text"
        >
          خدماتنا
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-glow hover:border-glow/50"
            >
              <div className="w-[120px] h-[120px] mb-4">
                <ServiceIcon3D shape={service.shape} color={service.color} />
              </div>
              <h3 className="font-cairo font-bold text-xl mb-2 text-text">{service.title}</h3>
              <p className="font-cairo text-muted leading-[1.9]">{service.outcome}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
