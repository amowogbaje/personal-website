import ImageSlot from './ImageSlot.jsx'
import Reveal from './Reveal.jsx'
import { testimonials } from '../data/testimonials.js'

export default function Testimonials() {
  if (!testimonials.length) return null
  return (
    <section id="testimonials" className="px-6 md:px-10 py-16 md:py-24 bg-inkdeep">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-medium text-paper mb-8">What people say</h2>
        <div className={`grid gap-6 ${testimonials.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'}`}>
          {testimonials.map((t) => (
            <Reveal key={t.name}><figure className="border border-paper/10 rounded-2xl p-6 bg-ink/60">
              <blockquote className="font-display text-xl sm:text-2xl text-paper leading-snug">“{t.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widebit text-sage">
                <ImageSlot src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                {t.name}
                {t.role ? <span className="text-slate"> · {t.role}</span> : null}
              </figcaption>
            </figure></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
