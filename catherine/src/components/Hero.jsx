import { waLink } from '../siteData.js'

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div>
          <p className="eyebrow">Ile-Ife, Osun State · Nigeria</p>
          <h1>Guiding minds,<br /><em>curating</em> beauty.</h1>
          <div className="role-row">
            <span className="role-chip">Guidance Counsellor</span>
            <span className="role-chip">French Tutor</span>
            <span className="role-chip">Online Tutoring</span>
            <span className="role-chip">Textile Curator</span>
          </div>
          <p className="lede">
            Catherine Chinyere Amowogbaje is a Guidance &amp; Counselling graduate and
            DELF-certified French teacher with over a decade in classrooms, counselling
            rooms, and — most recently — in the rich world of West African textiles. She
            helps students find clarity and helps clients find fabric worth keeping.
          </p>
          <div className="cta-row">
            <a
              className="btn btn-primary"
              href={waLink("Hi Catherine, I'd like to book a session with you.")}
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z" opacity="0" />
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Book a session
            </a>
            <a className="btn btn-ghost" href={waLink()} target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 6.32A8.86 8.86 0 0 0 12.04 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.27a8.93 8.93 0 0 0 4.34 1.11h.01A8.94 8.94 0 0 0 20 12.06a8.86 8.86 0 0 0-2.4-5.74zM12.05 19.4a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.8.96.94-2.73-.18-.28a7.42 7.42 0 1 1 13.78-3.94 7.4 7.4 0 0 1-7.69 7.19zm4.07-5.56c-.22-.11-1.3-.64-1.5-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05-.22-.1-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.15.04-.28-.02-.4-.06-.11-.5-1.2-.69-1.65-.18-.43-.37-.37-.5-.38-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.6.28-.2.22-.78.76-.78 1.86 0 1.1.8 2.16.91 2.31.11.15 1.55 2.37 3.76 3.23 2.21.86 2.21.57 2.61.54.4-.03 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.15-.42-.26z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="portrait-col">
          <div>
            <div className="portrait-frame">
              <div className="portrait-photo">
                <img src="/profile.png" alt="Catherine Amowogbaje" />
              </div>
            </div>
            <p className="portrait-caption">Catherine C. Amowogbaje</p>
          </div>
        </div>
      </div>
    </section>
  )
}
