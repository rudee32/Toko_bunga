import { Star } from "lucide-react";

export default function StarRating({ rating = 5, size = 15 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? "fill-gold text-gold" : "text-dark/20"}
        />
      ))}
    </div>
  );
}
