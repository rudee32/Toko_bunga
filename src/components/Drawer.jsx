import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Side drawer shared by the cart, the wishlist and the mobile nav.
 *
 * Rendered through a portal on purpose: it inherits no transform, and the
 * framer-motion <motion.header> it used to live inside sets `transform`, which
 * silently turns the header into the containing block for `position: fixed`
 * and shrinks a `fixed inset-0` overlay down to the header's own box.
 */
export default function Drawer({
  open,
  onClose,
  title,
  count,
  icon: Icon,
  children,
  footer,
  side = "right",
  labelId = "drawer-title",
}) {
  const panel = useRef(null);
  const restoreTo = useRef(null);

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const items = panel.current.querySelectorAll(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement;
    panel.current?.focus();
    return () => {
      if (restoreTo.current instanceof HTMLElement) {
        restoreTo.current.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = "";
    };
  }, [open]);

  // createPortal needs a DOM at render time, and this component is mounted
  // permanently (not only while open) so that AnimatePresence can play the
  // exit animation. Bail out rather than throw where there is no document.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[70]"
          onKeyDown={onKeyDown}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40"
          />
          <motion.aside
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
            className={`absolute top-0 bottom-0 flex w-full max-w-[26rem] flex-col bg-cream shadow-2xl outline-none ${
              side === "right" ? "right-0 border-l" : "left-0 border-r"
            } border-line`}
          >
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-line px-5 py-4">
              <h2
                id={labelId}
                className="flex min-w-0 items-center gap-2 font-serif text-xl font-semibold text-ink"
              >
                {Icon ? <Icon className="h-5 w-5 shrink-0 text-accent" /> : null}
                <span className="truncate">{title}</span>
                {count != null && (
                  <span className="shrink-0 text-sm font-normal text-ink-muted">
                    ({count})
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup"
                className="-mr-2 shrink-0 rounded-chip p-2.5 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              {children}
            </div>

            {footer ? (
              <div className="shrink-0 border-t border-line bg-surface px-5 py-4 pb-safe">
                {footer}
              </div>
            ) : (
              <div className="h-0 shrink-0" aria-hidden="true" />
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
