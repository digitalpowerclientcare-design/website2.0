'use client';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  style,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  style?: React.CSSProperties;
  /** @deprecated Use className="btn-primary" | "btn-ghost" */
  variant?: 'indigo' | 'white';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const resolvedClass =
    className ||
    (variant === 'white' ? 'btn-white' : variant === 'indigo' ? 'btn-primary' : '');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * 0.3,
      y: (e.clientY - cy) * 0.3,
    });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={resolvedClass}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) return <a href={href} style={{ textDecoration: 'none' }}>{content}</a>;
  return content;
}
