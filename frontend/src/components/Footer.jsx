import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-5 pb-4" style={{ background: '#010409', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="row g-4">
          
          {/* COLUMNA 1: Identidad */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex align-items-center justify-content-center me-3 shadow-sm" 
                   style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #0056b3, #00d4ff)', borderRadius: '10px', transform: 'rotate(45deg)' }}>
                <i className="bi bi-buildings-fill text-white" style={{ transform: 'rotate(-45deg)', fontSize: '1.1rem' }}></i>
              </div>
              <span className="fs-4 fw-bold text-white">Domus</span>
            </div>
            <p className="text-white-50 pe-lg-5">
              Elevando el estándar de la gestión residencial a través de tecnología inteligente y diseño de vanguardia.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-white-50 fs-5 transition-all hover-cyan"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="text-white-50 fs-5 transition-all hover-cyan"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white-50 fs-5 transition-all hover-cyan"><i className="bi bi-facebook"></i></a>
            </div>
          </div>

          {/* COLUMNA 2: Enlaces Rápidos */}
          <div className="col-lg-2 col-md-6">
            <h6 className="text-white fw-bold mb-4">Navegación</h6>
            <ul className="list-unstyled">
            <li className="mb-2"><Link to="/" className="text-white-50 text-decoration-none hover-cyan">Inicio</Link></li>
            <li className="mb-2"><a href="/#features" className="text-white-50 text-decoration-none hover-cyan">Módulos SaaS</a></li>
            <li className="mb-2"><a href="/#planes" className="text-white-50 text-decoration-none hover-cyan">Tarifas y Planes</a></li>
            <li className="mb-2"><a href="/#contacto" className="text-white-50 text-decoration-none hover-cyan">Contacto de Ventas</a></li>
            </ul>
          </div>

          {/* COLUMNA 3: Empresa */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-4">La Empresa</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/#about" className="text-white-50 text-decoration-none hover-cyan">Sobre Nosotros</a></li>
              <li className="mb-2"><a href="/#faq" className="text-white-50 text-decoration-none hover-cyan">Preguntas Frecuentes</a></li>
              <li className="mb-2"><Link to="/login" className="text-white-50 text-decoration-none hover-cyan">Portal de Clientes</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: Contacto Técnico */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-4">Soporte VIP</h6>
            <div className="text-white-50">
              <p className="mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-envelope-at text-info"></i> help@domus.com
              </p>
              <p className="mb-2 d-flex align-items-center gap-2">
                <i className="bi bi-telephone text-info"></i> +51 999 888 777
              </p>
              <p className="d-flex align-items-center gap-2">
                <i className="bi bi-geo-alt text-info"></i> Lima, Perú
              </p>
            </div>
          </div>

        </div>

        <hr className="my-5" style={{ borderColor: 'rgba(255,255,255,0.05)' }} />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <small className="text-white-50">© {currentYear} Domus. Todos los derechos reservados.</small>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <a href="#" className="text-white-50 text-decoration-none small mx-3 hover-cyan">Privacidad</a>
            <a href="#" className="text-white-50 text-decoration-none small hover-cyan">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;