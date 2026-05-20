import './Landing.css';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import CountdownSection from './sections/CountdownSection';
import StorySection from './sections/StorySection';
import FlashbackSection from './sections/FlashbackSection';
import StatisticsSection from './sections/StatisticsSection';

export default function Landing() {
  return (
    <>
      {/* Cinematic overlays — fixed, pointer-events:none */}
      <div className="film-grain"></div>
      <div className="vignette"></div>

      <Navbar />
      <HeroSection />
      <AboutSection />
      <CountdownSection />
      <StorySection />
      <FlashbackSection />
      <StatisticsSection />
      
      {/* Official Landing Page Footer */}
      <Footer />
    </>
  );
}




