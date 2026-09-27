import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Flower2,
  Truck,
  Palette,
  MessageSquareQuote,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Hero3D from "../three/Hero3D";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import PageTransition from "../components/PageTransition";
import Tilt from "../components/Tilt";
import { products } from "../data/products";
import { WHATSAPP_NUMBER } from "../utils/constants";

const categories = [
  {
    icon: Flower2,
    title: "Bunga papan",
    desc: "Leter U, setiap sudut, kanan kiri, dan standing dengan ukuran sesuai permintaan.",
  },
  {
    icon: Truck,
    title: "Pengiriman",
    desc: "Yogyakarta dan sekitarnya, dikirim sesuai jadwal yang Anda tentukan.",
  },
  {
    icon: Palette,
    title: "Request warna",
    desc: "Warna dan tulisan papan bisa disesuaikan, menyesuaikan ketersediaan stok.",
  },
  {
    icon: MessageSquareQuote,
    title: "Ucapan di papan",
    desc: "Kirimkan kalimatnya, kami yang menuliskan pada susunan bunga.",
  },
];

const chatUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Halo Sekar Floristt, saya ingin tanya dan memesan rangkaian bunga."
)}`;

export default function Home() {
  // One grid, not two near-identical ones: products carrying a badge, topped up
  // from the rest of the catalogue so the section is never half empty.
  const featured = [
    ...products.filter((p) => p.badge),
    ...products.filter((p) => !p.badge),
  ].slice(0, 8);

  return (
      <PageTransition>
      {/* One background, one scrim. This used to stack four full-bleed layers:
          the photo at 30% opacity, a cream/70→cream/85 gradient over it, the
          SVG or WebGL scene, then another 128px gradient at the bottom. The
          photo was effectively invisible (0.30 x 0.15-0.30 ≈ 5%) while still
          costing 43 KB on the critical path, and the layers muddied the text.
          Now the shop photo reads as the backdrop and one scrim keeps the
          headline contrast independent of what is behind it. */}
      <section className="relative flex min-h-dvh items-center overflow-hidden">
        <img
          src="/img/bg.jpg"
          alt=""
          width={1920}
          height={2880}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[center_28%] opacity-70"
        />
        <div className="absolute inset-0 bg-cream/55" />
        <Hero3D />

        <div className="container-x relative pb-16 pt-28 text-center sm:pt-32 md:pt-36">
          <motion.p
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            Bunga papan · Hand bouquet · Vas meja · Standing
          </motion.p>

          <motion.h1
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] text-balance sm:text-6xl lg:text-7xl"
          >
            Rangkaian bunga untuk setiap momen
          </motion.h1>

          <motion.p
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:mt-6 sm:text-lg"
          >
            Toko bunga di Yogyakarta. Ukuran, warna, dan tulisan pada papan bisa
            disesuaikan sesuai kebutuhan.
          </motion.p>

          {/* Stacked and full width on phones: at 320px of content the two
              buttons could not sit side by side, so `flex-wrap` broke them
              into two ragged rows of different widths. */}
          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, delay: 0.19 }}
            className="mx-auto mt-7 flex max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <Link
              to="/menu"
              className="btn-primary w-full justify-center px-7 py-3.5 text-base sm:w-auto"
            >
              Lihat Katalog
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={chatUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline w-full justify-center px-7 py-3.5 text-base sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Chat Kami
            </a>
          </motion.div>
        </div>
      </section>

      <Tilt className="py-16 md:py-20">
        <div className="container-x grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              <h2 className="mt-3 font-serif text-xl font-semibold text-ink">
                {title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{desc}</p>
            </div>
          ))}
        </div>
      </Tilt>

      <Tilt className="pb-16 md:pb-20">
        <div className="container-x">
          <SectionHeading
            title="Produk pilihan"
            subtitle="Sebagian dari katalog kami. Buka katalog untuk melihat semua jenis dan ukuran."
          />
          <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {featured.map((p, i) => (
              <li key={p.id} className="h-full">
                <ProductCard product={p} index={i} />
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link to="/menu" className="btn-outline">
              Buka Katalog Lengkap
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Tilt>

      <Tilt className="pb-20">
        <div className="container-x">
          <div className="card flex flex-col items-start gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-ink md:text-3xl">
                Punya kebutuhan khusus?
              </h2>
              <p className="mt-2 max-w-lg leading-relaxed text-ink-muted">
                Ukuran besar, warna tertentu, atau tulisan khusus? Kirimkan
                detailnya lewat WhatsApp dan kami bantu hitung opsinya.
              </p>
            </div>
            <a
              href={chatUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-dark shrink-0"
            >
              <MessageCircle className="h-5 w-5" />
              Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </Tilt>
    </PageTransition>
  );
}
