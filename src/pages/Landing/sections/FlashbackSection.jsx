import { useEffect, useRef } from 'react';
import './FlashbackSection.css';

// Exact image list from original main.js
const IMAGE_FILES = [
  'DSC_0128.JPG', 'IMG_0597.JPG', 'IMG_7162.JPG', 'IMG_9607.JPG', 'IMG_9610.JPG',
  'IMG_9645.JPG', '_A740023.JPG', '_A740046.JPG', '_DSC0205.JPG', '_DSC0248.JPG',
  '_DSC5041.JPG', '_DSC5052.JPG', '_DSC5068.JPG', '_DSC9446.JPG', '_DSC9462.JPG',
  '_DSC9468.JPG', '_DSC9485.JPG', '_DSC9500.JPG', '_DSC9536.JPG', '_DSC9598.JPG',
  '_DSC9624.JPG', '_MG_0802.JPG', '_MG_5474.JPG', '_MG_5486.JPG', '_MG_5810.JPG',
  '_MG_5847.JPG', '_MG_5857.JPG', '_MG_5872.JPG', '_ZVE7217.JPG', '_ZVE7522.JPG',
];

// Row slices — exact from original main.js
const ROWS = [
  { startIndex: 0, endIndex: 10, dir: 'left', className: 'row-1' },
  { startIndex: 10, endIndex: 20, dir: 'right', className: 'row-2' },
  { startIndex: 20, endIndex: 30, dir: 'left', className: 'row-3' },
];

export default function FlashbackSection() {
  const videoRef = useRef(null);
  const playBtnRef = useRef(null);

  // Hover pause/resume — exact from original main.js
  useEffect(() => {
    const rows = document.querySelectorAll('.carousel-row');
    const handlers = [];
    rows.forEach(row => {
      const enter = () => row.classList.add('is-paused');
      const leave = () => row.classList.remove('is-paused');
      const tstart = () => row.classList.add('is-paused');
      const tend = () => row.classList.remove('is-paused');
      row.addEventListener('mouseenter', enter);
      row.addEventListener('mouseleave', leave);
      row.addEventListener('touchstart', tstart, { passive: true });
      row.addEventListener('touchend', tend, { passive: true });
      row.addEventListener('touchcancel', tend, { passive: true });
      handlers.push({ row, enter, leave, tstart, tend });
    });
    return () => {
      handlers.forEach(({ row, enter, leave, tstart, tend }) => {
        row.removeEventListener('mouseenter', enter);
        row.removeEventListener('mouseleave', leave);
        row.removeEventListener('touchstart', tstart);
        row.removeEventListener('touchend', tend);
        row.removeEventListener('touchcancel', tend);
      });
    };
  }, []);

  // Video play/pause toggle — exact from original main.js
  const handlePlayPause = () => {
    const video = videoRef.current;
    const btn = playBtnRef.current;
    if (!video || !btn) return;
    if (video.paused) {
      video.play();
      btn.classList.add('paused');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none"/>
          <rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none"/>
        </svg>`;
    } else {
      video.pause();
      btn.classList.remove('paused');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 3l14 9-14 9V3z" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>`;
    }
  };

  return (
    <section className="flashback-section" id="flashback">

      {/* Section header */}
      <div className="section-header">
        <div className="eyebrow">Relive The Saga</div>
        <h2 className="giant-heading">
          FLASHBACK
          <span className="heading-glow"></span>
        </h2>
      </div>

      {/* 3-row infinite carousel */}
      <div className="carousel-container">
        <div className="carousel-mask">

          {ROWS.map((row) => {
            // Build card list — original: sliced + duplicated for seamless loop
            const files = IMAGE_FILES.slice(row.startIndex, row.endIndex);
            const allCards = [...files, ...files]; // duplicate for seamless CSS scroll

            return (
              <div key={row.className} className={`carousel-row ${row.className}`}>
                <div className="carousel-track">
                  {allCards.map((filename, idx) => (
                    <div key={idx} className="card">
                      <img
                        src={`/images/for_carousel/${filename}`}
                        alt={`Flashback ${idx + 1}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>

        {/* Floating video player — structure preserved, MP4 placeholder until file is supplied */}
        <div className="floating-video-container">
          <div className="video-wrapper">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              onClick={handlePlayPause}
            // src="/videos/for_carousel/video.mp4" — add when MP4 file is available
            >
              {/* MP4 source placeholder — file not yet available */}
              <source src="/videos/for_carousel/video.mp4" type="video/mp4" />
            </video>
            <button
              className="play-pause-btn"
              ref={playBtnRef}
              onClick={handlePlayPause}
              aria-label="Play/Pause"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 3l14 9-14 9V3z" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
