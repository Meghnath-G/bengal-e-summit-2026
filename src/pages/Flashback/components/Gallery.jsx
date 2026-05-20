import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/Gallery.css';

import img1 from '../../../assets/flashback/IMG_1.webp';
import img2 from '../../../assets/flashback/IMG_2.webp';
import img3 from '../../../assets/flashback/IMG_3.webp';
import img4 from '../../../assets/flashback/IMG_4.webp';
import img5 from '../../../assets/flashback/IMG_5.webp';

const slides = [
  { src: img1, alt: 'Era 2021' },
  { src: img2, alt: 'Era 2022' },
  { src: img3, alt: 'Era 2023' },
  { src: img4, alt: 'Era 2024' },
  { src: img5, alt: 'Era 2025' }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxActive, setLightboxActive] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Section Header Fade Up Animation
  useEffect(() => {
    const headers = gsap.utils.toArray('#gallery .section-header');
    headers.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' }
        }
      );
    });
  }, []);

  // Auto-sliding logic
  useEffect(() => {
    if (lightboxActive) return; // Stop auto-sliding when modal is open

    const timer = setInterval(handleNext, 4000);
    return () => clearInterval(timer);
  }, [lightboxActive]);

  // Safe body scroll lock & cleanup
  useEffect(() => {
    if (lightboxActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxActive]);

  return (
    <>
      <section id="gallery" className="section-gallery">
        <div className="section-header">
          <h2 className="section-heading">THE ERA GALLERY</h2>
          <div className="section-rule"></div>
        </div>

        <div className="slider-wrapper">
          <div 
            className="slider-container" 
            id="slider-container"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div 
                key={index} 
                className="slider-slide"
                onClick={() => {
                  setLightboxImg(slide.src);
                  setLightboxActive(true);
                }}
              >
                <img src={slide.src} alt={slide.alt} />
              </div>
            ))}
          </div>
          <button className="slider-btn slider-prev" id="slider-prev" onClick={handlePrev}>&#10094;</button>
          <button className="slider-btn slider-next" id="slider-next" onClick={handleNext}>&#10095;</button>
        </div>
      </section>

      {/* Lightbox Modal */}
      <div 
        className={`lightbox-modal ${lightboxActive ? 'active' : ''}`} 
        id="lightbox-modal"
        onClick={(e) => {
          if (e.target.id === 'lightbox-modal') {
            setLightboxActive(false);
          }
        }}
      >
        <button 
          className="lightbox-close" 
          id="lightbox-close"
          onClick={() => setLightboxActive(false)}
        >
          &times;
        </button>
        <img 
          src={lightboxImg} 
          alt="Expanded View" 
          className="lightbox-content" 
          id="lightbox-img" 
        />
      </div>
    </>
  );
}
