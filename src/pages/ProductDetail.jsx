import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ShoppingCart,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  BadgeCheck,
  Truck,
  RefreshCcw,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";
import { getProduct, products, formatRupiah } from "../data/products";
import { useCartStore, useWishlistStore } from "../store/cartStore";
import { openWhatsApp } from "../utils/constants";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(id);
  const [qty, setQty] = useState(1);
  const add = useCartStore((s) => s.add);
  const openCart = useCartStore((s) => s.open);
  const wishlistIds = useWishlistStore((s) => s.ids);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWish = wishlistIds.includes(Number(id));
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="pt-40 text-center">
        <p className="text-dark/60">Produk tidak ditemukan.</p>
        <Link to="/menu" className="btn-primary mt-4">Kembali ke Katalog</Link>
      </div>
    );
  }

  const gallery = product.gallery || [product.img];
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAdd = () => {
    add(product, qty);
    openCart();
  };

  const handleWA = () => {
    openWhatsApp(
      `Halo Sekar Floristt, saya ingin memesan:\n${product.name} (${product.code}) x${qty}\nTotal: ${formatRupiah(product.price * qty)}`
    );
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-20">
        <div className="container-x">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-dark/60 hover:text-primary mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Kembali
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="rounded-3xl overflow-hidden glass relative aspect-square">
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 text-xs font-semibold bg-primary text-dark rounded-full">
                    {product.badge}
                  </span>
                )}
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={gallery[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImg === i
                          ? "border-primary"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={g} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 text-sm text-dark/50 mb-3">
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary">
                  {product.code}
                </span>
                <StarRating rating={product.rating} />
              </div>
              <h1 className="font-serif italic text-4xl md:text-5xl font-semibold mb-4">
                {product.name}
              </h1>
              <p className="text-dark/70 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-3xl font-semibold text-primary">
                  {formatRupiah(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-dark/40 line-through">
                    {formatRupiah(product.oldPrice)}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-dark/70 text-sm">Jumlah:</span>
                  <div className="flex items-center gap-3 glass rounded-full px-3 py-2">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="text-dark/70 hover:text-primary"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-8 text-center font-semibold">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="text-dark/70 hover:text-primary"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={handleAdd} className="btn-primary flex-1 min-w-[200px]">
                    <ShoppingCart className="w-5 h-5" />
                    Tambah ke Keranjang
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3 rounded-full glass text-dark hover:text-red-400 transition-colors"
                    aria-label="Favorit"
                  >
                    <Heart className={`w-5 h-5 ${isWish ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                </div>

                <button onClick={handleWA} className="w-full rounded-full glass py-3 text-sm font-semibold text-green-600 hover:bg-green-500/10 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Pesan Langsung via WhatsApp
                </button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="glass rounded-2xl p-4 text-center">
                  <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-dark/60">Pengiriman Yogyakarta & sekitarnya</p>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                  <RefreshCcw className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-dark/60">Bisa request sesuai keinginan</p>
                </div>
                <div className="glass rounded-2xl p-4 text-center">
                  <BadgeCheck className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-dark/60">Kualitas bunga terbaik</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-serif italic text-3xl font-semibold text-center mb-8">
                Produk <span className="text-primary">Terkait</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
