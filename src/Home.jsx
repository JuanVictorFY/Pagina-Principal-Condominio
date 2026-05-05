import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Features from './Features';
import About from './About';
import Faq from './Faq';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services /> 
      <Features />
      <About />
      <Pricing />
      <Testimonials />
      <Faq />
      <Contact />
    </main>
  );
};

export default Home;