import { useEffect, useRef } from 'react';
import './FlashbackSection.css';

// Exact image list from original main.js
const IMAGE_FILES = [
  'img1_jpg.JPG', 'img2_jpg.JPG', 'img3_jpg.JPG', 'img4_jpg.JPG', 'img5_jpg.JPG',
  'img6_jpg.JPG', 'img7_jpg.JPG', 'img8_jpg.JPG', 'img9_jpg.JPG', 'img10_jpg.JPG',
  'img11_jpg.JPG', 'img12_jpg.JPG', 'img13_jpg.JPG', 'img14_jpg.JPG', 'img15_jpg.JPG',
  'img16_jpg.JPG', 'img17_webp.webp', 'img18_webp.webp', 'img19_webp.webp', 'img20_webp.webp',
  'img21_webp.webp', 'img22_webp.webp', 'img23_webp.webp', 'img24_webp.webp', 'img25_webp.webp',
  'img26_webp.webp', 'img27_webp.webp', 'img28_webp.webp', 'img29_webp.webp', 'img30_jpg.JPG',
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
