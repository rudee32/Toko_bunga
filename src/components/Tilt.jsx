import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Scroll-linked 3D for a block of content.
 *
 * The transform is driven by the block's own position between "its start meets
 * the viewport end" and "its end meets the viewport start", so the tilt
 * follows the scrollbar continuously in both directions instead of firing once
 * like a reveal. A spring sits between the raw progress and the transform: that
 * lag is what stops the motion reading as rigid, because content keeps easing
 * into place after the scroll has already stopped.
 *
 * Two deliberate constraints:
 *
 * - The section's own padding lives on the outer wrapper and only the content
 *   moves. The layout box is therefore identical to an untilted section, so
 *   wrapping in Tilt cannot introduce layout shift.
 * - `perspective` on the wrapper means the wrapper's own background is still
 *   painted flat. Sections that carry a full-bleed background colour must not
 *   be wrapped, or the background stays level while its content tilts and the
 *   edge of the band shows. Every tinted surface in this app (search button,
 *   filter chips) is a child, so it tilts along with the rest.
 *
 * Not used on the hero: that section is `min-h-dvh` with `overflow-hidden`
 * around four absolutely positioned layers, and a foreshortened rotateX would
 * open a gap along its top and bottom edges. Nor on the product page, whose
 * right column is `position: sticky` and would jitter under a continuous y.
 *
 * No `will-change` here on purpose — it would promote a page-sized layer per
 * block and cost more memory than the repaints it saves.
 */
export default function Tilt({
  children,
  className = "",
  angle = 3,
  shift = 16,
  perspective = 1100,
}) {
  const ref = useRef(null);
  const calm = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
  });

  // +angle while the block is still below the fold, easing through flat as it
  // crosses the middle, to -angle as it leaves the top.
  const rotateX = useTransform(smooth, [0, 1], [angle, -angle]);
  const y = useTransform(smooth, [0, 1], [shift, -shift]);

  if (calm) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className} style={{ perspective }}>
      <motion.div style={{ rotateX, y, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}
