import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      gsap.to(dot.current,  { x, y, duration: 0.1, ease: 'power3.out' });
      gsap.to(ring.current, { x, y, duration: 0.35, ease: 'power3.out' });
    };

    const expand = () => gsap.to(ring.current, { scale: 2, opacity: 0.5, duration: 0.3 });
    const shrink = () => gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3 });

    window.addEventListener('mousemove', moveCursor);
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', expand);
      el.addEventListener('mouseleave', shrink);
    });

    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
