import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '../hooks/useGSAP';
import { useCountUp } from '../hooks/useCountUp';
import '../styles/ByTheNumbers.css';

export default function ByTheNumbers() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.number-tile',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section className="section-numbers" ref={container}>
      <div className="numbers-grid">
        <NumberTile target={5} label="YEARS OF LEGACY" />
        <NumberTile target={30000} prefix="" suffix="+" label="ATTENDEES" />
        <NumberTile target={15} prefix="₹" suffix="L+" label="IN PRIZES" />
        <NumberTile target={50} prefix="" suffix="+" label="SPEAKERS" />
      </div>
    </section>
  );
}

function NumberTile({ target, prefix = '', suffix = '', label }) {
  const { count, ref } = useCountUp(target, 2000);

  // Format number if it's over 1000
  const displayCount = target >= 1000 ? count.toLocaleString() : count;

  return (
    <div className="number-tile" ref={ref}>
      <div className="tile-stat">{prefix}{displayCount}{suffix}</div>
      <div className="tile-label">{label}</div>
    </div>
  );
}
