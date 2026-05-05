const DashboardPreview = () => {
  return (
    <section id="dashboard-preview" className="py-5 position-relative" style={{ background: '#0f172a' }}>
      <div className="container py-5 text-center">
        <h6 className="text-info fw-bold text-uppercase mb-3" style={{ letterSpacing: '3px' }} data-aos="fade-down">Administración Centralizada</h6>
        <h2 className="display-4 fw-bold text-white mb-5" data-aos="fade-up">Todo el control en una sola pantalla</h2>
        
        <div className="position-relative mx-auto mt-5" style={{ maxWidth: '1000px' }} data-aos="zoom-in" data-aos-delay="200">
          {/* Resplandor de fondo */}
          <div className="position-absolute top-50 start-50 translate-middle w-100 h-100" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)', zIndex: 0 }}></div>
          
          {/* Simulación de Ventana de Navegador */}
          <div className="position-relative rounded-4 overflow-hidden shadow-lg border" style={{ zIndex: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: '#0f172a' }}>
            
            {/* Cabecera del Navegador (Botones de Mac) */}
            <div className="d-flex align-items-center px-4 py-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05)', backgroundColor: '#020617' }}>
              <div className="d-flex gap-2">
                <div className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: '#ff5f56' }}></div>
                <div className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: '#ffbd2e' }}></div>
                <div className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: '#27c93f' }}></div>
              </div>
            </div>
            
            {/* Imagen del Dashboard interno */}
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000" alt="Vista del Panel de Control" className="img-fluid w-100" style={{ opacity: '0.85' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;