import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '../hooks/useGSAP';
import './EventCard.css';

export default function EventCard({ event }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  useGSAP(() => {
    // Card slides in
    const isLeft = event.side === 'left';
    const xOffset = isLeft ? -50 : 50;

    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 75%",
      },
      x: xOffset,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2
    });

    // Animate the timeline node on card reveal
    const row = cardRef.current.closest('.timeline-row');
    if (row) {
      const node = row.querySelector('.timeline-node');
      if (node) {
        gsap.from(node, {
          scrollTrigger: {
            trigger: row,
            start: "top 75%",
          },
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)"
        });
      }
    }
  }, [event.side]);

  return (
    <div
      className={`event-card ${event.side} ${isFlipped ? 'is-flipped' : ''}`}
      id={`event-${event.name.toLowerCase().replace(/\s+/g, '-')}`}
      ref={cardRef}
    >
      <div className="card-inner">
        <div className="card-front" onClick={() => setIsFlipped(true)}>
          <span className="card-watermark">{event.id}</span>
          <h2 className="card-title">{event.name}</h2>
          <p className="card-desc">{event.description}</p>
          <img
            src={new URL(`../assets/webp/${event.mascot}`, import.meta.url).href}
            alt={`${event.name} Mascot`}
            className="card-mascot"
          />
          <div className="card-footer" onClick={(e) => e.stopPropagation()}>
            {event.hasRegister && (
              <a href="https://forms.gle/CVJszvgztG12A59Y7" className="card-register-btn">REGISTER</a>
            )}
            {event.hasLearnMore && (
              <button className="card-learn-more-btn" onClick={() => setIsFlipped(true)}>LEARN MORE</button>
            )}
          </div>
        </div>
        <div className="card-back" onClick={() => setIsFlipped(false)}>
          <h3 className="card-back-title">{event.name}</h3>
          <p className="card-back-desc">{event.backDescription}</p>
        </div>
      </div>
    </div>
  );
}
