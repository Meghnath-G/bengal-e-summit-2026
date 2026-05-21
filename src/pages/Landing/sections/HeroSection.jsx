import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

// Frame sequence config — exactly matching original main.js
const FRAME_COUNT = 181;
const FRAME_PREFIX = '/video_project/web_frame_loading-page';
const FRAME_EXT = '.jpg';

function padFrame(n) {
  return n.toString().padStart(5, '0');
}

export default function HeroSection() {
  const canvasRef = useRef(null);
  const sequenceRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: false });

    const images = [];
    const frames = { currentIndex: 0 };

    // Resize — exact logic from original resizeCanvas()
    function resizeCanvas() {
      const dpr = Math.max(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      render();
    }
    window.addEventListener('resize', resizeCanvas);

    const isMobileDevice = window.innerWidth <= 768;
    const skipFactor = isMobileDevice ? 2 : 1;

    // Render — exact object-fit:cover logic from original
    function render() {
      let rawIndex = Math.round(frames.currentIndex);
      let frameNum = rawIndex + 1; // 1-based

      // Snap to closest loaded frame if skipping
      if (skipFactor > 1 && frameNum % skipFactor === 0) {
        frameNum -= 1;
      }
      if (frameNum > FRAME_COUNT) frameNum = FRAME_COUNT;
      if (skipFactor > 1 && frameNum === FRAME_COUNT && frameNum % skipFactor === 0) {
        frameNum -= 1; // make sure the last frame snapped to an actually loaded one if needed
      }

      const img = images[frameNum];
      if (!img || !img.complete) return;
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;
      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    const triggers = [];

    // Init GSAP ScrollTrigger animations — exact from original initScrollAnimations()
    function initScrollAnimations() {
      const sequenceContainer = sequenceRef.current;

      // 1. Frame sequence scrub
      const anim1 = gsap.to(frames, {
        currentIndex: FRAME_COUNT - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sequenceContainer,
          start: 'top top',
          end: () => '+=' + window.innerHeight * 4,
          scrub: 1.2,
        },
        onUpdate: render,
      });
      if (anim1.scrollTrigger) triggers.push(anim1.scrollTrigger);

      // 2. Hero fade out
      const anim2 = gsap.to('.hero-section', {
        opacity: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sequenceContainer,
          start: () => '+=' + window.innerHeight * 0.1,
          end: () => '+=' + window.innerHeight * 0.75,
          scrub: 1,
        },
      });
      if (anim2.scrollTrigger) triggers.push(anim2.scrollTrigger);

      // 3. Plot section fade in / out
      const plotTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sequenceContainer,
          start: () => '+=' + window.innerHeight * 1.0,
          end: () => '+=' + window.innerHeight * 3.25,
          scrub: 1.5,
        },
      });
      if (plotTimeline.scrollTrigger) triggers.push(plotTimeline.scrollTrigger);
      plotTimeline
        .to('.plot-section', { opacity: 1, duration: 1.5, ease: 'power2.out' })
        .to('.continue-text', { opacity: 0.5, duration: 1.5, ease: 'power2.out' }, '<')
        .to('.plot-section, .continue-text', { opacity: 0, duration: 1.5, ease: 'power2.in' }, '+=2');

      // 4. Blackout overlay
      const anim3 = gsap.to('.blackout-overlay', {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sequenceContainer,
          start: () => '+=' + window.innerHeight * 3.8,
          end: () => '+=' + window.innerHeight * 4.2,
          scrub: true,
        },
      });
      if (anim3.scrollTrigger) triggers.push(anim3.scrollTrigger);

      // 5. Climax section
      const climaxTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sequenceContainer,
          start: () => '+=' + window.innerHeight * 4.6,
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });
      if (climaxTimeline.scrollTrigger) triggers.push(climaxTimeline.scrollTrigger);
      climaxTimeline
        .to('.climax-section', { opacity: 1, duration: 0.1, ease: 'none' })
        .fromTo('.climax-intro.line-1',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 2, ease: 'power1.inOut' })
        .to({}, { duration: 3 })
        .fromTo('.climax-intro.line-2',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 2, ease: 'power1.inOut' })
        .to({}, { duration: 5 })
        .fromTo('.climax-reveal',
          { opacity: 0, scale: 0.92, y: 30, filter: 'blur(8px)' },
          { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 5, ease: 'power2.out' })
        .to({}, { duration: 2 })
        .to('.climax-section', { opacity: 0, duration: 2, ease: 'power2.inOut' });

      gsap.set('.climax-reveal', { scale: 0.85 });
    }

    // Preload — optimized for mobile
    let loadedCount = 0;
    const totalFramesToLoad = Math.floor((FRAME_COUNT - 1) / skipFactor) + 1;

    for (let i = 1; i <= FRAME_COUNT; i += skipFactor) {
      const img = new Image();
      img.src = `${FRAME_PREFIX}${padFrame(i)}${FRAME_EXT}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) resizeCanvas();
        if (loadedCount === totalFramesToLoad) {
          initScrollAnimations();
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        }
      };
      images[i] = img;
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* ── Main Scroll Sequence Container (850vh) ── */}
      <div className="scroll-sequence-container" id="scroll-sequence" ref={sequenceRef}>

        {/* Canvas sticky wrapper */}
        <div className="canvas-wrapper">
          <canvas id="sequence-canvas" ref={canvasRef}></canvas>
          <div className="blackout-overlay" id="blackout-overlay"></div>
        </div>

        {/* Section 1: Hero */}
        <section className="hero-section" id="hero-section">
          <div className="hero-readability-gradient"></div>
          <div className="hero-content">

            <div className="hero-brand-logos">
              <img src="/images/logos/iem.webp" alt="IEM" className="hero-logo-img iem-logo" />
              <div className="hero-brand-title-group">
                <span className="hero-brand-title-main">
                  INSTITUTE OF ENGINEERING AND MANAGEMENT
                </span>

                <span className="hero-brand-title-sub">
                  SCHOOL OF UNIVERSITY OF ENGINEERING AND MANAGEMENT
                </span>
              </div>
              <img src="/images/logos/uem.webp" alt="UEM" className="hero-logo-img" />
            </div>

            <div className="hero-presents">
              PRESENTS
            </div>

            <div className="hero-summit-symbol">
              <img src="/images/logos/summit logo.png" alt="Summit Logo" className="hero-summit-logo" />
            </div>

            <h1 className="hero-title">
              <span className="cinematic-text line-1">BENGAL</span>
              <span className="cinematic-text line-2">E-SUMMIT</span>
              <span className="line-3">
                <span className="decorative-line"></span>
                <span className="cinematic-text year-text">2026</span>
                <span className="decorative-line"></span>
              </span>
              <span className="cinematic-text hero-event-date">25th &amp; 26th of July</span>
            </h1>

            <div className="hero-actions">
              <a href="#register" className="btn-solid">⚡ REGISTER NOW</a>
              <Link to="/events" className="btn-outline-gold">EXPLORE EVENTS</Link>
            </div>

            <div className="hero-venue">
              Venue: Institute of Engineering and Management,
              Gurukul Building, Kolkata
            </div>
          </div>

          <div className="scroll-indicator">
            <span>SCROLL TO ENTER THE DYNAMICS</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* Section 2: Pre-Blackout Plot */}
        <section className="plot-section" id="plot-section">
          <div className="plot-content">
            <div className="plot-tag">THE PROBLEM</div>
            <div className="plot-divider"></div>
            <p className="plot-text">
              2898 AD. The world has technology.
              What it lacks is vision.
            </p>
          </div>
          <div className="continue-text">CONTINUE THE JOURNEY</div>
        </section>

        {/* Section 3: Climax */}
        <section className="climax-section" id="climax-section">
          <div className="climax-content">
            <p className="climax-intro line-1">And when civilizations lose their way,</p>
            <p className="climax-intro line-2">they are rebuilt by--</p>
            <h2 className="climax-reveal">AN ENTREPRENEUR</h2>
            <div className="climax-footer">BENGAL E-SUMMIT 2026 · IEM KOLKATA</div>
          </div>
        </section>

      </div>{/* end scroll-sequence-container */}

      {/* About section is now rendered by <AboutSection /> in Landing.jsx */}
    </>
  );
}
