import { motion } from "framer-motion";
import { BadgePercent, Sparkles, Ticket, QrCode } from "lucide-react";
import PageTransition from "../components/PageTransition";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import PetalRain from "../three/PetalRain";
import { products } from "../data/products";

const promoBanners = [
  {
    icon: BadgePercent,
    title: "Diskon Spesial",
    desc: "Hemat hingga 20% untuk rangkaian bunga papan pilihan di bulan ini.",
  },
  {
    icon: Sparkles,
    title: "New Collection",
    desc: "Rangkaian hand bouquet terbaru dengan desain elegan dan modern.",
  },
  {
    icon: Ticket,
    title: "Paket Hemat",
    desc: "Paket lengkap bunga papan + standing untuk kebutuhan acara Anda.",
  },
];

export default function Promo() {
  const promoProducts = products.filter((p) => p.badge || p.oldPrice).slice(0, 6);
  const qris = products[10]; // just a placeholder reference

  return (
    <PageTransition>
      <section className="relative pt-28 pb-20">
        <PetalRain count={10} />
        <div className="container-x">
          <SectionHeading
            title="Promo Spesial"
            subtitle="Jangan lewatkan penawaran spesial dan diskon menarik dari Sekar Floristt."
          />

          {/* Banners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {promoBanners.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass rounded-3xl p-8 text-center border border-gold/20 hover:border-gold/40 transition-all"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-4 animate-float">
                  <b.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-serif italic text-2xl font-semibold mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-dark/60">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* QRIS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-primary/30 p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-white via-cream to-white"
          >
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <QrCode className="w-7 h-7 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                  Pembayaran Mudah
                </span>
              </div>
              <h2 className="font-serif italic text-3xl md:text-4xl font-semibold mb-3">
                Bayar pakai <span className="text-gradient">QRIS</span>
              </h2>
              <p className="text-dark/70 max-w-md">
                Pembayaran kini semakin mudah dengan QRIS. Scan, bayar, dan pesanan
                Anda langsung diproses.
              </p>
            </div>
            <div className="shrink-0">
              <div className="w-48 h-48 rounded-2xl bg-white p-3 flex items-center justify-center">
                <img
                  src="/img/products/qris.jpg"
                  alt="QRIS Sekar Floristt"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-center text-xs text-dark/50 mt-2">QRIS Sekar Floristt</p>
            </div>
          </motion.div>

          {/* Promo products */}
          <h2 className="font-serif italic text-3xl md:text-4xl font-semibold text-center mb-10">
            Produk <span className="text-primary">Promo</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promoProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}