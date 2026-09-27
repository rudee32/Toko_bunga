import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useCartStore, useWishlistStore } from "../store/cartStore";
import { formatRupiah } from "../data/products";

/**
 * The card is a plain flex column, not a composition of absolute overlays.
 * An earlier version floated the actions at a hardcoded `bottom-[4.5rem]`,
 * which collided with the price line whenever a product name wrapped to two
 * rows — the text block is 115-140px tall, the offset was 72px. Actions now
 * sit in normal flow, so nothing can overlap at any width, and `h-full` plus
 * `mt-auto` keeps the price and actions flush with the bottom of every card in
 * a grid row no matter how long the neighbouring names are.
 */
export default function ProductCard({ product, index = 0 }) {
  const add = useCartStore((s) => s.add);
  const openCart = useCartStore((s) => s.open);
  const isWish = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  return (
    <motion.article
      initial={{ y: 28 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
      className="card group relative flex h-full flex-col overflow-hidden transition-shadow duration-200 hover:shadow-lift"
    >
      {product.badge && (
        <span className="absolute left-2.5 top-2.5 z-20 rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold tracking-wide text-cream sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[11px]">
          {product.badge}
        </span>
      )}

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-pressed={isWish}
        aria-label={
          isWish
            ? `Hapus ${product.name} dari favorit`
            : `Simpan ${product.name} ke favorit`
        }
        className="absolute right-2 top-2 z-20 grid h-9 w-9 place-items-center rounded-full bg-surface/90 text-ink-muted backdrop-blur-sm transition-colors hover:text-danger sm:right-2.5 sm:top-2.5 sm:h-10 sm:w-10"
      >
        <Heart
          className={`h-4 w-4 sm:h-[18px] sm:w-[18px] ${
            isWish ? "fill-danger text-danger" : ""
          }`}
        />
      </button>

      <div className="relative aspect-square overflow-hidden bg-surface-2">
        <img
          src={product.img}
          alt=""
          width={500}
          height={500}
          loading={index < 3 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <Link
          to={`/menu/${product.id}`}
          className="absolute inset-0"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-ink-faint sm:text-[11px] sm:tracking-[0.18em]">
          {product.code}
        </p>

        <h3 className="mt-1.5 font-serif text-[15px] font-semibold leading-snug sm:text-lg">
          <Link
            to={`/menu/${product.id}`}
            className="line-clamp-2 transition-colors hover:text-accent"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 pt-2.5 sm:gap-x-2 sm:pt-3">
          <span className="text-[15px] font-semibold text-accent tabular-nums sm:text-base">
            {formatRupiah(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[11px] text-ink-faint line-through tabular-nums sm:text-xs">
              {formatRupiah(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Always visible on every device. A hover-only affordance is
            unreachable on touch, and `sm:opacity-0` left the buttons
            invisible-but-tappable on tablets that report no hover. */}
        <div className="mt-2.5 flex gap-1.5 sm:mt-3 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              add(product);
              openCart();
            }}
            className="btn-primary btn-sm flex-1 justify-center"
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Keranjang</span>
            <span className="sr-only sm:hidden">
              Tambah {product.name} ke keranjang
            </span>
          </button>
          <Link
            to={`/menu/${product.id}`}
            className="btn-outline btn-sm flex-1 justify-center"
          >
            <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Detail</span>
            <span className="sr-only sm:hidden">
              Lihat detail {product.name}
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
