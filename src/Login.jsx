import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center py-5 position-relative" style={{ background: '#020617' }}>
      {/* Efecto de luz de fondo */}
      <div className="position-absolute top-50 start-50 translate-middle" style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.05) 0%, transparent 50%)', zIndex: 0 }}></div>
      
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5" data-aos="zoom-in">
            <div className="card border-0 p-4 p-md-5 shadow-lg" style={{
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: '24px'
            }}>
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center mb-4 shadow-lg" 
                     style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #0056b3, #00d4ff)', borderRadius: '18px', transform: 'rotate(45deg)' }}>
                  <i className="bi bi-buildings-fill text-white" style={{ transform: 'rotate(-45deg)', fontSize: '2.2rem' }}></i>
                </div>
                <h3 className="fw-bold text-white mb-2">Bienvenido a Domus</h3>
                <p className="text-white-50">Ingresa tus credenciales para continuar</p>
              </div>

              <form>
                <div className="mb-4">
                  <label className="form-label text-white-50 small fw-bold text-uppercase">Correo Electrónico</label>
                  <input type="email" className="form-control text-white shadow-none py-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} placeholder="ejemplo@correo.com" />
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label className="form-label text-white-50 small fw-bold text-uppercase">Contraseña</label>
                    <a href="#" className="text-info small text-decoration-none hover-cyan">¿Olvidaste tu contraseña?</a>
                  </div>
                  <input type="password" className="form-control text-white shadow-none py-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} placeholder="••••••••" />
                </div>
                <button type="button" className="btn btn-premium-unique text-white w-100 py-3 rounded-pill fw-bold mb-4 mt-2">
                  INICIAR SESIÓN
                </button>
                <div className="text-center">
                  <span className="text-white-50">¿No tienes una cuenta? </span>
                  <Link to="/#contacto" className="text-info text-decoration-none fw-bold hover-cyan">Solicita un Demo</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;