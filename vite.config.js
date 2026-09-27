import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Only the long-lived app dependencies are split by hand. Everything else —
 * crucially `three` and `@react-three/*` — is left to Rollup's default
 * chunking, which correctly keeps a dynamic-import-only dependency graph in
 * its own chunk.
 *
 * Do not add `three`/`@react-three/*` to this function. Forcing them into a
 * named chunk makes Rollup hoist shared React internals (react-reconciler,
 * react-dom reconciler code) into that same chunk; the entry and Home then
 * take a static edge back to it and the whole scene lands on the critical
 * path, defeating the runtime gate in src/three/Hero3D.jsx. Measured cost of
 * getting this wrong: ~220 KB gzip of three.js downloaded by every mobile
 * visitor, for a scene they can never see.
 *
 * Verify after touching this file:
 *
 *   npm run build
 *   grep -l 'from"./HeroScene' dist/assets/*.js   # must match nothing
 *   grep -c WebGLRenderer dist/assets/index-*.js  # must be 0
 */
function chunkFor(id) {
  if (!id.includes("node_modules")) return undefined;
  if (/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id))
    return "motion";
  if (/node_modules\/(react|react-dom|react-reconciler|react-router|react-router-dom|scheduler|zustand|use-sync-external-store)\//.test(id))
    return "vendor";
  return undefined;
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    // The only chunk over the default 500 kB limit is the opt-in WebGL scene,
    // which is off the critical path. Raising it here keeps the build output
    // honest rather than silencing a real regression in the app chunks.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: chunkFor,
      },
    },
  },
});
