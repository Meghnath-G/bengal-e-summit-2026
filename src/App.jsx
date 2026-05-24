import Loader from './components/common/Loader/Loader';
import AppRoutes from './routes';
import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

// Frame preload globals
const HERO_FRAME_COUNT = 181;
const HERO_FRAME_PREFIX = '/video_project/web_frame_loading-page';
const HERO_FRAME_EXT = '.jpg';

function padHeroFrame(n) {
  return n.toString().padStart(5, '0');
}

export const preloadedFrames = {};
export let framesReady = false;
export const onFramesReady = [];

function preloadHeroFrames() {
  const isMobile = window.innerWidth <= 768;
  const skipFactor = isMobile ? 2 : 1;
  const total = Math.floor((HERO_FRAME_COUNT - 1) / skipFactor) + 1;
  let loaded = 0;
  for (let i = 1; i <= HERO_FRAME_COUNT; i += skipFactor) {
    const img = new Image();
    img.src = `${HERO_FRAME_PREFIX}${padHeroFrame(i)}${HERO_FRAME_EXT}`;
    img.onload = () => {
      preloadedFrames[i] = img;
      loaded++;
      if (loaded === total) {
        framesReady = true;
        onFramesReady.forEach(cb => cb());
        onFramesReady.length = 0;
      }
    };
  }
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    preloadHeroFrames();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && <AppRoutes />}
    </>
  );
}
