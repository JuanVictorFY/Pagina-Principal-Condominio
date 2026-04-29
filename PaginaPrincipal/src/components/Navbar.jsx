import { useState } from 'react';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Estilo base para los links simples
  const navLinkStyle = {
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100 mt-3" style={{ zIndex: 1000 }}>
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Logo animado (Escala al pasar el mouse) */}
        <a className="navbar-brand d-flex align-items-center fw-bold fs-4" href="#" style={navLinkStyle} 
           onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
           onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-2 shadow-sm" 
               style={{ width: '40px', height: '40px' }}>
            <span style={{ fontSize: '0.8rem' }}>CH</span>
          </div>
          CondoHub
        </a>

        {/* Links Centrales con efecto de subrayado suave */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3">
            {['Inicio', 'Servicios', 'Planes', 'Contacto'].map((item) => (
              <li className="nav-item" key={item}>
                <a className="nav-link text-white opacity-75 fw-medium custom-nav-link" href="#" style={navLinkStyle}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Botones de Acción */}
        <div className="d-flex align-items-center gap-4">
          <a href="#" className="text-white text-decoration-none small fw-semibold opacity-75" 
             style={navLinkStyle}
             onMouseOver={(e) => {e.target.style.opacity = '1'; e.target.style.transform = 'translateY(-2px)'}}
             onMouseOut={(e) => {e.target.style.opacity = '0.75'; e.target.style.transform = 'translateY(0)'}}>
            Iniciar Sesión
          </a>
          
          {/* Botón Principal Animado */}
          <button 
            className="btn btn-light rounded-pill px-4 py-2 fw-bold shadow-sm"
            style={{
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: isHovered ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
              boxShadow: isHovered ? '0 10px 20px rgba(255,255,255,0.2)' : '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Empezar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;