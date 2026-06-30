export default function Hero() {
  return (
    <section
      id="top"
      className="grain relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-24 pb-16 overflow-hidden"
    >
      {/* faint trunk line easing the eye toward the Domains signature below */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-paper/10 to-transparent hidden md:block"
      />

      <div className="max-w-6xl w-full mx-auto relative grid md:grid-cols-[1.3fr_0.7fr] gap-12 md:gap-8 items-center">
        <div>
          <p className="font-mono text-sm text-sage mb-6">
            <span className="text-slate">$</span> whoami
          </p>

          <h1 className="font-display text-balance text-[13vw] sm:text-7xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-medium tracking-tightish text-paper">
            Gideon
            <br />
            <span className="text-gold">Amowogbaje</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-xl text-paper/80 leading-relaxed font-light">
            Backend developer fluent in Laravel and NestJS — and, off the clock,
            in hymns, lesson plans, and a marriage. I build systems that hold up
            under load, on the server and in life.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="font-mono text-xs uppercase tracking-widebit bg-gold text-ink px-5 py-3 rounded-full hover:bg-goldsoft transition-colors"
            >
              see the work
            </a>
            <a
              href="#domains"
              className="font-mono text-xs uppercase tracking-widebit text-paper/70 px-5 py-3 rounded-full border border-paper/15 hover:border-paper/40 hover:text-paper transition-colors"
            >
              git log --life
            </a>
          </div>

          <div className="mt-16 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-slate">
            <span>stack: Laravel · FastApi · Go · NestJS · Livewire · Reactjs · Next.js</span>
            <span className="hidden sm:inline">·</span>
            <span>based: Nigeria</span>
          </div>
        </div>

        <div className="relative mx-auto md:mx-0 w-48 md:w-full max-w-xs">
          <div className="absolute -inset-3 rounded-3xl border border-gold/25 hidden md:block" />
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-paper/15 bg-inkdeep">
            <picture>
              <source srcSet="/profile.webp" type="image/webp" />
              <img
                src="/profile-fallback.jpg"
                alt="Gideon Amowogbaje"
                width="640"
                height="640"
                fetchpriority="high"
                decoding="async"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.nextElementSibling.style.display = 'flex'
                }}
              />
            </picture>
            <div className="hidden absolute inset-0 flex-col items-center justify-center gap-2 text-slate">
              <span className="font-mono text-[10px] uppercase tracking-widebit">
                public/profile.png
              </span>
              <span className="font-mono text-[10px] text-slate/70">
                drop your photo here
              </span>
            </div>
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widebit text-slate bg-ink px-3 py-1 rounded-full border border-paper/10 whitespace-nowrap">
            commit 0001 · origin
          </span>
        </div>
      </div>
          
      <a
        href="#work"
        aria-label="Scroll to work"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widebit text-slate hover:text-paper transition-colors animate-bounce motion-reduce:animate-none"
      >
        scroll ↓
      </a>
    </section>
  )
}