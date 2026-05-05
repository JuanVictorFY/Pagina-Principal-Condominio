import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Home';
import Login from './Login';
import './App.css';

function App() {
  const location = useLocation();

  // Restablece el scroll arriba cada vez que cambiamos de página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>

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