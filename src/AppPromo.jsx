const AppPromo = () => {
  return (
    <section id="app-promo" className="py-5 position-relative" style={{ background: '#0f172a' }}>
      <div className="container py-5 mt-4">
        <div className="row align-items-center g-5">
          
          <div className="col-lg-6" data-aos="fade-right">
            <h6 className="text-info fw-bold text-uppercase mb-3" style={{ letterSpacing: '3px' }}>App para Residentes</h6>
            <h2 className="display-4 fw-bold text-white mb-4">Lleva tu condominio en el bolsillo</h2>
            <p className="text-white-50 fs-5 lh-lg mb-5">
              Autoriza visitas, reserva áreas comunes, paga tus cuotas y recibe notificaciones importantes directamente en tu celular. La vida en comunidad, ahora es mucho más fácil.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <button className="btn btn-outline-light rounded-pill px-4 py-3 d-flex align-items-center gap-3 border-2 hover-cyan">
                <i className="bi bi-apple fs-3"></i>
                <div className="text-start">
                  <small className="d-block" style={{ fontSize: '0.7rem', lineHeight: '1' }}>Consíguelo en el</small>
                  <strong className="d-block" style={{ lineHeight: '1' }}>App Store</strong>
                </div>
              </button>
              <button className="btn btn-outline-light rounded-pill px-4 py-3 d-flex align-items-center gap-3 border-2 hover-cyan">
                <i className="bi bi-google-play fs-3"></i>
                <div className="text-start">
                  <small className="d-block" style={{ fontSize: '0.7rem', lineHeight: '1' }}>DISPONIBLE EN</small>
                  <strong className="d-block" style={{ lineHeight: '1' }}>Google Play</strong>
                </div>
              </button>
            </div>
          </div>

          <div className="col-lg-6 text-center" data-aos="fade-left">
            <div className="position-relative d-inline-block">
              <div className="position-absolute top-50 start-50 translate-middle w-100 h-100 rounded-circle" style={{ background: 'radial-gradient(circle, rgba(37,211,102,0.15) 0%, transparent 70%)', zIndex: 0 }}></div>
              <img src="https://images.unsplash.com/photo-1601972599720-36938d4ecd31?q=80&w=800" alt="Domus Mobile App" className="img-fluid rounded-5 shadow-lg position-relative" style={{ maxWidth: '320px', border: '8px solid #1e293b', zIndex: 1 }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppPromo;