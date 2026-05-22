'use client';
import { useEffect, useRef } from 'react';

export function CanvasGradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      [240, 235, 255],
      [224, 231, 255],
      [240, 249, 255],
      [255, 255, 255],
      [235, 240, 255],
    ];

    const points = Array.from({ length: 5 }, (_, i) => ({
      x: 0.2 + i * 0.15,
      y: 0.2 + i * 0.12,
      vx: (Math.random() - 0.5) * 0.0008,
      vy: (Math.random() - 0.5) * 0.0008,
      color: colors[i],
    }));

    const render = () => {
      t += 0.003;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      points.forEach((p, i) => {
        p.x += p.vx + Math.sin(t + i * 1.3) * 0.0004;
        p.y += p.vy + Math.cos(t + i * 0.9) * 0.0003;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;

        const grd = ctx.createRadialGradient(
          p.x * w, p.y * h, 0,
          p.x * w, p.y * h, w * 0.55,
        );
        grd.addColorStop(0, `rgba(${p.color.join(',')},0.65)`);
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      });

      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
