import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll on navigation only. Query-string changes (filter, sort,
 * pagination) must not yank the page back to the top, and the very first
 * render must not fight the browser's own scroll restoration.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: calm ? "auto" : "smooth" });
  }, [pathname]);

  return null;
}
