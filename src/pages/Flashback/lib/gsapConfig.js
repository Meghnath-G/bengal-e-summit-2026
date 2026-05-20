import { gsap } from 'gsap';

export const defaultEase = 'power3.out';
export const defaultDuration = 0.8;

export function fadeUpIn(element, delay = 0) {
  return gsap.fromTo(element,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: defaultDuration,
      ease: defaultEase,
      delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      }
    }
  );
}

export function slideInLeft(element) {
  return gsap.fromTo(element,
    { opacity: 0, x: -60 },
    {
      opacity: 1, x: 0,
      duration: defaultDuration,
      ease: defaultEase,
      scrollTrigger: { trigger: element, start: 'top 80%' }
    }
  );
}

export function slideInRight(element) {
  return gsap.fromTo(element,
    { opacity: 0, x: 60 },
    {
      opacity: 1, x: 0,
      duration: defaultDuration,
      ease: defaultEase,
      scrollTrigger: { trigger: element, start: 'top 80%' }
    }
  );
}

export { gsap };
