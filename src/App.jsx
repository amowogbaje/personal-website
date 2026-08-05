import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import ServicesTeaser from './components/ServicesTeaser.jsx'
import Work from './components/Work.jsx'
import Domains from './components/Domains.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <ServicesTeaser />
        <Work />
        <Domains />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
