import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import ServicesTeaser from './components/ServicesTeaser.jsx'
import Experience from './components/Experience.jsx'
import Work from './components/Work.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Work />
        <ServicesTeaser />
        <section className="px-6 md:px-10 py-14 bg-ink">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <p className="text-paper/70 max-w-2xl leading-relaxed">
              Beyond the code: I used to teach, I build and run my own products, and I care about explaining trade-offs clearly.
            </p>
            <a href="/about" className="font-mono text-xs text-gold uppercase tracking-widebit hover:text-goldsoft transition-colors">
              more about me →
            </a>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
