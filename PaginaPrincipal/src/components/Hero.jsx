import FeatureCard from './FeatureCard'

const Hero = () => {
  const cards = [
    { icon: 'bi-clock-history', title: 'Control de Accesos:', text: 'Gestione ingresos y salidas con un registro detallado.' },
    { icon: 'bi-tools', title: 'Gestión de Áreas:', text: 'Reserve áreas comunes y espacios de estacionamiento.' },
    { icon: 'bi-cash-coin', title: 'Pagos Transparentes:', text: 'Gestión de cuotas claras con estados financieros.' },
    { icon: 'bi-phone', title: 'App para Residentes:', text: 'App intuitiva para reportar incidencias y ver comunicados.' }
  ]

  return (
    <div className="hero-container position-relative overflow-hidden" style={{
      background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container text-center text-white mt-5">
        <h1 className="display-2 fw-bold mb-4" data-aos="fade-down">Eleva el diseño y control <br/> de tu condominio.</h1>
        <p className="lead fs-4 mb-5 opacity-75" data-aos="fade-up" data-aos-delay="200">Construido para la simplicidad y eficiencia.</p>
        
        <div className="d-flex justify-content-center gap-3 mb-5" data-aos="zoom-in" data-aos-delay="400">
          <button className="btn btn-light btn-lg px-5 py-3 rounded-3 fw-bold shadow">Ver Tour</button>
          <button className="btn btn-outline-light btn-lg px-5 py-3 rounded-3 fw-bold">Contactar</button>
        </div>

        <div className="row g-4 mt-5">
          {cards.map((card, index) => (
            <FeatureCard key={index} {...card} delay={200 * index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero