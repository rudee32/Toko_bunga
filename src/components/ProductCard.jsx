import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useCartStore, useWishlistStore } from "../store/cartStore";
import { formatRupiah } from "../data/products";
import StarRating from "./StarRating";

export default function ProductCard({ product, index = 0 }) {
  const ref = useRef(null);
  const add = useCartStore((s) => s.add);
  const openCart = useCartStore((s) => s.open);
  const wishlistIds = useWishlistStore((s) => s.ids);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWish = wishlistIds.includes(product.id);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative glass rounded-3xl overflow-hidden transition-colors hover:border-primary/40"
      >
        {product.badge && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-semibold bg-primary text-dark rounded-full">
            {product.badge}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full glass text-dark/80 hover:text-red-400 transition-all"
          aria-label="Favorit"
        >
          <Heart
            className={`w-4 h-4 ${isWish ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>

        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div
            className="absolute bottom-4 inset-x-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all"
            style={{ transform: "translateZ(40px)" }}
          >
            <button
              onClick={() => {
                add(product);
                openCart();
              }}
              className="rounded-full bg-primary text-dark p-3 hover:bg-primary-light transition-colors"
              aria-label="Tambah ke keranjang"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <Link
              to={`/menu/${product.id}`}
              className="rounded-full bg-cream text-dark p-3 hover:bg-primary transition-colors"
              aria-label="Lihat detail"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-dark/40">{product.code}</span>
          </div>
          <h3 className="font-semibold text-lg leading-snug">{product.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-primary font-semibold">
              {formatRupiah(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-dark/40 line-through">
                {formatRupiah(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
