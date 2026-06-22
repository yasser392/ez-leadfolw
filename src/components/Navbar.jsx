import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { config } from '../config'

const links = [
  { href: '#services', label: 'الخدمات' },
  { href: '#videos', label: 'النتائج' },
  { href: '#about', label: 'من أنا' },
  { href: '#contact', label: 'تواصل' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-card shadow-glow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero') }}>
          <img src={config.logo} alt="EZ LeadFlow" className="h-12 w-auto object-contain" />
        </a>

        <ul className="hidden md:flex items-center gap-8 font-cairo font-semibold text-text">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="hover:text-glow transition-colors duration-200"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-text"
          onClick={() => setOpen((v) => !v)}
          aria-label="فتح القائمة"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-card overflow-hidden flex flex-col items-center gap-5 py-6 font-cairo font-semibold text-text"
          >
            {links.map((link) => (
              <li key={link.href}>
                <button onClick={() => handleNavClick(link.href)} className="hover:text-glow transition-colors duration-200">
                  {link.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
