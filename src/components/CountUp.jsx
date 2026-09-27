import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { formatRupiah } from "../data/products";

/**
 * Counts a rupiah total up from zero the first time it scrolls into view.
 *
 * Two details that are load-bearing rather than decorative:
 *
 * - The ticking frame is `aria-hidden` and the settled value sits in an
 *   `sr-only` sibling. Announcing the intermediate numbers instead would read
 *   out a stream of nonsense to a screen reader.
 * - The `prefers-reduced-motion` branch is checked in JS, not left to the
 *   global rule in index.css. That rule rewrites `transition-duration` and
 *   `animation-duration`; a rAF loop is driven by neither, so it would keep
 *   ticking to completion regardless.
 */
export default function CountUp({ value, duration = 900, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setShown(value);
      return;
    }
    if (!inView) return;

    let raf;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo: fast off the line, long settle. A linear count reads as a
      // loading spinner rather than as a total arriving.
      setShown(Math.round(value * (1 - 2 ** (-10 * t))));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setShown(value);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{formatRupiah(shown)}</span>
      <span className="sr-only">{formatRupiah(value)}</span>
    </span>
  );
}
