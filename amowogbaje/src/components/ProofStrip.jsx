import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'

const proofs = [
  { n: 115, suffix: 'K+', text: 'monthly Pinterest views on one account, from an AI content pipeline I built', href: '/work/craftprofessor-story-engine', tag: 'CraftProfessor' },
  { n: 3, suffix: ' gateways', text: 'Stripe, Paystack and Flutterwave in one product, with per-country pricing', href: '/work/storyverse-payments', tag: 'Storyverse' },
  { stat: 'Laravel → Go', text: 'core backend services rewritten in a live US team', href: '/work/dayout-laravel-to-go-migration', tag: 'Dayout' },
  { stat: 'Live CRM', text: 'Facebook leads flowing into production, with tokens refreshed automatically', href: '/work/africred-crm-integrations', tag: 'Africred' },
]

function CountUp({ to, suffix }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(to)
      return
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1200)
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))))
        if (k < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{v}{suffix}</span>
}

export default function ProofStrip() {
  return (
    <section aria-label="Selected results" className="px-6 md:px-10 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {proofs.map((p, i) => (
          <Reveal key={p.tag} delay={i * 80} className="h-full">
            <a href={p.href} className="group block h-full border border-paper/10 rounded-2xl p-5 bg-ink/60 hover:border-gold/50 hover:-translate-y-1 transition-all duration-300">
              <p className="font-display text-3xl text-gold">{p.n ? <CountUp to={p.n} suffix={p.suffix} /> : p.stat}</p>
              <p className="mt-2 text-sm text-paper/70 leading-relaxed">{p.text}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-widebit text-sage group-hover:text-paper transition-colors">
                {p.tag} · case study →
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
