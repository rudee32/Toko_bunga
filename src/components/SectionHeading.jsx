import { motion } from "framer-motion";

/**
 * Section heading. One rule, used everywhere: title, optional supporting line,
 * nothing else. The old eyebrow + hairline-diamond divider repeated on every
 * section read as filler and was removed rather than restyled.
 */
export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}) {
  const centred = align === "center";

  return (
    <motion.div
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className={`mb-10 md:mb-14 ${centred ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      <h2 className="section-title text-balance">{title}</h2>
      {subtitle && (
        <p
          className={`mt-4 leading-relaxed ${
            centred ? "mx-auto" : ""
          } section-sub`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
