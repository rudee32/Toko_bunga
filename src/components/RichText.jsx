import { Fragment } from "react";

/**
 * Renders the small subset of markdown the product copy actually uses:
 * **bold**, *italic*, and blank-line paragraph breaks.
 *
 * Written as a parser rather than pulling in a markdown dependency — the input
 * is trusted first-party catalogue data, and dangerouslySetInnerHTML is not
 * involved anywhere, so the output is always a React element tree.
 */
const INLINE = /(\*\*[^*]+\*\*|\*[^*\n]+\*)/g;

function renderInline(text, keyPrefix) {
  return text.split(INLINE).map((chunk, i) => {
    if (!chunk) return null;
    const key = `${keyPrefix}-${i}`;
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return <strong key={key}>{chunk.slice(2, -2)}</strong>;
    }
    if (chunk.startsWith("*") && chunk.endsWith("*")) {
      return <em key={key}>{chunk.slice(1, -1)}</em>;
    }
    return <Fragment key={key}>{chunk}</Fragment>;
  });
}

export default function RichText({ text, className = "" }) {
  if (!text) return null;
  const paragraphs = String(text)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((para, p) => (
        <p key={p} className={p > 0 ? "mt-3" : undefined}>
          {renderInline(para, `p${p}`)}
        </p>
      ))}
    </div>
  );
}
