import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useGSAP(callback, dependencies = []) {
  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(callback);
    return () => ctx.revert();
  }, dependencies);
}
