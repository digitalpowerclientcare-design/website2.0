'use client';

import { useEffect, useRef } from 'react';

type Splash = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  life: number;
};

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splashesRef = useRef<Splash[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      splashesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 8 + Math.random() * 12,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        life: 1,
      });
      if (splashesRef.current.length > 40) {
        splashesRef.current.shift();
      }
    };

    window.addEventListener('mousemove', onMove);

    let frame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      splashesRef.current = splashesRef.current.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.r += 0.35;
        s.life -= 0.018;
        if (s.life <= 0) return false;

        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        g.addColorStop(0, `rgba(80, 70, 229, ${0.14 * s.life})`);
        g.addColorStop(0.5, `rgba(129, 140, 248, ${0.08 * s.life})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="splash-cursor"
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
      }}
    />
  );
}
