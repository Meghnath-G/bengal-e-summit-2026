import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Wrapper Component
 * Emulates the scrollreveal.js behaviour natively and cleanly in React
 * by automatically adding the 'revealed' class once the element enters viewport.
 */
export default function ScrollReveal({ children, className = '', baseClass = 'scroll-reveal', threshold = 0.15 }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          // Once revealed, we can disconnect the observer
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Triggers slightly before crossing completely
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${baseClass} ${className} ${revealed ? 'revealed' : ''}`}
    >
      {children}
    </div>
  );
}
