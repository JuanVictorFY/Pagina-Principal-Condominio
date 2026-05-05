import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Features from './Features';
import About from './About';
import Faq from './Faq';
import DashboardPreview from './DashboardPreview';
import AppPromo from './AppPromo';
import Integrations from './Integrations';
import Steps from './Steps';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services /> 
      <DashboardPreview />
      <Features />
      <AppPromo />
      <Integrations />
      <About />
      <Testimonials />
      <Steps /> {/* Proceso de implementación */}
      <Pricing />
      <Faq />
      <Contact />
    </main>
  );
};

export default Home;