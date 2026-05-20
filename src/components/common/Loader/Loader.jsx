import { useState, useEffect, useMemo } from 'react';
import './Loader.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [lightningOpacity, setLightningOpacity] = useState(0);
  const [isFlashed, setIsFlashed] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // 1. Generate stable floating particles with randomized dimensions
  const particles = useMemo(() => {
    const temp = [];
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        id: i,
        size: Math.random() * 4 + 1,            // 1px to 5px
        posX: Math.random() * 100,             // 0 to 100vw
        posY: Math.random() * 100,             // 0 to 100vh
        delay: Math.random() * 5,              // 0 to 5s delay
        duration: Math.random() * 4 + 6,        // 6s to 10s duration
        maxOpacity: Math.random() * 0.6 + 0.2,  // 0.2 to 0.8 peak opacity
      });
    }
    return temp;
  }, []);

  useEffect(() => {
    // 2. Subtle Cinematic Lightning Flashes
    const flashInterval = setInterval(() => {
      if (Math.random() > 0.75) { // 25% chance to flash every tick
        setLightningOpacity(Math.random() * 0.12 + 0.05);
        setTimeout(() => {
          setLightningOpacity(0);
        }, Math.random() * 150 + 50);
      }
    }, 1000);

    // 3. Smooth Energy Loading Bar Progression (7000ms duration)
    let currentProgress = 0;
    const totalDuration = 7000; // 7 seconds
    const intervalTime = 30;
    const increment = 100 / (totalDuration / intervalTime);

    const loadingInterval = setInterval(() => {
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(loadingInterval);
        clearInterval(flashInterval);
        
        // Trigger Massive Climax Flash
        setIsFlashed(true);
        
        // Transition fade out after flash hits peak
        setTimeout(() => {
          setIsHidden(true);
          
          // Complete load sequence
          setTimeout(() => {
            onComplete?.();
          }, 1500); // Wait for CSS opacity/visibility transitions to finish
        }, 300);
      }
      
      setProgress(Math.floor(currentProgress));
    }, intervalTime);

    return () => {
      clearInterval(loadingInterval);
      clearInterval(flashInterval);
    };
  }, [onComplete]);

  return (
    <div id="kalki-cinematic-preloader" className={isHidden ? 'hidden' : ''}>
      {/* Lightning Flash Overlay */}
      <div id="kalki-lightning" style={{ opacity: lightningOpacity }} />

      {/* Particles Container */}
      <div id="kalki-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="kalki-particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.posX}vw`,
              top: `${p.posY}vh`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--max-opacity': p.maxOpacity,
            }}
          />
        ))}
      </div>

      {/* Background Glow */}
      <div className="kalki-bg-glow" />

      <div className="kalki-loader-content">
        {/* Mystical Divine Chakra */}
        <div className="kalki-symbol-container">
          <div className="kalki-divine-chakra">
            <div className="kalki-chakra-ring" />
            <div className="kalki-chakra-inner" />
          </div>
        </div>

        {/* Titles */}
        <div className="kalki-title-container">
          <h1 className="kalki-title">E-SUMMIT</h1>
          <h2 className="kalki-subtitle">IGNITING THE ENTREPRENEURIAL SPIRIT</h2>
        </div>

        {/* Loading Bar */}
        <div className="kalki-loading-wrapper">
          <div className="kalki-loading-track">
            <div className="kalki-loading-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="kalki-loading-text">
            {progress.toString().padStart(2, '0')}%
          </div>
        </div>
      </div>

      {/* Blackout Flash for Transition */}
      <div id="kalki-white-flash" className={isFlashed ? 'flashed' : ''} />
    </div>
  );
}
