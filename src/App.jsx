import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Videos from './components/Videos'
import About from './components/About'
import Contact from './components/Contact'
import WhatsappFAB from './components/WhatsappFAB'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Testimonials />
        <Videos />
        <About />
        <Contact />
      </main>
      <WhatsappFAB />
      <Chatbot />
    </>
  )
}

export default App
