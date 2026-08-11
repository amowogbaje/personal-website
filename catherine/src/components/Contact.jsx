import { EMAIL, LINKEDIN_URL, waLink } from '../siteData.js'

export default function Contact() {
  return (
    <section id="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="eyebrow">Get In Touch</p>
          <h2 style={{ marginTop: 10, fontSize: 'clamp(26px,3.4vw,36px)' }}>
            Let's work together
          </h2>
          <p style={{ color: 'var(--ivory-dim)', marginTop: 14 }}>
            Reach out about tutoring, counselling, or fabric sourcing — the fastest way
            to reach Catherine is on WhatsApp, where she typically replies within a day.
          </p>

          <ul className="contact-list">
            <li>
              <a href={`mailto:${EMAIL}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={waLink()} target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.39a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.69-1.11a2 2 0 0 1 2.11-.45c.79.24 1.58.42 2.39.54A2 2 0 0 1 22 16.92z" />
                </svg>
                +234 811 146 8652 (WhatsApp &amp; Calls)
              </a>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V9h3zm-1.5-11.3A1.7 1.7 0 1 1 6.5 6a1.7 1.7 0 0 1 0 1.7zM19 19h-3v-5.4c0-1.3-.5-2.2-1.7-2.2a1.8 1.8 0 0 0-1.7 1.2 2.3 2.3 0 0 0-.1.8V19h-3s.04-9.3 0-10h3v1.4a3 3 0 0 1 2.7-1.5c2 0 3.5 1.3 3.5 4z" />
                </svg>
                LinkedIn Profile
              </a>
            </li>
            <li className="static-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Ile-Ife, Osun State, Nigeria
            </li>
          </ul>
        </div>

        <div>
          <div className="whatsapp-panel">
            <div className="wa-icon-wrap">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 6.32A8.86 8.86 0 0 0 12.04 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.27a8.93 8.93 0 0 0 4.34 1.11h.01A8.94 8.94 0 0 0 20 12.06a8.86 8.86 0 0 0-2.4-5.74zM12.05 19.4a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.8.96.94-2.73-.18-.28a7.42 7.42 0 1 1 13.78-3.94 7.4 7.4 0 0 1-7.69 7.19zm4.07-5.56c-.22-.11-1.3-.64-1.5-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05-.22-.1-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.15.04-.28-.02-.4-.06-.11-.5-1.2-.69-1.65-.18-.43-.37-.37-.5-.38-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.6.28-.2.22-.78.76-.78 1.86 0 1.1.8 2.16.91 2.31.11.15 1.55 2.37 3.76 3.23 2.21.86 2.21.57 2.61.54.4-.03 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.15-.42-.26z" />
              </svg>
            </div>
            <h3>Message her on WhatsApp</h3>
            <p>
              The quickest way to reach Catherine. Tap below to open a chat — let her
              know whether it's about teaching, counselling, French lessons, or fabric
              sourcing, and she'll take it from there.
            </p>
            <a
              className="btn btn-primary"
              href={waLink('Hi Catherine, I found your website and would like to get in touch.')}
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                <path d="M17.6 6.32A8.86 8.86 0 0 0 12.04 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.27a8.93 8.93 0 0 0 4.34 1.11h.01A8.94 8.94 0 0 0 20 12.06a8.86 8.86 0 0 0-2.4-5.74zM12.05 19.4a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.8.96.94-2.73-.18-.28a7.42 7.42 0 1 1 13.78-3.94 7.4 7.4 0 0 1-7.69 7.19zm4.07-5.56c-.22-.11-1.3-.64-1.5-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05-.22-.1-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.15.04-.28-.02-.4-.06-.11-.5-1.2-.69-1.65-.18-.43-.37-.37-.5-.38-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.6.28-.2.22-.78.76-.78 1.86 0 1.1.8 2.16.91 2.31.11.15 1.55 2.37 3.76 3.23 2.21.86 2.21.57 2.61.54.4-.03 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.15-.42-.26z" />
              </svg>
              Chat on WhatsApp
            </a>
            <p className="wa-note">
              Prefer not to use WhatsApp? <strong>+234 811 146 8652</strong> also takes
              calls, or email the address listed to the left.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
