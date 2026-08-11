import { useState } from 'react'
import { NAV_LINKS } from '../siteData.js'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <div className="nav-name">Catherine <span>Amowogbaje</span></div>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
        <nav className={`links${open ? ' open' : ''}`} id="navLinks">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
