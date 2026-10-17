import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const ENDPOINT = '/api/chat.php'
const STORAGE_KEY = 'gideon-chat-v1'

// Invitation: shown once per visit, after 20s AND once the visitor has scrolled ~35% (or at 60s). If the visitor
// says "No thanks" we stay quiet for a week.
const INVITED_KEY = 'gideon-chat-invited' // sessionStorage: already invited this visit
const DISMISSED_KEY = 'gideon-chat-dismissed' // localStorage: timestamp of "No thanks"
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000
const MIN_DELAY_MS = 20000 // earliest the invite may appear
const FALLBACK_MS = 60000 // shown by now even if the visitor hasn't scrolled
const INVITES = [
  "Hi, I'm Gideon's AI assistant. Curious about his work, or whether he can help with your project?",
  "Looking for a fullstack developer? Ask me anything about Gideon's projects, stack and experience.",
  "Have a question about Gideon's skills, past work or how to hire him? I can answer it right here.",
]

const GREETING = {
  role: 'assistant',
  content:
    "Hi, I'm Gideon's AI assistant. Ask me about his work, projects, stack, or whether he can help with what you're building.",
}

const SUGGESTIONS = [
  'What does Gideon build?',
  'What is his tech stack?',
  'Show me his best projects',
  'How can I hire him?',
]

const ERRORS = {
  429: "I'm getting a lot of questions right now. Please try again in a minute, or email Gideon at hello@amowogbaje.com.",
  default:
    "Sorry, I couldn't answer that just now. You can reach Gideon directly at hello@amowogbaje.com.",
}

// Turn URLs and emails in plain text into links without using innerHTML.
function Linkified({ text }) {
  const parts = text.split(/(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.-]+)/g)
  return parts.map((part, i) => {
    if (i % 2 === 0) return part
    const trailing = part.match(/[.,;:!?)]+$/)?.[0] ?? ''
    const clean = trailing ? part.slice(0, -trailing.length) : part
    const href = clean.includes('@') && !clean.startsWith('http') ? `mailto:${clean}` : clean
    return (
      <span key={i}>
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-2 text-gold hover:text-goldsoft break-all"
        >
          {clean}
        </a>
        {trailing}
      </span>
    )
  })
}

function loadSaved() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
    if (Array.isArray(saved) && saved.length) return saved
  } catch {
    /* storage unavailable — start fresh */
  }
  return [GREETING]
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(loadSaved)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [invite, setInvite] = useState(null) // invitation text, or null when hidden
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const openRef = useRef(false)

  useEffect(() => {
    openRef.current = open
  }, [open])

  // Show the invitation once, at a random moment, unless they've chatted or declined.
  useEffect(() => {
    try {
      const dismissedAt = Number(localStorage.getItem(DISMISSED_KEY) || 0)
      if (Date.now() - dismissedAt < COOLDOWN_MS) return
      if (sessionStorage.getItem(INVITED_KEY)) return
    } catch {
      /* storage unavailable — fall through and invite anyway */
    }
    let ready = false
    let shown = false
    const cleanup = () => {
      clearTimeout(readyTimer)
      clearTimeout(fallbackTimer)
      window.removeEventListener('scroll', onScroll)
    }
    const show = () => {
      if (shown || openRef.current) return
      shown = true
      setInvite(INVITES[Math.floor(Math.random() * INVITES.length)])
      try {
        sessionStorage.setItem(INVITED_KEY, '1')
      } catch {
        /* ignore */
      }
      cleanup()
    }
    const onScroll = () => {
      if (!ready) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max > 0 && window.scrollY / max > 0.35) show()
    }
    const readyTimer = setTimeout(() => {
      ready = true
      onScroll()
    }, MIN_DELAY_MS)
    const fallbackTimer = setTimeout(show, FALLBACK_MS)
    window.addEventListener('scroll', onScroll, { passive: true })
    return cleanup
  }, [])

  function dismissInvite() {
    setInvite(null)
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()))
    } catch {
      /* ignore */
    }
  }

  function acceptInvite() {
    setInvite(null)
    setOpen(true)
  }

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)))
    } catch {
      /* ignore */
    }
  }, [messages])

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ block: 'end' })
    }
  }, [messages, loading, open])

  useEffect(() => {
    if (!invite || open) return
    const onKey = (e) => e.key === 'Escape' && dismissInvite()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [invite, open])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function send(raw) {
    const text = raw.trim()
    if (!text || loading) return
    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-10) }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.reply) {
        throw new Error(String(res.status))
      }
      setMessages([...next, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages([
        ...next,
        { role: 'assistant', content: ERRORS[err.message] || ERRORS.default, error: true },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onlyGreeting = messages.length === 1

  return (
    <div
      className="fixed right-4 sm:right-6 z-[60]"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {open && (
        <section
          role="dialog"
          aria-label="Chat with Gideon's AI assistant"
          className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-[23rem] h-[min(34rem,calc(100dvh-8rem))] flex flex-col rounded-2xl border border-paper/15 bg-inkdeep shadow-2xl shadow-black/50 overflow-hidden"
        >
          <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-paper/10 bg-ink">
            <div className="min-w-0">
              <p className="font-display text-base text-paper leading-tight">Ask about Gideon</p>
              <p className="font-mono text-[10px] uppercase tracking-widebit text-slate">
                AI assistant · may make mistakes
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-lg text-paper/60 hover:text-paper hover:bg-paper/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                    m.role === 'user'
                      ? 'bg-gold text-inkdeep rounded-br-md'
                      : `border rounded-bl-md ${
                          m.error
                            ? 'border-rust/40 bg-rust/10 text-paper/85'
                            : 'border-paper/10 bg-paper/5 text-paper/85'
                        }`
                  }`}
                >
                  {m.role === 'assistant' ? <Linkified text={m.content} /> : m.content}
                </div>
              </div>
            ))}

            {onlyGreeting && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="font-mono text-[11px] text-sage border border-sage/30 rounded-full px-3 py-1.5 hover:bg-sage/10 transition-colors text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="border border-paper/10 bg-paper/5 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1" aria-label="Assistant is typing">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-paper/50 animate-bounce motion-reduce:animate-none"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 p-3 border-t border-paper/10 bg-ink"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="Ask a question…"
              aria-label="Your question"
              className="flex-1 min-w-0 bg-inkdeep border border-paper/15 rounded-full px-4 py-2.5 text-base sm:text-sm text-paper placeholder:text-paper/35 focus:border-gold/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="shrink-0 p-2.5 rounded-full bg-gold text-inkdeep hover:bg-goldsoft transition-colors disabled:opacity-40 disabled:hover:bg-gold"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>
      )}

      {invite && !open && (
        <div
          role="status"
          className="chat-invite absolute bottom-16 right-0 w-[calc(100vw-2rem)] sm:w-80 rounded-2xl border border-gold/40 bg-inkdeep p-4 shadow-2xl shadow-black/50"
        >
          <p className="font-display text-base text-paper leading-snug">{invite}</p>
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={acceptInvite}
              className="font-mono text-xs uppercase tracking-widebit bg-gold text-inkdeep rounded-full px-4 py-2 hover:bg-goldsoft transition-colors"
            >
              Start chatting
            </button>
            <button
              type="button"
              onClick={dismissInvite}
              className="font-mono text-xs uppercase tracking-widebit text-paper/70 border border-paper/20 rounded-full px-4 py-2 hover:text-paper hover:border-paper/40 transition-colors"
            >
              No thanks
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setInvite(null)
          setOpen((o) => !o)
        }}
        aria-label={open ? 'Close chat' : "Chat with Gideon's AI assistant"}
        aria-expanded={open}
        className="ml-auto flex items-center gap-2 rounded-full bg-gold text-inkdeep shadow-lg shadow-black/40 hover:bg-goldsoft transition-colors p-3.5 sm:px-5 sm:py-3"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        <span className="hidden sm:inline font-mono text-xs uppercase tracking-widebit">
          {open ? 'close' : 'ask about gideon'}
        </span>
      </button>
    </div>
  )
}
