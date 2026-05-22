'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="t-mono">
      {prefix}{display}{suffix}
    </span>
  );
}
