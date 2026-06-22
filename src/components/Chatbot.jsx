import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Send, X } from 'lucide-react'
import { sendChatMessage } from '../lib/gemini'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: 'السلام عليكم! أنا المساعد الذكي لـ EZ LeadFlow. كيف نقدر نساعدك في تعمير قاعات مركزك بالمتربصين؟',
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-muted"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const reply = await sendChatMessage(nextMessages.map(({ role, content }) => ({ role, content })))
      setMessages([
        ...nextMessages,
        { role: 'assistant', content: reply || 'ما قدرت نجاوبك على هذا السؤال، جرب تصيغو بطريقة أخرى أو تواصل معنا على واتساب.' },
      ])
    } catch (error) {
      const isRateLimited = error?.status === 429
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: isRateLimited
            ? 'الطلبات كثرت شوي على المساعد حالياً، عاود حاول بعد لحظات أو تواصل معنا مباشرة على واتساب.'
            : 'حدث خطأ في الاتصال، تواصل معنا مباشرة على واتساب وسنرد عليك فوراً.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-[9999]" style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            dir="rtl"
            className="absolute bottom-20 left-0 w-[92vw] max-w-[380px] h-[min(520px,70vh)] glass-card rounded-2xl shadow-glow flex flex-col overflow-hidden"
            style={{ background: 'rgba(10,10,15,0.92)' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-brand">
                  <Bot size={18} className="text-white" />
                </span>
                <span className="font-cairo font-bold text-text">مساعد EZ LeadFlow</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="إغلاق المحادثة" className="text-muted hover:text-text">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl font-cairo text-sm leading-[1.8] ${
                      m.role === 'user'
                        ? 'bg-gradient-brand text-white rounded-tl-sm'
                        : 'bg-surface border border-border text-text rounded-tr-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-border rounded-2xl rounded-tr-sm">
                    <TypingDots />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 p-3 border-t border-border">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 bg-surface border border-border rounded-full px-4 py-2.5 text-sm font-cairo text-text placeholder:text-muted focus:outline-none focus:border-glow"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                aria-label="إرسال"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-brand disabled:opacity-40 shrink-0"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="فتح المساعد الذكي"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-brand shadow-glow"
      >
        {open ? <X size={26} className="text-white" /> : <Bot size={26} className="text-white" />}
      </motion.button>
    </div>
  )
}
