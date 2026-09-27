/**
 * Palette is declared as raw channel triplets in `src/index.css` (`:root`) and
 * referenced here as `rgb(var(--c-x) / <alpha-value>)`.
 *
 * That keeps every opacity modifier (`bg-cream/85`, `text-ink/60`) working,
 * lets the raw CSS in `index.css` reference the exact same values, and means
 * the whole theme can be re-pointed from one place at runtime.
 *
 * Names are semantic on purpose — `ink` rather than `dark`, `accent` rather
 * than `primary` — so nothing in the markup can drift back to a hard-coded
 * brand colour or to a raw Tailwind palette entry.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      cream: "rgb(var(--c-cream) / <alpha-value>)",
      surface: "rgb(var(--c-surface) / <alpha-value>)",
      "surface-2": "rgb(var(--c-surface-2) / <alpha-value>)",
      ink: "rgb(var(--c-ink) / <alpha-value>)",
      "ink-muted": "rgb(var(--c-ink-muted) / <alpha-value>)",
      "ink-subtle": "rgb(var(--c-ink-subtle) / <alpha-value>)",
      "ink-faint": "rgb(var(--c-ink-faint) / <alpha-value>)",
      accent: "rgb(var(--c-accent) / <alpha-value>)",
      "accent-soft": "rgb(var(--c-accent-soft) / <alpha-value>)",
      "accent-light": "rgb(var(--c-accent-light) / <alpha-value>)",
      gold: "rgb(var(--c-gold) / <alpha-value>)",
      wa: "rgb(var(--c-wa) / <alpha-value>)",
      danger: "rgb(var(--c-danger) / <alpha-value>)",
      line: "rgb(var(--c-line) / <alpha-value>)",
      forest: "rgb(var(--c-forest) / <alpha-value>)",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"],
      },
      borderRadius: {
        chip: "6px",
        card: "10px",
      },
      boxShadow: {
        lift: "0 1px 2px rgba(26,26,24,0.04), 0 8px 24px -12px rgba(26,26,24,0.14)",
        "lift-sm": "0 1px 2px rgba(26,26,24,0.05)",
        nav: "0 1px 0 0 rgb(var(--c-line) / 1)",
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionDuration: {
        120: "120ms",
      },
    },
  },
  plugins: [],
};
