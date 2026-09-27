import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";
import Drawer from "./Drawer";
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

const FIELDS = [
  { key: "ucapan", label: "Ucapan untuk penerima", type: "text" },
  { key: "name", label: "Nama pengirim", type: "text" },
  { key: "alamat", label: "Alamat tujuan / Plus Codes", type: "text" },
  { key: "phone", label: "No. penerima", type: "tel" },
  { key: "ukuran", label: "Ukuran bunga (Standar / Besar)", type: "text" },
  { key: "tanggal", label: "Tanggal & jam pengiriman", type: "datetime-local" },
];

function Stepper({ qty, onDecrement, onIncrement, name }) {
  const btn =
    "grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-accent-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-1.5 py-1">
      <button type="button" className={btn} onClick={onDecrement} aria-label={`Kurangi jumlah ${name}`}>
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button type="button" className={btn} onClick={onIncrement} aria-label={`Tambah jumlah ${name}`}>
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);
  const { subtotal, totalItems } = useCartTotals();

  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleCheckout = () => {
    openWhatsApp(buildOrderMessage(items, form));
    setForm(initialForm);
    setShowForm(false);
  };

  const footer =
    items.length > 0 ? (
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-ink-muted">Subtotal</span>
          <span className="font-serif text-2xl font-semibold text-accent tabular-nums">
            {formatRupiah(subtotal)}
          </span>
        </div>
        <p className="text-xs text-ink-muted">
          Ongkir dan detail akhir dikonfirmasi lewat WhatsApp.
        </p>

        {!showForm ? (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="btn-primary w-full"
          >
            <MessageCircle className="h-5 w-5" />
            Lanjutkan ke Checkout
          </button>
        ) : (
          <div className="space-y-2">
            {FIELDS.map((f) => (
              <input
                key={f.key}
                type={f.type}
                value={form[f.key]}
                onChange={set(f.key)}
                placeholder={f.label}
                aria-label={f.label}
                className="input w-full"
              />
            ))}
            <button
              type="button"
              onClick={handleCheckout}
              className="btn-primary mt-1 w-full"
            >
              <MessageCircle className="h-5 w-5" />
              Pesan via WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-ghost w-full"
            >
              Kembali
            </button>
          </div>
        )}
      </div>
    ) : null;

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      title="Keranjang"
      count={totalItems}
      icon={ShoppingCart}
      footer={footer}
      labelId="cart-drawer-title"
    >
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-surface-2">
            <ShoppingCart className="h-9 w-9 text-accent/40" />
          </div>
          <p className="text-ink-muted">Keranjang masih kosong</p>
          <Link to="/menu" onClick={close} className="btn-primary">
            Jelajahi Katalog
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="card flex gap-3 p-3">
              <img
                src={item.img}
                alt=""
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
                className="h-20 w-20 shrink-0 rounded-chip object-cover"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium leading-snug">
                    {item.name}
                  </h3>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`Hapus ${item.name} dari keranjang`}
                    className="-mr-1 shrink-0 rounded-chip p-2 text-ink-faint transition-colors hover:bg-surface-2 hover:text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-accent tabular-nums">
                  {formatRupiah(item.price)}
                </p>
                <div className="mt-auto flex items-center gap-3 pt-2">
                  <Stepper
                    name={item.name}
                    qty={item.qty}
                    onDecrement={() => decrement(item.id)}
                    onIncrement={() => increment(item.id)}
                  />
                  <span className="ml-auto text-sm font-semibold tabular-nums">
                    {formatRupiah(item.total)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}
