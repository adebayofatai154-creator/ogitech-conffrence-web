"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Subtle fade/slide-in. Progressive enhancement: content renders visible on the
 * server (works without JS); only blocks that start below the fold are hidden
 * after hydration and revealed as they scroll into view. Respects reduced motion.
 */
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setHidden(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`s-reveal ${hidden ? "is-hidden" : ""} ${className}`}>
      {children}
    </div>
  );
}
