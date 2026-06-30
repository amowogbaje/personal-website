const commits = [
  {
    branch: 'main',
    hash: '7c1a04e',
    title: 'Backend Development',
    body:
      'Laravel and NestJS by trade. Database design, system architecture, and a stubborn insistence on documentation — the parts of the job that keep the lights on after launch day.',
    accent: 'border-gold/50 text-gold',
    dot: 'bg-gold',
  },
  {
    branch: 'branch/faith',
    hash: 'e98213b',
    title: 'Christ Representative',
    body:
      'Faith is the root commit, not a side branch. It sets the direction for every decision before the code does.',
    accent: 'border-sage/50 text-sage',
    dot: 'bg-sage',
  },
  {
    branch: 'branch/songwriting',
    hash: '4f02d9a',
    title: 'Christian Songwriter',
    body:
      'Writing songs the same way I write systems — for clarity, for endurance, and for someone else to find their footing in.',
    accent: 'border-rust/60 text-rust',
    dot: 'bg-rust',
  },
  {
    branch: 'branch/teaching',
    hash: '21bb6c0',
    title: 'Teacher, part-time',
    body:
      'Once full-time, now part-time, never fully off duty. The bond with former students outlasts the classroom.',
    accent: 'border-slate/60 text-slate',
    dot: 'bg-slate',
  },
  {
    branch: 'branch/family',
    hash: 'a7e441f',
    title: 'Husband',
    body:
      'The branch that gets the most careful merges. Everything else is built to make room for this one.',
    accent: 'border-goldsoft/60 text-goldsoft',
    dot: 'bg-goldsoft',
  },
]

export default function Domains() {
  return (
    <section id="domains" className="px-6 md:px-10 py-28 md:py-36 bg-ink">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-paper mb-4">
            Domains
          </h2>
          <p className="text-paper/65 max-w-xl leading-relaxed">
            Five branches, one history. Here's how the rest of the roles sit
            alongside the backend work.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-paper/15"
          />

          <ol className="space-y-12">
            {commits.map((c) => (
              <li key={c.hash} className="relative pl-10">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full ring-4 ring-ink ${c.dot}`}
                />
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className={`font-mono text-xs ${c.accent}`}>
                    {c.branch}
                  </span>
                  <span className="font-mono text-xs text-slate">
                    {c.hash}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-paper mb-2">
                  {c.title}
                </h3>
                <p className="text-paper/65 leading-relaxed max-w-2xl">
                  {c.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="relative pl-10 mt-12 pt-8 border-t border-paper/10">
            <span
              aria-hidden="true"
              className="absolute left-0 top-9 w-3.5 h-3.5 rounded-full ring-4 ring-ink bg-paper"
            />
            <span className="font-mono text-xs text-paper/50">
              merge branch/faith, branch/songwriting, branch/teaching,
              branch/family → main
            </span>
            <p className="mt-3 font-display text-xl text-paper/90 italic leading-relaxed max-w-2xl">
              "Don't make a case against yourself, because God won't make a
              case against you. Keep hope alive."
            </p>
            <p className="mt-2 font-mono text-xs text-slate">
              — a line from my pastor I keep coming back to
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
