import { useEffect } from 'react';
import AOS from 'aos';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer'; // Importación del nuevo footer
import './App.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="app-wrapper bg-dark overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <Services /> 
        <Pricing />
        <Contact />
      </main>

      {/* Sustitución del footer antiguo por el completo */}
      <Footer />

      {/* Botón Flotante WhatsApp */}
      <div 
        className="position-fixed bottom-0 end-0 p-4" 
        style={{ zIndex: 2000 }}
        data-aos="fade-left"
        data-aos-delay="1000"
      >
        <a 
          href="https://wa.me/tu-numero" 
          target="_blank" 
          rel="noreferrer"
          className="btn btn-success rounded-circle d-flex align-items-center justify-content-center shadow-lg border-2 border-white btn-whatsapp-custom"
          style={{ width: '65px', height: '65px' }}
        >
          <i className="bi bi-whatsapp fs-2"></i>
        </a>
      </div>
    </div>
  );
}

export default App;