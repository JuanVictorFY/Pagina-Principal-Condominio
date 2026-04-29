const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100 mt-3" style={{ zIndex: 1000 }}>
      <div className="container">
        <a className="navbar-brand d-flex align-items-center fw-bold fs-4" href="#">
          <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '40px', height: '40px' }}>
            <span style={{ fontSize: '0.8rem' }}>CH</span>
          </div>
          CondoHub
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><a className="nav-link text-white px-3" href="#">Inicio</a></li>
            <li className="nav-item"><a className="nav-link text-white px-3" href="#">Servicios</a></li>
            <li className="nav-item"><a className="nav-link text-white px-3" href="#">Planes</a></li>
            <li className="nav-item"><a className="nav-link text-white px-3" href="#">Contacto</a></li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            <a href="#" className="text-white text-decoration-none small">Iniciar Sesión</a>
            <button className="btn btn-light rounded-pill px-4 fw-bold">Empezar</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar