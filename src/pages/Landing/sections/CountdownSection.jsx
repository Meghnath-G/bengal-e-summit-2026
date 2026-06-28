import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CountdownSection.css';

gsap.registerPlugin(ScrollTrigger);

// Target date — exact from original main.js
const TARGET_DATE = new Date('2026-08-29T10:00:00');

export default function CountdownSection() {
  const sectionRef = useRef(null);
  const tilesRef = useRef(null);
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);

  useEffect(() => {
    const tracks = {
      days: daysRef.current,
      hours: hoursRef.current,
      minutes: minutesRef.current,
      seconds: secondsRef.current,
    };

    // Exact buildTrack() from original main.js
    function buildTrack(trackEl, value) {
      if (!trackEl) return;
      const padded = String(value).padStart(2, '0');
      trackEl.innerHTML = '';
      const above = document.createElement('div');
      above.className = 'tile-digit';
      above.textContent = padded;
      const current = document.createElement('div');
      current.className = 'tile-digit';
      current.textContent = padded;
      const below = document.createElement('div');
      below.className = 'tile-digit';
      below.textContent = padded;
      trackEl.appendChild(above);
      trackEl.appendChild(current);
      trackEl.appendChild(below);
      const h = trackEl.parentElement?.offsetHeight || 110;
      trackEl.style.transform = `translateY(-${h}px) translateZ(0)`;
      trackEl.style.transition = 'none';
    }

    // Exact rollTo() from original main.js
    function rollTo(trackEl, newValue) {
      if (!trackEl) return;
      const padded = String(newValue).padStart(2, '0');
      const h = trackEl.parentElement?.offsetHeight || 110;
      const digits = trackEl.querySelectorAll('.tile-digit');
      if (digits[2]) digits[2].textContent = padded;
      trackEl.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
      trackEl.style.transform = `translateY(-${h * 2}px) translateZ(0)`;
      setTimeout(() => {
        if (digits[0]) digits[0].textContent = padded;
        if (digits[1]) digits[1].textContent = padded;
        if (digits[2]) digits[2].textContent = padded;
        trackEl.style.transition = 'none';
        trackEl.style.transform = `translateY(-${h}px) translateZ(0)`;
      }, 520);
    }

    // Exact initTracks() from original main.js
    function initTracks() {
      const now = new Date();
      const diff = TARGET_DATE - now;
      if (diff <= 0) {
        Object.values(tracks).forEach(t => buildTrack(t, 0));
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      buildTrack(tracks.days, d);
      buildTrack(tracks.hours, h);
      buildTrack(tracks.minutes, m);
      buildTrack(tracks.seconds, s);
      return { days: d, hours: h, minutes: m, seconds: s };
    }

    // Exact updateCountdown() from original main.js
    let prevValues = initTracks() || { days: -1, hours: -1, minutes: -1, seconds: -1 };

    function updateCountdown() {
      const now = new Date();
      const diff = TARGET_DATE - now;
      if (diff <= 0) {
        Object.entries(tracks).forEach(([unit, track]) => {
          if (prevValues[unit] !== 0) { rollTo(track, 0); prevValues[unit] = 0; }
        });
        return;
      }
      const values = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
      Object.keys(values).forEach(unit => {
        if (values[unit] !== prevValues[unit]) {
          rollTo(tracks[unit], values[unit]);
          prevValues[unit] = values[unit];
        }
      });
    }

    const intervalId = setInterval(updateCountdown, 1000);

    const triggers = [];

    // Exact GSAP entrance animations from original main.js — fixed React StrictMode double-mount freeze
    const anim1 = gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
    if (anim1.scrollTrigger) triggers.push(anim1.scrollTrigger);

    if (tilesRef.current) {
      const anim2 = gsap.fromTo(tilesRef.current.querySelectorAll('.countdown-tile'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: tilesRef.current,
            start: 'top 85%',
          },
        }
      );
      if (anim2.scrollTrigger) triggers.push(anim2.scrollTrigger);
    }

    // Removed redundant document height safety trigger refresh
    // ScrollTrigger.refresh();

    return () => {
      clearInterval(intervalId);
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="countdown-section" ref={sectionRef}>
      <div className="countdown-eyebrow">UNFOLDS IN</div>

      <div className="countdown-tiles" ref={tilesRef}>
        {/* DAYS */}
        <div className="countdown-tile">
          <div className="tile-track-wrapper">
            <div className="tile-track" ref={daysRef}></div>
          </div>
          <div className="tile-label">DAYS</div>
        </div>

        {/* HOURS */}
        <div className="countdown-tile">
          <div className="tile-track-wrapper">
            <div className="tile-track" ref={hoursRef}></div>
          </div>
          <div className="tile-label">HOURS</div>
        </div>

        {/* MINUTES */}
        <div className="countdown-tile">
          <div className="tile-track-wrapper">
            <div className="tile-track" ref={minutesRef}></div>
          </div>
          <div className="tile-label">MINUTES</div>
        </div>

        {/* SECONDS */}
        <div className="countdown-tile">
          <div className="tile-track-wrapper">
            <div className="tile-track" ref={secondsRef}></div>
          </div>
          <div className="tile-label">SECONDS</div>
        </div>
      </div>

      <div className="countdown-date">AUGUST 2026 · IEM KOLKATA · WEST BENGAL</div>
    </section>
  );
}
