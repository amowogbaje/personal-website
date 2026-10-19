import ImageSlot from './ImageSlot.jsx'
import Reveal from './Reveal.jsx'
import { testimonials } from '../data/testimonials.js'

const PLATFORMS = [
  [/linkedin\.com/i, 'LinkedIn'],
  [/(^|\.)(x|twitter)\.com/i, 'X'],
  [/instagram\.com/i, 'Instagram'],
  [/(facebook|fb)\.com/i, 'Facebook'],
  [/github\.com/i, 'GitHub'],
  [/youtube\.com|youtu\.be/i, 'YouTube'],
  [/tiktok\.com/i, 'TikTok'],
  [/threads\.net/i, 'Threads'],
]

function platformLabel(url) {
  try {
    const host = new URL(url).hostname
    return (PLATFORMS.find(([re]) => re.test(host)) || [null, 'Profile'])[1]
  } catch {
    return 'Profile'
  }
}

export default function Testimonials() {
  if (!testimonials.length) return null
  const single = testimonials.length === 1
  return (
    <section id="testimonials" className="px-6 md:px-10 py-12 md:py-16 bg-ink">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-medium text-paper mb-8">What people say</h2>
        <div className={`grid gap-6 ${single ? 'max-w-3xl' : 'md:grid-cols-2'}`}>
          {testimonials.map((t) => {
            const paras = Array.isArray(t.quote) ? t.quote : [t.quote]
            const long = paras.join(' ').length > 280
            return (
              <Reveal key={t.name}>
                <figure className="border border-paper/10 rounded-2xl p-6 sm:p-8 bg-ink/60">
                  <blockquote className={long ? 'space-y-4 text-base sm:text-lg text-paper/85 leading-relaxed' : 'font-display text-xl sm:text-2xl text-paper leading-snug'}>
                    {paras.map((p, i) => (
                      <p key={i}>{i === 0 ? '“' : ''}{p}{i === paras.length - 1 ? '”' : ''}</p>
                    ))}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <ImageSlot src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="font-mono text-xs uppercase tracking-widebit text-sage">{t.name}</p>
                      {(t.role || t.company) && (
                        <p className="mt-1 text-sm text-paper/60">{[t.role, t.company].filter(Boolean).join(', ')}</p>
                      )}
                      {t.links?.length ? (
                        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px]">
                          {t.links.map((l) => (
                            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                              aria-label={`${t.name} on ${l.label || platformLabel(l.url)} (opens in a new tab)`}
                              className="text-gold hover:text-goldsoft transition-colors">
                              {l.label || platformLabel(l.url)} ↗
                            </a>
                          ))}
                        </p>
                      ) : null}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
