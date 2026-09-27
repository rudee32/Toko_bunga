import { motion } from "framer-motion";
import { QrCode, MessageCircle, ArrowRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import Tilt from "../components/Tilt";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import { products, formatRupiah } from "../data/products";
import { WHATSAPP_NUMBER } from "../utils/constants";

const chatUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Halo Sekar Floristt, saya ingin tanya harga promo yang sedang berjalan."
)}`;

// Only real, data-backed offers: a product qualifies if it has a strike-through
// price in the catalogue. No invented "hemat 20%" banners.
const promoProducts = products.filter((p) => p.oldPrice);

const discount = (p) =>
  p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

export default function Promo() {
  return (
    <PageTransition>
      <Tilt className="pb-20 pt-28 md:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Promo"
            subtitle="Produk yang sedang turun harga. Harga dan ketersediaan mengikuti stok yang ada."
          />

          {promoProducts.length === 0 ? (
            <div className="card mx-auto max-w-md px-6 py-14 text-center">
              <p className="font-serif text-xl font-semibold text-ink">
                Belum ada promo aktif
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                Tanya langsung lewat WhatsApp untuk penawaran terbaru.
              </p>
              <a
                href={chatUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-6"
              >
                Tanya promo
              </a>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 pt-2 sm:gap-6 lg:grid-cols-3">
              {promoProducts.map((p, i) => (
                <li key={p.id} className="relative h-full">
                  <span className="absolute -top-2 left-3 z-20 rounded-full bg-danger px-2.5 py-0.5 text-[11px] font-semibold text-cream">
                    Hemat {discount(p)}%
                  </span>
                  <ProductCard product={p} index={i} />
                </li>
              ))}
            </ul>
          )}

          {promoProducts.length > 0 && (
            <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-ink-muted">
              <span>
                Total hemat promo saat ini:{" "}
                <span className="font-medium text-ink tabular-nums">
                  {formatRupiah(
                    promoProducts.reduce(
                      (sum, p) => sum + (p.oldPrice - p.price),
                      0
                    )
                  )}
                </span>
              </span>
              <a
                href={chatUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:underline"
              >
                Tanya promo lain
                <ArrowRight className="h-4 w-4" />
              </a>
            </p>
          )}

          <motion.div
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="card mt-16 flex flex-col items-center gap-8 px-6 py-8 md:flex-row md:justify-between md:px-10"
          >
            <div className="text-center md:text-left">
              <h2 className="flex items-center justify-center gap-2 font-serif text-2xl font-semibold text-ink md:justify-start">
                <QrCode className="h-6 w-6 text-accent" aria-hidden="true" />
                Bayar dengan QRIS
              </h2>
              <p className="mt-2 max-w-sm leading-relaxed text-ink-muted">
                Scan kode QRIS di toko, atau transfer dan konfirmasi pesanan lewat
                WhatsApp.
              </p>
            </div>
            <div className="shrink-0">
              <div className="rounded-card border border-line bg-cream p-3">
                <img
                  src="/img/products/qris.jpg"
                  alt="Kode QRIS untuk pembayaran di Sekar Floristt"
                  width={557}
                  height={550}
                  loading="lazy"
                  decoding="async"
                  className="h-40 w-40 object-contain"
                />
              </div>
            </div>
          </motion.div>

          <div className="mt-10 text-center">
            <a
              href={chatUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-dark"
            >
              <MessageCircle className="h-5 w-5" />
              Tanya promo via WhatsApp
            </a>
          </div>
        </div>
      </Tilt>
    </PageTransition>
  );
}
