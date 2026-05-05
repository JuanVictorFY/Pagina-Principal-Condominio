const About = () => {
  const stats = [
    { value: "+500", label: "Condominios Activos" },
    { value: "15k+", label: "Residentes Felices" },
    { value: "99.9%", label: "Uptime del Sistema" },
    { value: "24/7", label: "Soporte Dedicado" }
  ];

  return (
    <section id="about" className="py-5" style={{ background: '#020617' }}>
      <div className="container py-5">
        
        {/* Historia / Misión */}
        <div className="row align-items-center g-5 mb-5 pb-5">
          <div className="col-lg-6" data-aos="fade-right">
            <h6 className="text-info fw-bold text-uppercase mb-3" style={{ letterSpacing: '3px' }}>Nuestra Misión</h6>
            <h1 className="display-4 fw-bold text-white mb-4">Construyendo el futuro de la <span className="text-info">convivencia.</span></h1>
            <p className="text-white-50 fs-5 lh-lg mb-4">
              Domus nació al ver cómo los administradores de edificios luchaban con la morosidad y la falta de herramientas tecnológicas. Creemos que tu hogar debe ser un lugar de paz, no de estrés administrativo.
            </p>
            <p className="text-white-50 fs-5 lh-lg">
              Nuestro equipo está formado por expertos en seguridad, desarrollo de software y bienes raíces, unidos por una sola visión: crear el sistema más seguro, intuitivo y poderoso del mercado inmobiliario.
            </p>
          </div>
          <div className="col-lg-6" data-aos="fade-left">
            <div className="position-relative p-1 rounded-5" style={{ background: 'linear-gradient(45deg, #0056b3, #00d4ff)' }}>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200" 
                alt="Equipo Domus" 
                className="img-fluid rounded-5"
                style={{ opacity: '0.9' }}
              />
            </div>
          </div>
        </div>

        {/* Estadísticas de Impacto */}
        <div className="row g-4 mt-3">
          {stats.map((stat, i) => (
            <div className="col-md-3 col-6" key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
              <div className="text-center p-4 rounded-4" style={{ 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <h2 className="display-5 fw-bold text-white mb-2" style={{ textShadow: '0 0 20px rgba(0,212,255,0.4)' }}>
                  {stat.value}
                </h2>
                <span className="text-info text-uppercase fw-bold small" style={{ letterSpacing: '1px' }}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;