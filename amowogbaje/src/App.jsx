import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import ServicesTeaser from './components/ServicesTeaser.jsx'
import ProofStrip from './components/ProofStrip.jsx'
import Testimonials from './components/Testimonials.jsx'
import Work from './components/Work.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <ServicesTeaser />
        <Work />
        <Testimonials />
        <section className="px-6 md:px-10 py-14 bg-ink">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <p className="text-paper/70 max-w-2xl leading-relaxed">
              8+ years across Laravel, Go and NestJS, with remote teams in the US, UK and Nigeria.
            </p>
            <div className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widebit">
              <a href="/experience" className="text-gold hover:text-goldsoft transition-colors">my experience →</a>
              <a href="/about" className="text-gold hover:text-goldsoft transition-colors">about me →</a>
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
