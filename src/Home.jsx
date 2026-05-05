import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services /> 
      <Pricing />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Home;