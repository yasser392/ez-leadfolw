import { motion } from 'framer-motion'
import { InstagramIcon, FacebookIcon } from './icons/SocialIcons'
import WhatsappButton from './WhatsappButton'
import { config } from '../config'

const socials = [
  { href: config.instagramLink, Icon: InstagramIcon, label: 'Instagram' },
  { href: config.facebookLink, Icon: FacebookIcon, label: 'Facebook' },
]

export default function Contact() {
  return (
    <footer id="contact" className="relative py-24 px-6 border-t border-border">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-cairo font-extrabold text-3xl md:text-4xl gradient-text mb-4"
        >
          جاهز تملأ مقاعد قاعاتك؟
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-cairo text-muted leading-[1.9] text-lg mb-10"
        >
          تواصل معنا الآن وخلّينا نبنيو لك نظام توليد متربصين يضمن تسجيلات حقيقية
        </motion.p>

        <WhatsappButton size="xl" />

        <div className="flex items-center gap-4 mt-12">
          {socials.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-12 h-12 rounded-full glass-card text-muted transition-all duration-300 hover:text-white hover:shadow-glow-sm hover:border-glow/50"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        <p className="label-ui text-muted/70 mt-14">© 2025 EZ LeadFlow — زياد الشاوة</p>
      </div>
    </footer>
  )
}
