import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lazy load route pages
const Landing = lazy(() => import('./pages/Landing/Landing'));
const Teams = lazy(() => import('./pages/Teams/Teams'));
const Partners = lazy(() => import('./pages/Partners/Partners'));
const Events = lazy(() => import('./pages/Events/Events'));
const Flashback = lazy(() => import('./pages/Flashback/Flashback'));

// Preload the Landing page chunk immediately when routes.jsx is parsed.
// This runs in the background while the 7-second preloader is active.
const preloadLanding = () => import('./pages/Landing/Landing');
preloadLanding();

function RouteWrapper({ children }) {
  return children;
}

export default function AppRoutes() {
  const location = useLocation();

  // Very lightweight, minimal dark fallback to prevent white flashes during route chunk loading
  const fallback = (
    <div
      style={{
        background: '#0a0a0c', // Matches --bg-primary
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0,
        animation: 'fadeInFallback 0.2s forwards'
      }}
    >
      <style>{`
        @keyframes fadeInFallback {
          to { opacity: 1; }
        }
        @keyframes spinFallback {
          to { transform: rotate(360deg); }
        }
      `}</style>
      {/* Minimal cinematic glow/accent loader */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid rgba(223, 177, 91, 0.1)',
          borderTopColor: '#dfb15b', // Solar gold accent
          animation: 'spinFallback 0.8s linear infinite',
          boxShadow: '0 0 15px rgba(223, 177, 91, 0.1)'
        }}
      />
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RouteWrapper><Landing /></RouteWrapper>} />
        <Route path="/teams" element={<RouteWrapper><Teams /></RouteWrapper>} />
        <Route path="/partners" element={<RouteWrapper><Partners /></RouteWrapper>} />
        <Route path="/events" element={<RouteWrapper><Events /></RouteWrapper>} />
        <Route path="/flashback" element={<RouteWrapper><Flashback /></RouteWrapper>} />
      </Routes>
    </Suspense>
  );
}

