import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle, light }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <span className="inline-block text-sm uppercase tracking-[0.3em] text-primary mb-3">
        Sekar Floristt
      </span>
      <h2 className="section-title font-serif italic text-dark">
        {title}
      </h2>
      {subtitle && (
        <p className="section-sub mt-4">{subtitle}</p>
      )}
      <div className="mt-5 flex items-center justify-center gap-2">
        <div className="w-16 h-px bg-primary/60" />
        <div className="w-2 h-2 rotate-45 bg-primary" />
        <div className="w-16 h-px bg-primary/60" />
      </div>
    </motion.div>
  );
}
