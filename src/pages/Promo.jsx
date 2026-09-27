import { motion } from "framer-motion";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import Tilt from "../components/Tilt";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import CountUp from "../components/CountUp";
import { products } from "../data/products";
import { WHATSAPP_NUMBER } from "../utils/constants";

// Two prefills, not one. Both links open WhatsApp, but "Tanya promo lain" is a
// browsing question while the card below it is a conversion question, and the
// shop can tell from the incoming message which one customers meant.
const chatUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Halo Sekar Floristt, saya ingin tanya harga promo yang sedang berjalan."
)}`;

const offerUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Halo Sekar Floristt, saya mau tanya promo khusus untuk pesanan saya."
)}`;

// Only real, data-backed offers: a product qualifies if it has a strike-through
// price in the catalogue. No invented "hemat 20%" banners.
const promoProducts = products.filter((p) => p.oldPrice);

const totalSaving = promoProducts.reduce(
  (sum, p) => sum + (p.oldPrice - p.price),
  0
);

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

          <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-[1fr_20rem] md:items-stretch">
            {promoProducts.length > 0 && (
              <motion.div
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="card relative overflow-hidden bg-surface-2 px-6 py-8 md:px-10 md:py-10"
              >
                {/* A flat tint read as a grey slab, so the wash gives the
                    numeral something to sit on. Purely decorative. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(var(--c-accent-soft)/0.4),transparent_70%)]"
                />
                <p className="eyebrow relative flex items-center gap-2">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Total hemat promo
                </p>
                <p className="relative mt-3 font-serif text-4xl font-semibold leading-none tabular-nums text-accent sm:text-5xl">
                  <CountUp value={totalSaving} />
                </p>
                <p className="relative mt-3 text-sm text-ink-muted">
                  dari {promoProducts.length} produk yang sedang turun harga
                </p>
                {/* min-h keeps this a 44px target; as a bare text link it was
                    well under that on touch. */}
                <a
                  href={chatUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative mt-3 inline-flex min-h-[44px] items-center gap-1 font-medium text-accent transition-colors hover:underline"
                >
                  Tanya promo lain
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className={`card-dark px-6 py-8 md:px-8 md:py-10 ${
                promoProducts.length > 0
                  ? "md:col-start-2"
                  : "md:col-start-1 md:mx-auto md:w-full md:max-w-md"
              }`}
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-cream/10 text-cream">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-xl font-semibold text-cream md:text-2xl">
                Tanya promo khusus
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                Punya pesanan besar atau tanggal tertentu? Ceritakan, kami siapkan
                penawaran terpisah dari promo yang sedang berjalan.
              </p>
              <a
                href={offerUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-invert mt-6 w-full justify-center"
              >
                Tanya promo via WhatsApp
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </Tilt>
    </PageTransition>
  );
}
