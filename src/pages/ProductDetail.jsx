import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ShoppingCart,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Truck,
  Palette,
  MessageSquareQuote,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import RichText from "../components/RichText";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import { getProduct, products, formatRupiah } from "../data/products";
import { useCartStore, useWishlistStore } from "../store/cartStore";
import { openWhatsApp } from "../utils/constants";

const assurances = [
  {
    icon: Truck,
    title: "Pengiriman",
    text: "Yogyakarta dan sekitarnya",
  },
  {
    icon: Palette,
    title: "Request warna",
    text: "Disesuaikan sesuai stok",
  },
  {
    icon: MessageSquareQuote,
    title: "Tulisan papan",
    text: "Bisa request kalimat",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = getProduct(id);

  const add = useCartStore((s) => s.add);
  const openCart = useCartStore((s) => s.open);
  const isWish = useWishlistStore((s) => s.ids.includes(product?.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  // Both of these are per-product state: without an explicit reset, going
  // from /menu/1 to /menu/2 carries a quantity of 3 and a stale gallery index
  // over to a completely different product.
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  useEffect(() => {
    setQty(1);
    setActiveImg(0);
  }, [id]);

  useEffect(() => {
    if (product) document.title = `${product.name} — Sekar Floristt`;
  }, [product]);

  if (!product) {
    return (
      <div className="grid min-h-dvh place-items-center px-6 pt-28 text-center">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-ink">
            Produk tidak ditemukan
          </h1>
          <p className="mt-2 text-ink-muted">
            Produk ini mungkin sudah tidak tersedia.
          </p>
          <Link to="/menu" className="btn-primary mt-6">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  const gallery = product.gallery?.length ? product.gallery : [product.img];
  const current = Math.min(activeImg, gallery.length - 1);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // `navigate(-1)` with no history entry leaves the site entirely.
  const goBack = () => {
    if (window.history.length > 1 && location.key !== "default") navigate(-1);
    else navigate("/menu");
  };

  const handleWA = () =>
    openWhatsApp(
      `Halo Sekar Floristt, saya ingin memesan:\n${product.name} (${product.code}) x${qty}\nTotal: ${formatRupiah(product.price * qty)}`
    );

  return (
    <PageTransition>
      <div className="pb-20 pt-28 md:pt-32">
        <div className="container-x">
          <button
            type="button"
            onClick={goBack}
            className="btn-ghost -ml-2 mb-6"
          >
            <ChevronLeft className="h-5 w-5" />
            Kembali
          </button>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.div
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.45 }}
            >
              {/* 3:4 matches the seven portrait product photos (0.73-0.77).
                  A square frame cropped `object-cover` to a 562x1000 source
                  by roughly 44% of its height, cutting the tops of the
                  flowers and the vase. The single landscape shot
                  (`table.jpg`, 1000x750) loses a little width here, which is
                  the cheaper trade than slicing the bouquets. */}
              <div className="card relative aspect-[3/4] overflow-hidden">
                {product.badge && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold tracking-wide text-cream">
                    {product.badge}
                  </span>
                )}
                <img
                  key={current}
                  src={gallery[current]}
                  alt={product.name}
                  width={750}
                  height={1000}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              {gallery.length > 1 && (
                <ul className="scroll-x mt-4 no-scrollbar" aria-label="Galeri produk">
                  {gallery.map((src, i) => (
                    <li key={src} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveImg(i)}
                        aria-label={`Lihat gambar ${i + 1} dari ${gallery.length}`}
                        aria-current={i === current}
                        className={`h-20 w-20 overflow-hidden rounded-chip border-2 transition-[border-color,opacity] duration-120 ${
                          i === current
                            ? "border-accent"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={src}
                          alt=""
                          width={80}
                          height={80}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-ink-faint">
                {product.code}
              </p>
              <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif text-3xl font-semibold text-accent tabular-nums">
                  {formatRupiah(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-ink-faint line-through tabular-nums">
                    {formatRupiah(product.oldPrice)}
                  </span>
                )}
              </div>

              <RichText
                text={product.description}
                className="mt-6 leading-relaxed text-ink-muted"
              />

              {product.sizes?.length > 0 && (
                <p className="mt-6 text-sm text-ink-muted">
                  Ukuran tersedia:{" "}
                  <span className="font-medium text-ink">
                    {product.sizes.join(" · ")}
                  </span>
                </p>
              )}

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <span id="qty-label" className="text-sm text-ink-muted">
                    Jumlah
                  </span>
                  <div
                    className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-1.5 py-1"
                    role="group"
                    aria-labelledby="qty-label"
                  >
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      disabled={qty <= 1}
                      className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink disabled:opacity-30"
                      aria-label="Kurangi jumlah"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold tabular-nums">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
                      aria-label="Tambah jumlah"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm text-ink-muted tabular-nums">
                    = {formatRupiah(product.price * qty)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      add(product, qty);
                      openCart();
                    }}
                    className="btn-primary flex-1"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Tambah ke Keranjang
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-pressed={isWish}
                    aria-label={
                      isWish
                        ? "Hapus dari favorit"
                        : "Simpan ke favorit"
                    }
                    className="btn-outline px-4"
                  >
                    <Heart
                      className={`h-5 w-5 ${isWish ? "fill-danger text-danger" : ""}`}
                    />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleWA}
                  className="btn-dark w-full"
                >
                  <MessageCircle className="h-5 w-5" />
                  Pesan Langsung via WhatsApp
                </button>
              </div>

              <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                {assurances.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="card px-4 py-4 text-center">
                    <Icon className="mx-auto mb-2 h-5 w-5 text-accent" aria-hidden="true" />
                    <p className="text-sm font-medium text-ink">{title}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{text}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <SectionHeading title="Produk Terkait" align="center" />
              <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                {related.map((p, i) => (
                  <li key={p.id} className="h-full">
                    <ProductCard product={p} index={i} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
