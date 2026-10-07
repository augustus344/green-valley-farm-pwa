import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Props {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
  delay?: number;
}

export function CountUp({ end, duration = 1000, suffix = '', className = '', delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? end : 0);

  useEffect(() => {
    if (reduce) {
      setValue(end);
      return;
    }
    let raf = 0;
    const timer = window.setTimeout(() => {
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(end * eased));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay * 1000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [end, duration, delay, reduce]);

  return (
    <span className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
