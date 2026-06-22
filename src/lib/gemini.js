import { config } from '../config'

// WARNING: calling the Gemini API directly from the browser exposes your API
// key to anyone who opens devtools. Restrict the key to your site's domain in
// Google AI Studio / Google Cloud Console (HTTP referrer restriction) before
// going live. For zero exposure, proxy this call through a serverless
// function (e.g. a Vercel API route) that holds the key server-side instead.
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_MODEL = 'gemini-2.5-flash-lite'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

const SYSTEM_PROMPT = `أنت مساعد ذكي لزياد الشاوة، مؤسس نظام EZ LeadFlow لتوليد العملاء المؤهلين لمراكز التكوين المهني.

ردّ دائماً بنفس لغة المستخدم (عربية، فرنسية، أو إنجليزية). كن موجزاً، مقنعاً، ومحترفاً.

معلومات الخدمات:
- الخدمة: توليد leads مؤهلة عبر إعلانات Meta لمراكز التكوين
- الجمهور المستهدف: أصحاب ومديرو مراكز التكوين في الجزائر والخليج
- النتيجة المضمونة: متربصون حقيقيون مسجلون خلال 14 يوم
- الإثبات: 3 مراكز، 7 دورات، حصلنا على 198 leads و114 leads في حملات مختلفة
- الخدمات: إعلانات Meta مؤهلة، نظام متابعة ذكي، تتبع التحويلات، إدارة الحملة بالكامل

قواعد صارمة:
- لا تتحدث عن الأسعار أبداً — وجّه للواتساب
- لا تخترع أرقاماً خارج ما ذُكر أعلاه
- اختم كل رد بدعوة للتواصل عبر الواتساب: ${config.whatsappLink}
- إذا سأل عن شيء خارج نطاق الخدمة، أعِد التوجيه بلطف`

const MAX_RETRIES = 2
const RETRY_STATUS = new Set([429, 503])

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function callGemini(conversationHistory) {
  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: conversationHistory.map(({ role, content }) => ({
        role: role === 'assistant' ? 'model' : 'user',
        parts: [{ text: content }],
      })),
      generationConfig: { maxOutputTokens: 1000 },
    }),
  })

  if (!response.ok) {
    const error = new Error(`gemini-error-${response.status}`)
    error.status = response.status
    throw error
  }

  const data = await response.json()
  const candidate = data.candidates?.[0]
  const text = candidate?.content?.parts?.[0]?.text

  if (text) return text

  // Blocked by safety filters or otherwise empty — treat as a soft failure
  // the caller can fall back on, not a thrown error.
  return ''
}

// The Gemini free tier has a tight per-minute request quota shared across
// every call (including other tabs/testing), so transient 429/503s are
// expected. Retry those with backoff before giving up.
export async function sendChatMessage(conversationHistory) {
  if (!GEMINI_API_KEY) {
    throw new Error('missing-api-key')
  }

  let lastError
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await callGemini(conversationHistory)
    } catch (error) {
      lastError = error
      const shouldRetry = RETRY_STATUS.has(error.status) && attempt < MAX_RETRIES
      if (!shouldRetry) break
      await wait(800 * (attempt + 1))
    }
  }

  throw lastError
}
