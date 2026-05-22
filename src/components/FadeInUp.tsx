"use client";

import React from "react";
import { motion } from "framer-motion";

type FadeInUpProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the element travels up. Default 28. */
  y?: number;
  /** Animation duration in seconds. Default 0.6. */
  duration?: number;
  /** Reveal once and never repeat. Default true. */
  once?: boolean;
  /** Viewport margin used for the IntersectionObserver. Default "-80px". */
  margin?: `${number}px` | `-${number}px`;
  /** Render as a different element. Default "div". */
  as?: "div" | "section" | "article" | "li" | "ul" | "header" | "footer";
  /**
   * When to fire the animation.
   * - "scroll" (default): triggers when the element scrolls into view.
   * - "mount": fires immediately on mount — use for above-the-fold heroes.
   */
  trigger?: "scroll" | "mount";
};

export function FadeInUp({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 0.6,
  once = true,
  margin = "-80px",
  as = "div",
  trigger = "scroll",
}: FadeInUpProps) {
  const Component = motion[as];
  const transition = { duration, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay };

  if (trigger === "mount") {
    return (
      <Component
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className={className}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={transition}
      className={className}
    >
      {children}
    </Component>
  );
}
