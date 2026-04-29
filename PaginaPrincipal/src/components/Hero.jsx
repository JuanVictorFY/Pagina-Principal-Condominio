import Slider from "react-slick";
import FeatureCard from './FeatureCard';

// Solución al error de renderizado de Slick en Vite
const SlickSlider = Slider.default ? Slider.default : Slider;

const Hero = () => {
  const cards = [
    { icon: 'bi-clock-history', title: 'Control de Accesos:', text: 'Gestione ingresos y salidas con un registro detallado de visitantes y residentes.' },
    { icon: 'bi-tools', title: 'Gestión de Áreas:', text: 'Reserve áreas comunes y espacios de estacionamiento de forma digital y segura.' },
    { icon: 'bi-cash-coin', title: 'Pagos Transparentes:', text: 'Gestión de cuotas claras con estados financieros accesibles para todos.' },
    { icon: 'bi-phone', title: 'App para Residentes:', text: 'Proporcione a los residentes una app intuitiva para reportar incidencias.' },
    { icon: 'bi-shield-check', title: 'Seguridad Integrada:', text: 'Sistemas de monitoreo y control de rondas en tiempo real.' },
    { icon: 'bi-people', title: 'Comunicación:', text: 'Mensajería masiva y notificaciones push para toda la comunidad.' }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="hero-container position-relative overflow-hidden" style={{
      background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '60px'
    }}>
      <div className="container text-center text-white mt-5">
        <h1 className="display-2 fw-bold mb-3" data-aos="fade-down">
          Eleva el diseño y control <br/> de tu condominio.
        </h1>
        <p className="lead fs-4 mb-5 opacity-75 mx-auto" style={{ maxWidth: '800px' }} data-aos="fade-up" data-aos-delay="200">
          Un sistema de gestión moderno y eficiente para administradores y residentes. <br/>
          Construido para la simplicidad.
        </p>

        <div className="d-flex justify-content-center gap-3 mb-5" data-aos="zoom-in" data-aos-delay="400">
          <button className="btn btn-light btn-lg px-5 py-3 rounded-3 fw-bold shadow">Ver Tour</button>
          <button className="btn btn-outline-light btn-lg px-5 py-3 rounded-3 fw-bold">Contactar</button>
        </div>

        {/* Carrusel con el espaciado del diseño original */}
        <div className="mt-5 carousel-wrapper" data-aos="fade-up" data-aos-delay="600">
          <SlickSlider {...settings}>
            {cards.map((card, index) => (
              <div key={index} className="px-2 pb-5"> 
                <FeatureCard {...card} />
              </div>
            ))}
          </SlickSlider>
        </div>

        {/* Sección inferior "¿Por qué CondoHub?" */}
        <div className="mt-4 pb-4 opacity-50" data-aos="fade-up">
           <h3 className="fw-light fs-4">¿Por qué CondoHub?</h3>
           <div className="d-flex justify-content-center gap-4 mt-3 flex-wrap small">
              <span>• Monitoreo en tiempo real</span>
              <span>• Acceso Seguro</span>
              <span>• Reportes Inteligentes</span>
              <span>• Acceso Móvil</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;