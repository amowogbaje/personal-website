import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Quote from './components/Quote.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

// Section order is intentionally services-first: a visitor should be able to
// see what Catherine offers and how to reach her within a couple of
// scrolls, with the fuller "About" background available right after for
// anyone who wants more context before booking.
export default function App() {
  return (
    <>
      <Nav />
      <div className="adire-rule top" />
      <main>
        <Hero />
        <Services />
        <About />
        <Experience />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
