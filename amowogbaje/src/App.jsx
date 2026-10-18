import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import ServicesTeaser from './components/ServicesTeaser.jsx'
import HomeMore from './components/HomeMore.jsx'
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
        <HomeMore />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
