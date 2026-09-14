import { motion } from "framer-motion";
import { Flower2, Heart, Users, Award, MessageCircle, Sparkles } from "lucide-react";
import PageTransition from "../components/PageTransition";
import SectionHeading from "../components/SectionHeading";
import PetalRain from "../three/PetalRain";

const stats = [
  { icon: Users, value: "500+", label: "Pelanggan Puas" },
  { icon: Flower2, value: "50+", label: "Rangkaian Bunga" },
  { icon: Heart, value: "4.9★", label: "Rating Pelanggan" },
  { icon: Award, value: "5+", label: "Tahun Pengalaman" },
];

const types = [
  { name: "Bunga Papan", desc: "Duka cita, ucapan selamat, happy wedding, selamat & bahagia." },
  { name: "Hand Bouquet", desc: "Bouquet tangan berkualitas dengan variasi warna dan ukuran." },
  { name: "Vas Meja", desc: "Rangkaian vas meja untuk mempercantik ruangan." },
  { name: "Standing", desc: "Bunga standing ucapan elegan untuk acara resmi." },
];

export default function Tentang() {
  return (
    <PageTransition>
      <section className="relative pt-28 pb-20 overflow-hidden">
        <PetalRain count={12} />

        <div className="container-x">
          <SectionHeading
            title="Tentang Kami"
            subtitle="Mengenal lebih dekat toko bunga Sekar Floristt."
          />

          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden glass p-8 max-w-md mx-auto">
                <img
                  src="/img/logo.png"
                  alt="Sekar Floristt"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-2 md:right-4 glass rounded-2xl px-5 py-3 animate-float">
                <p className="font-serif italic text-2xl font-semibold text-gradient">
                  Sekar Floristt
                </p>
                <p className="text-xs text-dark/60 text-center">
                  Yogyakarta
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-serif italic text-3xl md:text-4xl font-semibold mb-4">
                Kenapa memilih toko bunga <span className="text-primary">kami?</span>
              </h3>
              <p className="text-dark/70 leading-relaxed mb-4">
                Toko Bunga Sekar Floristt telah menjadi salah satu pusat toko bunga
                yang menyediakan rangkaian bunga dengan kualitas tinggi dan
                memberikan pelayanan terbaik untuk setiap pelanggan.
              </p>
              <p className="text-dark/70 leading-relaxed">
                Banyak rangkaian bunga yang kami sediakan untuk Anda, mulai dari
                bunga papan, hand bouquet, vas meja, hingga standing ucapan.
                Setiap rangkaian dibuat dengan penuh ketelitian dan cinta agar
                setiap momen Anda semakin berkesan.
              </p>

              <div className="mt-6 flex items-center gap-3 glass rounded-2xl px-5 py-4 max-w-md">
                <MessageCircle className="w-8 h-8 text-primary shrink-0" />
                <p className="text-sm text-dark/70">
                  Butuh request khusus? Hubungi kami langsung dan sesuaikan dengan
                  keinginan Anda.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-3xl p-6 text-center"
              >
                <s.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-serif italic text-4xl font-semibold text-gradient">
                  {s.value}
                </p>
                <p className="text-sm text-dark/60 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Types */}
          <h3 className="font-serif italic text-3xl md:text-4xl font-semibold text-center mb-10">
            Ragam <span className="text-primary">Rangkaian Bunga</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {types.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass rounded-3xl p-7 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{t.name}</h4>
                <p className="text-sm text-dark/60 leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}