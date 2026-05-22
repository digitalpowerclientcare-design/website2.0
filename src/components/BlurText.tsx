'use client';

import { motion } from 'motion/react';

export default function BlurText({
  text,
  className = '',
  style,
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const words = text.split(' ');

  return (
    <h1 className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.06,
            duration: 0.55,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
