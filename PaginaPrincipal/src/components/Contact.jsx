import { useState } from 'react';

const Contact = () => {
  // Estado opcional para manejar el hover del botón si deseas efectos JS
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="contacto" className="py-5" style={{
      // Degradado que continúa la estética de la sección de Planes
      background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
      color: 'white'
    }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          {/* Encabezado de la sección */}
          <div className="col-md-6 text-center mb-5" data-aos="fade-up">
            <h2 className="display-4 fw-bold">Contáctanos</h2>
            <p className="opacity-75 fs-5">¿Listo para transformar tu comunidad? Déjanos un mensaje.</p>
          </div>

          {/* Formulario */}
          <div className="col-md-8" data-aos="zoom-in">
            <form 
              className="row g-3 p-4 p-md-5 rounded-4 shadow-lg"
              style={{
                // Fondo blanco con ligera transparencia para un toque moderno
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                color: '#0f172a',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="col-md-6">
                <label className="form-label fw-bold small text-uppercase">Nombre</label>
                <input 
                  type="text" 
                  className="form-control border-0 bg-light py-3 rounded-3" 
                  placeholder="Tu nombre completo"
                  style={{ borderBottom: '2px solid #e2e8f0 !important' }}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-bold small text-uppercase">Email</label>
                <input 
                  type="email" 
                  className="form-control border-0 bg-light py-3 rounded-3" 
                  placeholder="correo@ejemplo.com" 
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold small text-uppercase">Mensaje</label>
                <textarea 
                  className="form-control border-0 bg-light py-3 rounded-3" 
                  rows="4" 
                  placeholder="Escribe tu consulta aquí..."
                ></textarea>
              </div>

              <div className="col-12 text-center mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    // Azul corporativo que definimos en el CSS
                    backgroundColor: '#0056b3',
                    borderColor: '#0056b3',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: isHovered ? 'scale(1.05) translateY(-3px)' : 'scale(1)',
                    boxShadow: isHovered ? '0 10px 20px rgba(0, 86, 179, 0.3)' : '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  Enviar Mensaje <i className="bi bi-send-fill ms-2"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;