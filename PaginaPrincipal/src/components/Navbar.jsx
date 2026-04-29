import { useState } from 'react';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Estilo base para las transiciones
  const navLinkStyle = {
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const navItems = [
    { name: 'Inicio', link: '#' },
    { name: 'Servicios', link: '#' },
    { name: 'Planes', link: '#planes' },
    { name: 'Contacto', link: '#contacto' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100 mt-3" style={{ zIndex: 1000 }}>
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Logo animado */}
        <a className="navbar-brand d-flex align-items-center fw-bold fs-4" href="#" style={navLinkStyle} 
           onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
           onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-2 shadow-sm" 
               style={{ width: '40px', height: '40px' }}>
            <span style={{ fontSize: '0.8rem' }}>CH</span>
          </div>
          CondoHub
        </a>

        {/* Links Centrales */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3">
            {navItems.map((item) => (
              <li className="nav-item" key={item.name}>
                <a 
                  className="nav-link text-white opacity-75 fw-medium custom-nav-link" 
                  href={item.link} 
                  style={navLinkStyle}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Botones de Acción */}
        <div className="d-flex align-items-center gap-4">
          <a href="#" className="text-white text-decoration-none small fw-semibold opacity-75" 
             style={navLinkStyle}
             onMouseOver={(e) => {
               e.target.style.opacity = '1'; 
               e.target.style.transform = 'translateY(-2px)';
             }}
             onMouseOut={(e) => {
               e.target.style.opacity = '0.75'; 
               e.target.style.transform = 'translateY(0)';
             }}>
            Iniciar Sesión
          </a>
          
          {/* BOTÓN ACTUALIZADO CON TEMÁTICA AZUL */}
          <button 
            className="btn rounded-pill px-4 py-2 fw-bold"
            style={{
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              // Aplicamos la lógica de FeatureCard: azul en hover, blanco en reposo
              backgroundColor: isHovered ? '#0056b3' : '#f8f9fa',
              color: isHovered ? '#fff' : '#0056b3',
              border: isHovered ? '2px solid #0056b3' : '2px solid transparent',
              transform: isHovered ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
              boxShadow: isHovered ? '0 10px 20px rgba(0, 86, 179, 0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => window.location.href = '#contacto'}
          >
            Empezar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;