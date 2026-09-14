import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Flower2,
  Truck,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  BadgePercent,
} from "lucide-react";
import Hero3D from "../three/Hero3D";
import PetalRain from "../three/PetalRain";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import StarRating from "../components/StarRating";
import PageTransition from "../components/PageTransition";
import { products, testimoni } from "../data/products";

const features = [
  {
    icon: Flower2,
    title: "Bunga Berkualitas",
    desc: "Rangkaian bunga segar dengan kualitas terbaik dan tahan lama.",
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat",
    desc: "Area Yogyakarta & sekitarnya, pengiriman tepat waktu sesuai jadwal.",
  },
  {
    icon: MessageCircle,
    title: "Bisa Request",
    desc: "Sesuaikan desain bunga sesuai keinginan dan kebutuhan Anda.",
  },
  {
    icon: ShieldCheck,
    title: "Pelayanan Terbaik",
    desc: "Dukungan yang ramah dan profesional untuk setiap pelanggan.",
  },
];

export default function Home() {
  const bestSeller = products.filter((p) => p.badge).slice(0, 4);
  const featured = products.slice(0, 4);

  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/bg.jpg')] bg-cover bg-center opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/65 to-cream" />
        <Hero3D />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cream to-transparent" />

        <div className="relative container-x pt-28 pb-20 text-center pointer-events-none">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full glass text-sm text-primary mb-6"
          >
            ✦ Toko Bunga Terpercaya di Yogyakarta
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif italic text-5xl md:text-7xl lg:text-8xl font-semibold text-shadow"
          >
            Selamat Datang di
            <br />
            <span className="text-gradient">Sekar Floristt</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-2xl mx-auto text-dark/70 text-lg"
          >
            Kami menyediakan rangkaian bunga berkualitas tinggi — bunga papan,
            hand bouquet, vas meja, hingga standing untuk semua momen spesial Anda.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap justify-center gap-4 pointer-events-auto"
          >
            <Link to="/menu" className="btn-primary text-base px-8 py-4">
              <Flower2 className="w-5 h-5" />
              Lihat Katalog
            </Link>
            <a
              href="https://wa.me/6289674289400?text=Halo%20Sekar%20Floristt%2C%20saya%20ingin%20pesan%20bunga."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold text-dark hover:border-primary/50 transition-all"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              Chat Kami
            </a>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-20">
        <PetalRain count={8} />
        <div className="container-x grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-3xl p-6 text-center transition-colors hover:border-primary/40"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-dark/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BEST SELLER */}
      <section className="relative py-20">
        <PetalRain count={10} />
        <div className="container-x">
          <SectionHeading
            title="Best Seller Kami"
            subtitle="Rangkaian bunga favorit yang paling banyak dipesan pelanggan kami."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSeller.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu" className="btn-primary">
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* PROMO STRIP */}
      <section className="py-16">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-gold/30 p-10 md:p-16 text-center bg-gradient-to-r from-white via-cream to-white"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <BadgePercent className="w-12 h-12 text-gold mx-auto mb-4 animate-float" />
            <h2 className="font-serif italic text-3xl md:text-5xl font-semibold">
              Spesial <span className="text-gradient">Promo</span> Setiap Hari
            </h2>
            <p className="text-dark/60 max-w-xl mx-auto mt-4">
              Nikmati penawaran menarik dan diskon untuk berbagai rangkaian bunga
              favorit Anda.
            </p>
            <Link to="/promo" className="btn-primary mt-6">
              <Sparkles className="w-5 h-5" />
              Jelajahi Promo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* KATALOG PREVIEW */}
      <section className="py-20">
        <div className="container-x">
          <SectionHeading
            title="Katalog Pilihan"
            subtitle="Berbagai macam rangkaian bunga yang siap untuk momen spesial Anda."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu" className="btn-primary">
              Buka Katalog Lengkap
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
      <section className="py-20 relative overflow-hidden">
        <PetalRain count={8} />
        <div className="container-x">
          <SectionHeading
            title="Kata Mereka"
            subtitle="Apa kata pelanggan kami tentang kualitas produk dan pelayanan Sekar Floristt."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimoni.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="glass rounded-3xl p-7"
              >
                <div className="mb-3">
                  <StarRating rating={t.rating} />
                </div>
                <p className="text-dark/70 leading-relaxed mb-5">
                  &ldquo;{t.message}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-semibold text-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-dark/50">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
