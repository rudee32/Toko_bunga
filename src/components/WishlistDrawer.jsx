import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Drawer from "./Drawer";
import { useCartStore, useWishlistStore } from "../store/cartStore";
import { formatRupiah, productsById } from "../data/products";

export default function WishlistDrawer() {
  const isOpen = useWishlistStore((s) => s.isOpen);
  const close = useWishlistStore((s) => s.close);
  const ids = useWishlistStore((s) => s.ids);
  const toggle = useWishlistStore((s) => s.toggle);
  const add = useCartStore((s) => s.add);
  const openCart = useCartStore((s) => s.open);

  const handleBuy = (product) => {
    add(product);
    close();
    openCart();
  };

  const footer =
    ids.length > 0 ? (
      <Link to="/menu" onClick={close} className="btn-primary w-full">
        Lihat Semua Produk
      </Link>
    ) : null;

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      title="Favorit"
      count={ids.length}
      icon={Heart}
      footer={footer}
      labelId="wishlist-drawer-title"
    >
      {ids.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-surface-2">
            <Heart className="h-9 w-9 text-danger/40" />
          </div>
          <p className="max-w-[22ch] text-ink-muted">
            Belum ada produk yang disimpan. Tekan ikon hati pada produk untuk
            menambahkannya ke sini.
          </p>
          <Link to="/menu" onClick={close} className="btn-primary">
            Jelajahi Katalog
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {ids.map((id) => {
            const product = productsById[id];
            if (!product) return null;
            return (
              <li key={id} className="card flex gap-3 p-3">
                <Link
                  to={`/menu/${product.id}`}
                  onClick={close}
                  className="shrink-0"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={product.img}
                    alt=""
                    width={80}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-20 rounded-chip object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/menu/${product.id}`}
                      onClick={close}
                      className="text-sm font-medium leading-snug transition-colors hover:text-accent"
                    >
                      {product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggle(product.id)}
                      className="-mr-1 shrink-0 rounded-chip p-2 text-ink-faint transition-colors hover:bg-surface-2 hover:text-danger"
                      aria-label={`Hapus ${product.name} dari favorit`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-accent tabular-nums">
                    {formatRupiah(product.price)}
                  </p>
                  {product.oldPrice && (
                    <p className="text-xs text-ink-faint line-through tabular-nums">
                      {formatRupiah(product.oldPrice)}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => handleBuy(product)}
                    className="btn-outline btn-sm mt-auto w-fit"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Beli Sekarang
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Drawer>
  );
}
