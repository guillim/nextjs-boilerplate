import Hero from './components/hero';
import Features from './components/features';
import Zigzag from './components/zigzag';
import Testimonials from './components/testimonials';
import Newsletter from './components/newsletter';
import Faq from './components/faq';
import Pricing from './components/pricing';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Zigzag />
      <Testimonials />
      <Faq />
      <Pricing />
      <Newsletter />
    </>
  );
}
