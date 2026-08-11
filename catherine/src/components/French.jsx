import { useEffect } from 'react'
import { waLink } from '../siteData.js'
import RateSwitcher from './RateSwitcher.jsx'
import Footer from './Footer.jsx'

const FEATURES = [
  {
    title: '100% Online',
    desc: 'Learn from anywhere via Zoom or Google Meet — no commute, no classroom needed.',
    icon: (
      <>
        <rect x="2" y="4" width="20" height="14" rx="1.5" />
        <path d="M8 21h8M12 18v3" />
      </>
    ),
  },
  {
    title: 'One-on-One or Group',
    desc: 'Flexible class sizes that suit how you learn best.',
    icon: <circle cx="12" cy="8" r="4" />,
  },
  {
    title: 'Beginner to Advanced',
    desc: 'A clear path from first words to fluent, confident conversation.',
    icon: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2z" />
      </>
    ),
  },
  {
    title: 'All Ages Welcome',
    desc: 'Grade 1 through post-secondary — lessons adjusted to the learner.',
    icon: (
      <>
        <path d="M20.5 6.5 12 2 3.5 6.5 12 11l8.5-4.5z" />
        <path d="M3.5 6.5v11L12 22l8.5-4.5v-11" />
      </>
    ),
  },
]

const SKILLS = [
  { title: 'Speak & Communicate', desc: 'Gain confidence in real conversations.' },
  { title: 'Build Your Vocabulary', desc: 'Expand and use new words naturally.' },
  { title: 'Improve Grammar & Writing', desc: 'Write clearly and correctly.' },
  { title: 'Develop Listening Skills', desc: 'Understand spoken French with ease.' },
  { title: 'Learn Practical French', desc: 'For daily life, travel, and work.' },
]

export default function French() {
  useEffect(() => {
    document.title = 'French Tutoring — Catherine Amowogbaje'
  }, [])

  return (
    <div className="french-page">
      <header className="site-nav">
        <div className="nav-inner">
          <a href="/" className="nav-name back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Catherine <span>Amowogbaje</span>
          </a>
          <a
            className="btn btn-primary btn-small"
            href={waLink("Hi Catherine, I'd like to book a French lesson.")}
            target="_blank"
            rel="noopener"
          >
            Book a session
          </a>
        </div>
      </header>

      <div className="adire-rule top" />

      {/* ===================== HERO ===================== */}
      <section className="hero french-hero">
        <div className="wrap hero-inner">
          <div>
            <p className="eyebrow">French Tutoring · Online &amp; DELF-Aligned</p>
            <h1>Learn French,<br /><em>speak</em> with confidence.</h1>
            <p className="lede">
              One-on-one and group French lessons for children, students, and
              professionals — taught live online by a DELF B1-certified tutor
              with over a decade of classroom experience. Beginner through
              advanced, at a pace built around you.
            </p>
            <div className="cta-row">
              <a
                className="btn btn-primary"
                href={waLink("Hi Catherine, I'd like to book a French lesson.")}
                target="_blank"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.6 6.32A8.86 8.86 0 0 0 12.04 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.27a8.93 8.93 0 0 0 4.34 1.11h.01A8.94 8.94 0 0 0 20 12.06a8.86 8.86 0 0 0-2.4-5.74zM12.05 19.4a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.8.96.94-2.73-.18-.28a7.42 7.42 0 1 1 13.78-3.94 7.4 7.4 0 0 1-7.69 7.19zm4.07-5.56c-.22-.11-1.3-.64-1.5-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.16-.48.05-.22-.1-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.15.04-.28-.02-.4-.06-.11-.5-1.2-.69-1.65-.18-.43-.37-.37-.5-.38-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.6.28-.2.22-.78.76-.78 1.86 0 1.1.8 2.16.91 2.31.11.15 1.55 2.37 3.76 3.23 2.21.86 2.21.57 2.61.54.4-.03 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.15-.42-.26z" />
                </svg>
                WhatsApp to book
              </a>
              <a className="btn btn-ghost" href="#rates">See pricing</a>
            </div>
          </div>

          <div className="portrait-col">
            <div>
              <div className="portrait-frame french-frame">
                <div className="portrait-photo">
                  <img src="/french-tutor-promo.jpg" alt="CathyDel — Online French private tutoring" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES ===================== */}
      <section className="panel">
        <div className="wrap">
          <div className="feature-strip">
            {FEATURES.map((f) => (
              <div className="feature-item" key={f.title}>
                <svg className="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {f.icon}
                </svg>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT YOU'LL LEARN ===================== */}
      <section>
        <div className="wrap about-grid">
          <div>
            <p className="eyebrow">What You'll Learn</p>
            <h2 style={{ marginTop: 10, fontSize: 'clamp(26px,3.4vw,36px)' }}>
              A path from first words to real fluency.
            </h2>
            <p style={{ marginTop: 18, color: 'var(--ivory-dim)' }}>
              Every lesson plan is built around the learner, not a fixed
              syllabus — a curious 8-year-old and a working professional
              prepping for a relocation get very different lessons, even at
              the same starting level.
            </p>
          </div>
          <ul className="fact-list">
            {SKILLS.map((s) => (
              <li key={s.title}>
                <span className="fact-label">{s.title}</span>
                <span>{s.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===================== FOR CHILDREN / FOR PROFESSIONALS ===================== */}
      <section className="panel">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Two Kinds of Learner</p>
            <h2>Built for the person, not just the level</h2>
          </div>
          <div className="audience-grid">
            <div className="audience-card">
              <h3>For Children</h3>
              <ul>
                <li>Fun, engaging, age-appropriate lessons</li>
                <li>Beginner-friendly, no prior French needed</li>
                <li>Builds real confidence, not just vocabulary</li>
              </ul>
            </div>
            <div className="audience-card">
              <h3>For Professionals</h3>
              <ul>
                <li>Practical, everyday communication</li>
                <li>Workplace and travel-ready French</li>
                <li>Flexible scheduling across time zones</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== RATES ===================== */}
      <section id="rates">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Rate Card</p>
            <h2>Simple, transparent pricing</h2>
            <p>
              Nigeria-based students pay monthly in Naira. Everyone else is
              billed hourly — switch currency below to see your rate.
            </p>
          </div>
          <RateSwitcher />
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="quote-section panel">
        <div className="wrap">
          <blockquote>Your French journey starts with one message.</blockquote>
          <a
            className="btn btn-primary"
            style={{ marginTop: 24 }}
            href={waLink("Hi Catherine, I'd like to book my first French class.")}
            target="_blank"
            rel="noopener"
          >
            Book your first class today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
