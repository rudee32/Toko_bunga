import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingCart, MessageCircle } from "lucide-react";
import { useCartStore, useCartTotals } from "../store/cartStore";
import { formatRupiah } from "../data/products";
import { buildOrderMessage, openWhatsApp } from "../utils/constants";

const initialForm = {
  ucapan: "",
  name: "",
  alamat: "",
  phone: "",
  ukuran: "",
  tanggal: "",
};

export default function CartDrawer() {
  const { isOpen, close, items, increment, decrement, remove, clear } =
    useCartStore();
  const { subtotal, totalItems } = useCartTotals();
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleCheckout = () => {
    const msg = buildOrderMessage(items, form);
    openWhatsApp(msg);
    setForm(initialForm);
    setShowForm(false);
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
                <ShoppingCart className="w-6 h-6 text-primary" />
                Keranjang
                <span className="text-sm text-dark/50">({totalItems} item)</span>
              </h3>
              <button onClick={close} className="text-dark/70 hover:text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-20 h-20 rounded-full glass flex items-center justify-center">
                    <ShoppingCart className="w-9 h-9 text-primary/50" />
                  </div>
                  <p className="text-dark/60">Keranjang masih kosong</p>
                  <Link
                    to="/menu"
                    onClick={close}
                    className="btn-primary"
                  >
                    Jelajahi Katalog
                  </Link>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-2xl glass"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-sm leading-snug pr-2">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => remove(item.id)}
                            className="text-dark/40 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-primary text-sm mt-1">
                          {formatRupiah(item.price)}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 glass rounded-full px-2 py-1">
                            <button
                              onClick={() => decrement(item.id)}
                              className="text-dark/70 hover:text-primary"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm w-5 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => increment(item.id)}
                              className="text-dark/70 hover:text-primary"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-sm text-dark/60 ml-auto">
                            {formatRupiah(item.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-dark/10 p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-dark/70">Subtotal</span>
                  <span className="font-serif text-2xl font-semibold text-primary">
                    {formatRupiah(subtotal)}
                  </span>
                </div>

                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary w-full"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Lanjutkan ke Checkout
                  </button>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    <input
                      value={form.ucapan}
                      onChange={set("ucapan")}
                      placeholder="Ucapan untuk penerima"
                      className="input-glass w-full"
                    />
                    <input
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Nama pengirim"
                      className="input-glass w-full"
                    />
                    <input
                      value={form.alamat}
                      onChange={set("alamat")}
                      placeholder="Alamat tujuan / Plus Codes"
                      className="input-glass w-full"
                    />
                    <input
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="No. penerima"
                      className="input-glass w-full"
                    />
                    <input
                      value={form.ukuran}
                      onChange={set("ukuran")}
                      placeholder="Ukuran bunga (Standar / Besar)"
                      className="input-glass w-full"
                    />
                    <input
                      type="datetime-local"
                      value={form.tanggal}
                      onChange={set("tanggal")}
                      className="input-glass w-full"
                    />
                    <button
                      onClick={handleCheckout}
                      className="btn-primary w-full"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Pesan via WhatsApp
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
