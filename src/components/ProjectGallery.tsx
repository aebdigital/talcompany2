"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FadeInUp } from "@/components/FadeInUp";

type Props = {
  title: string;
  images: string[];
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.98 }),
};

export function ProjectGallery({ title, images }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const open = useCallback((idx: number) => {
    setDirection(0);
    setActive(idx);
  }, []);

  const close = useCallback(() => setActive(null), []);

  const next = useCallback(() => {
    setDirection(1);
    setActive((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  // Keyboard navigation + body scroll lock when open
  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((src, idx) => (
          <FadeInUp key={src} delay={Math.min((idx % 6) * 0.05, 0.3)} y={20}>
            <button
              type="button"
              onClick={() => open(idx)}
              aria-label={`Otvoriť fotografiu ${idx + 1} z ${images.length}`}
              className="group relative aspect-[4/3] w-full overflow-hidden bg-brand-light-gray border border-gray-100 cursor-zoom-in"
            >
              <Image
                src={src}
                alt={`${title} – fotografia ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                loading={idx < 3 ? "eager" : "lazy"}
                priority={idx === 0}
              />
              <span className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/15 transition-colors duration-300" />
            </button>
          </FadeInUp>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} – fotografia ${active + 1} z ${images.length}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            onClick={close}
          >
            {/* Counter */}
            <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 text-xs md:text-sm font-semibold text-white/70 uppercase tracking-widest">
              {active + 1} / {images.length}
            </div>

            {/* Close */}
            <button
              type="button"
              aria-label="Zavrieť"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-4 right-4 grid h-11 w-11 place-items-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                type="button"
                aria-label="Predchádzajúca fotografia"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-3 md:left-6 grid h-12 w-12 place-items-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
            )}

            {/* Image with sliding swap */}
            <div
              className="relative h-[80vh] w-[90vw] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence custom={direction} mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 380, damping: 36 },
                    opacity: { duration: 0.18 },
                    scale: { duration: 0.22, ease: "easeOut" },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[active]}
                    alt={`${title} – fotografia ${active + 1}`}
                    fill
                    sizes="90vw"
                    className="object-contain select-none"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next */}
            {images.length > 1 && (
              <button
                type="button"
                aria-label="Ďalšia fotografia"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-3 md:right-6 grid h-12 w-12 place-items-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
