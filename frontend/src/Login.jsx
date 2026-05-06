import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 1. Validar campos vacíos
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      setIsLoading(false);
      return;
    }

    try {
      // 2. Llamada real al backend con Axios
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email,
        password: password
      });

      // 3. Extraer el token y los datos del usuario de la respuesta
      const { token, user } = response.data;
      localStorage.setItem('domus_token', token);
      localStorage.setItem('domus_user', JSON.stringify(user));

      // 4. Redirigir al dashboard con los datos del usuario
      navigate('/dashboard', { state: { role: user.role, userEmail: user.email } }); 
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(err.response?.data?.message || "Error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

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

              {/* Alerta de Error */}
              {error && (
                <div className="alert alert-danger bg-transparent border-danger text-danger text-center small py-2 mb-4 rounded-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="form-label text-white-50 small fw-bold text-uppercase">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="form-control text-white shadow-none py-3" 
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} 
                    placeholder="ejemplo@correo.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label className="form-label text-white-50 small fw-bold text-uppercase">Contraseña</label>
                    <a href="#" className="text-info small text-decoration-none hover-cyan">¿Olvidaste tu contraseña?</a>
                  </div>
                  <input 
                    type="password" 
                    className="form-control text-white shadow-none py-3" 
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-premium-unique text-white w-100 py-3 rounded-pill fw-bold mb-4 mt-2 d-flex justify-content-center align-items-center" disabled={isLoading}>
                  {isLoading ? (
                    <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Ingresando...</>
                  ) : (
                    'INICIAR SESIÓN'
                  )}
                </button>
                <div className="text-center">
                  <span className="text-white-50">¿No tienes una cuenta? </span>
                  <Link to="/#contacto" className="text-info text-decoration-none fw-bold hover-cyan">Solicita un Demo</Link>
                </div>

                {/* SECCIÓN DEMO: Autocompletado de credenciales */}
                <div className="mt-4 pt-4 border-top border-secondary border-opacity-25 text-center">
                  <span className="text-white-50 small mb-3 d-block">Prueba la plataforma con un rol (Demo):</span>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-info rounded-pill px-3"
                      onClick={() => { setEmail('admin@domus.com'); setPassword('123'); }}
                    >
                      Administrador
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-success rounded-pill px-3"
                      onClick={() => { setEmail('residente@domus.com'); setPassword('123'); }}
                    >
                      Residente
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-warning rounded-pill px-3"
                      onClick={() => { setEmail('seguridad@domus.com'); setPassword('123'); }}
                    >
                      Seguridad
                    </button>
                  </div>
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