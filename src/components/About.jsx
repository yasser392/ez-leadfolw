import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import ProfileDisc from './three/ProfileDisc'
import { config } from '../config'

const benefits = [
  'تغطية مصاريف الإيجار بثقة',
  'دفع أجور الأساتذة والموظفين في وقتها',
  'تحقيق ربح حقيقي من استثمارهم',
  'الاستمرارية والنمو في هذا المجال',
  'تقديم شهادات معتمدة لمتربصين حقيقيين',
  'فتح أبواب الفرص المستقبلية لمتربصيهم',
]

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1 h-[340px] md:h-[420px]"
        >
          <ProfileDisc photoUrl={config.profilePhoto} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-1 md:order-2 text-right"
        >
          <h2 className="font-cairo font-extrabold text-3xl md:text-4xl gradient-text mb-6">من أنا</h2>

          <p className="font-cairo text-text leading-[1.9] text-lg mb-5">
            أنا زياد، ورؤيتي على المدى البعيد هي مساعدة أكبر عدد ممكن من مراكز التكوين الجادة على تعمير أقواسها
            بالمتربصين، من خلال نظام Qualified Course Leads Gen.
          </p>

          <p className="font-cairo text-muted leading-[1.9] text-lg mb-6">
            حولت ما تعلمته في التسويق، البيع، المجال الرقمي، والتواصل مع الجمهور إلى نظام واضح وقابل للقياس، يحل
            مشكلة نقص المتربصين اللي تعاني منها أغلب مراكز التكوين، ويمكنهم من:
          </p>

          <ul className="space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 font-cairo text-text leading-[1.9]">
                <span className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 shrink-0">
                  <Check size={14} className="text-emerald-400" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
