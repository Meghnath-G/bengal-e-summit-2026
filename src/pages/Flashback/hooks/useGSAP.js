import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useGSAP(callback, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ref);
    }, ref);
    return () => ctx.revert();
  }, deps);

  return ref;
}
