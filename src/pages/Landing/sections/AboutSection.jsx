import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const triggers = [];

    const aboutTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    });
    if (aboutTimeline.scrollTrigger) triggers.push(aboutTimeline.scrollTrigger);

    aboutTimeline
      .fromTo(tagRef.current,    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' })
      .fromTo(titleRef.current,  { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2,   ease: 'power2.out' }, '-=0.5')
      .fromTo(textRef.current,   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 2.5, ease: 'power2.out' }, '-=1')
      .fromTo(footerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 2,   ease: 'power2.out' }, '-=1.5')
      .to({}, { duration: 1 });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="about-section" id="about-section" ref={sectionRef}>
      {/* Darkness radial overlay — cinematic atmosphere layer */}
      <div className="moving-darkness"></div>

      {/* Sticky content — enters from darkness on scroll */}
      <div className="about-content">
        <div className="about-tag" ref={tagRef}>THE PROPHECY BEGINS</div>

        <h2 className="about-title" ref={titleRef}>BENGAL E-SUMMIT 2026</h2>

        <p className="about-text" ref={textRef}>
          The edition of Bengal E-Summit — One of the largest student business conclave from Eastern
          India — is poised to make history, igniting groundbreaking ideas and visionary solutions. This year, we
          invite those who dare to renovate the economy, to step into E-Summit, where ancient wisdom meets future
          disruption, and founders light the path forward.
        </p>

        <div className="about-footer" ref={footerRef}>
          <div className="thin-gold-line"></div>
          Institute of Engineering &amp; Management · Kolkata
        </div>
      </div>
    </section>
  );
}
