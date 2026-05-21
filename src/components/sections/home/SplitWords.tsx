"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type SplitWordsProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  stagger?: number;
  delay?: number;
  once?: boolean;
};

export function SplitWords({
  text,
  className,
  as: Tag = "span",
  stagger = 0.06,
  delay = 0,
  once = true,
}: SplitWordsProps) {
  const words = text.split(" ");

  if (once) {
    return (
      <Tag className={cn(className)}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: delay + i * stagger,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={cn(className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              delay: i * stagger,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
