import Loader from './components/common/Loader/Loader';
import AppRoutes from './routes';
import { useState, useEffect, useRef } from 'react';
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
  const lenisRef = useRef(null);

  // Initialize Lenis once
  useEffect(() => {
    preloadHeroFrames();

    // Global image drag protection (blocks native drag behaviors across all browsers)
    const handleDragStart = (e) => {
      if (e.target.tagName && e.target.tagName.toUpperCase() === 'IMG') {
        e.preventDefault();
      }
    };
    document.addEventListener('dragstart', handleDragStart);

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    const lenis = new Lenis({
      duration: isMobile ? 0.6 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      syncTouch: isMobile,
      touchMultiplier: isMobile ? 2.3 : 1,
      syncTouchLerp: isMobile ? 0.15 : undefined,
    });
    lenisRef.current = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  // Manage scroll lock and lenis state based on loader
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenisRef.current?.start();

      // Give DOM a frame to update before refreshing ScrollTrigger
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }

    // Cleanup in case component unmounts
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <AppRoutes />
    </>
  );
}
