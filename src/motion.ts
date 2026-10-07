import type { Transition, Variants } from 'framer-motion';

export const spring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
};

export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 28,
};

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 22,
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const riseItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: spring,
  },
};

export const tapScale = { scale: 0.96 };

export const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
