import { useState } from 'react'

const links = [
  { href: '#work', label: 'work' },
  { href: '#services', label: 'services' },
  { href: '#domains', label: 'domains' },
  { href: '#contact', label: 'contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ink/70 border-b border-paper/10">
      <nav className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          onClick={close}
          className="font-mono text-sm text-goldsoft tracking-tight hover:text-gold transition-colors"
        >
          ~/gideon
        </a>
        <ul className="hidden sm:flex items-center gap-8 font-mono text-xs uppercase tracking-widebit text-slate">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-paper transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="/support"
            className="hidden sm:inline font-mono text-xs uppercase tracking-widebit text-rust hover:text-gold transition-colors"
          >
            support
          </a>
          <a
            href="#contact"
            onClick={close}
            className="font-mono text-xs uppercase tracking-widebit border border-gold/40 text-gold px-3 py-1.5 rounded-full hover:bg-gold hover:text-ink transition-colors"
          >
            say hi
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="sm:hidden p-2 -mr-2 text-paper/80 hover:text-gold transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="sm:hidden border-t border-paper/10 bg-ink/95 px-6 py-4 flex flex-col font-mono text-sm uppercase tracking-widebit text-paper/80"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={close}
                className="block py-3 hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/support" className="block py-3 text-rust hover:text-gold transition-colors">
              support
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
