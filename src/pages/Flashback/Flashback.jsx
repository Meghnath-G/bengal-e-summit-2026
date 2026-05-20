import React, { useEffect } from 'react';
import CinematicTransition from '../../components/common/CinematicTransition/CinematicTransition';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import FilmGrain from './components/FilmGrain';
import Hero from './components/Hero';
import ByTheNumbers from './components/ByTheNumbers';
import Gallery from './components/Gallery';
import WinnersVoices from './components/WinnersVoices';
import FooterCTA from './components/FooterCTA';
import imageDystopia from '../../assets/flashback/image_dystopia.webp';
import './Flashback.css';

export default function Flashback() {
  // Ensure the page always starts at the top on route change
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <CinematicTransition>
      <div
        className="flashback-page-container"
        style={{ '--bg-image': `url(${imageDystopia})` }}
      >
        {/* Scoped Background and Overlays */}
        <div className="flashback-bg" />
        <div className="flashback-overlay" />
        <FilmGrain />

        {/* Global Cinematic Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <ByTheNumbers />
          <Gallery />
          <WinnersVoices />
          <FooterCTA />
        </main>

        {/* Global Cinematic Footer */}
        <Footer />
      </div>
    </CinematicTransition>
  );
}
