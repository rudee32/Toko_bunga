import { Component, Suspense, lazy, useEffect, useRef, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

function supportsWebGL2() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGL2RenderingContext && canvas.getContext("webgl2")
    );
  } catch {
    return false;
  }
}

/**
 * The WebGL hero is decoration, never load-bearing. Anything that can fail —
 * no WebGL2, a lost context, a driver crash, a lazy chunk that 404s — falls
 * back to the static SVG backdrop instead of taking the page down with it.
 */
class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.error("[Hero3D] scene failed, using static backdrop:", error);
    }
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

/** Drives HeroScene's frameloop so the scene stops rendering once off-screen. */
function useInView(ref, margin = "200px") {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return active;
}

export default function Hero3D() {
  const wrap = useRef(null);
  const active = useInView(wrap);
  const [allowed, setAllowed] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wide = window.matchMedia("(min-width: 769px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setAllowed(
        mq.matches && wide.matches && !calm.matches && supportsWebGL2()
      );
    };

    evaluate();
    mq.addEventListener("change", evaluate);
    wide.addEventListener("change", evaluate);
    calm.addEventListener("change", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      wide.removeEventListener("change", evaluate);
      calm.removeEventListener("change", evaluate);
    };
  }, []);

  // Captured on the wrapper so it catches the canvas regardless of when the
  // lazy chunk mounts it, and so a context loss is caught before it turns the
  // canvas into a permanent black box.
  useEffect(() => {
    if (!allowed) return;
    const onLost = (event) => {
      event.preventDefault();
      setContextLost(true);
    };
    wrap.current?.addEventListener("webglcontextlost", onLost, true);
    return () =>
      wrap.current?.removeEventListener("webglcontextlost", onLost, true);
  }, [allowed]);

  // The canvas stays mounted once created — recreating a WebGL context on
  // every scroll back in is far more expensive than leaving it idle.
  //
  // When the scene is not eligible this renders nothing at all. It used to drop
  // in an SVG sprig illustration, but at 360px the two visible sprigs landed
  // exactly on top of the headline (y 32-192 vs the h1 starting at y 160) and
  // the CTA row, competing with the text and the shop photo behind it. The
  // photo is a better backdrop on its own.
  if (!allowed || contextLost) return null;

  return (
    <div
      ref={wrap}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <SceneBoundary fallback={null}>
        <Suspense fallback={null}>
          <HeroScene active={active} />
        </Suspense>
      </SceneBoundary>
    </div>
  );
}
