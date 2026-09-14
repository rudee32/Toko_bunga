import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore, useWishlistStore } from "../store/cartStore";
import { formatRupiah, productsById } from "../data/products";

export default function WishlistDrawer() {
  const { isOpen, close, ids, toggle } = useWishlistStore();
  const add = useCartStore((s) => s.add);
  const openCart = useCartStore((s) => s.open);

  const handleBuy = (product) => {
    add(product);
    close();
    openCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={close}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-cream border-l border-dark/10 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-dark/10">
              <h3 className="font-serif text-2xl font-semibold flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-400" />
                Favorit
                <span className="text-sm text-dark/50">({ids.length} item)</span>
              </h3>
              <button onClick={close} className="text-dark/70 hover:text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {ids.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-20 h-20 rounded-full glass flex items-center justify-center">
                    <Heart className="w-9 h-9 text-red-400/50" />
                  </div>
                  <p className="text-dark/60">
                    Belum ada barang yang disukai.
                    <br />
                    Klik ikon <Heart className="inline w-3.5 h-3.5 text-red-400" /> pada produk untuk menyimpannya.
                  </p>
                  <Link to="/menu" onClick={close} className="btn-primary">
                    Jelajahi Katalog
                  </Link>
                </div>
              ) : (
                ids.map((id) => {
                  const product = productsById[id];
                  if (!product) return null;
                  return (
                    <div key={id} className="flex gap-3 p-3 rounded-2xl glass">
                      <Link
                        to={`/menu/${product.id}`}
                        onClick={close}
                        className="shrink-0"
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            to={`/menu/${product.id}`}
                            onClick={close}
                            className="font-medium text-sm leading-snug hover:text-primary transition-colors"
                          >
                            {product.name}
                          </Link>
                          <button
                            onClick={() => toggle(product.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            aria-label="Hapus dari favorit"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-primary text-sm mt-1">
                          {formatRupiah(product.price)}
                        </p>
                        {product.oldPrice && (
                          <p className="text-xs text-dark/40 line-through">
                            {formatRupiah(product.oldPrice)}
                          </p>
                        )}
                        <button
                          onClick={() => handleBuy(product)}
                          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary text-dark px-3 py-1.5 text-xs font-semibold hover:bg-primary-light transition-colors"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Beli Sekarang
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {ids.length > 0 && (
              <div className="border-t border-dark/10 p-5">
                <Link
                  to="/menu"
                  onClick={close}
                  className="btn-primary w-full"
                >
                  Lihat Semua Produk
                </Link>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}