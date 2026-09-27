import { motion, useReducedMotion } from "framer-motion";

/**
 * Route change feedback. Deliberately short and opacity-only: a full-height
 * slide on every navigation makes the site feel slower than it is, and the
 * exit half of a 0.4s in/out pair left a blank page between routes.
 *
 * This is now the single place the app fades. Every section inside a page
 * animates transform only, so a route change used to fade the page *and* each
 * of its ~15 sections, which read as mush rather than polish. Transform-only
 * also means `reducedMotion="user"` (set once at the app root in main.jsx)
 * silences the inner reveals for free — they become no-ops — leaving this one
 * fade as the sole thing to suppress here.
 */
export default function PageTransition({ children }) {
  const calm = useReducedMotion();

  if (calm) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
