import { useEffect } from 'react';
import AOS from 'aos';

// Importación de componentes existentes
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Importación de los nuevos componentes
import Pricing from './components/Pricing';
import Contact from './components/Contact';

import './App.css';

function App() {
  useEffect(() => {
    // Inicialización de animaciones con AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="app-wrapper bg-dark overflow-x-hidden">
      {/* 1. Navegación superior fija/absoluta */}
      <Navbar />

      <main>
        {/* 2. Sección de Bienvenida (Video + Carrusel) */}
        <Hero />

        {/* 3. Sección de Planes de Suscripción */}
        <Pricing />

        {/* 4. Sección de Formulario de Contacto */}
        <Contact />
      </main>

      {/* 5. Footer sencillo para cerrar la página */}
      <footer className="bg-black text-white-50 py-4 text-center">
        <small>© {new Date().getFullYear()} CondoHub - Gestión Inteligente de Condominios</small>
      </footer>

      {/* Botón Flotante WhatsApp con animación de entrada */}
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
          className="btn btn-success rounded-circle d-flex align-items-center justify-content-center shadow-lg border-2 border-white"
          style={{ 
            width: '65px', 
            height: '65px',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <i className="bi bi-whatsapp fs-2"></i>
        </a>
      </div>
    </div>
  );
}

export default App;