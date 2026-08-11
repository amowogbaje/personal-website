import { EMAIL, LINKEDIN_URL, waLink } from '../siteData.js'

export default function Footer() {
  return (
    <footer>
      <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, width: '100%' }}>
        <div className="foot-name">Catherine Amowogbaje</div>
        <div className="foot-links">
          <a href={`mailto:${EMAIL}`}>Email</a>
          <a href={waLink()} target="_blank" rel="noopener">WhatsApp</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener">LinkedIn</a>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ivory-dim)' }}>© 2026 · Ile-Ife, Nigeria</div>
      </div>
    </footer>
  )
}
