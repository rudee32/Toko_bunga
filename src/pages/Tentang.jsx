import { motion } from "framer-motion";
import { MessageCircle, MapPin } from "lucide-react";
import PageTransition from "../components/PageTransition";
import Tilt from "../components/Tilt";
import SectionHeading from "../components/SectionHeading";
import { MAPS, WHATSAPP_NUMBER } from "../utils/constants";

const types = [
  {
    name: "Bunga papan",
    desc: "Desain letter U, setiap sudut, dan kanan kiri, untuk duka cita, ucapan selamat, hingga happy wedding.",
  },
  {
    name: "Hand bouquet",
    desc: "Rangkaian bunga genggam dengan variasi warna dan ukuran.",
  },
  {
    name: "Vas meja",
    desc: "Susunan bunga untuk vas meja, cocok untuk menghias meja tanpa memenuhi ruang.",
  },
  {
    name: "Standing",
    desc: "Bunga standing untuk acara resmi, opening perusahaan, dan acara keluarga.",
  },
];

export default function Tentang() {
  return (
    <PageTransition>
      <Tilt className="pb-20 pt-28 md:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Tentang kami"
            subtitle="Sekar Floristt adalah toko bunga yang melayani Yogyakarta dan sekitarnya."
          />

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="card mx-auto w-full max-w-sm p-6"
            >
              <img
                src="/img/logo.png"
                alt="Logo Sekar Floristt"
                width={500}
                height={500}
                className="h-auto w-full"
              />
            </motion.div>

            <motion.div
              initial={{ y: 16 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <h2 className="font-serif text-3xl font-semibold text-ink md:text-4xl">
                Toko bunga di Yogyakarta
              </h2>
              <div className="mt-5 space-y-4 leading-relaxed text-ink-muted">
                <p>
                  Kami menyediakan bunga papan, hand bouquet, vas meja, dan
                  standing untuk berbagai acara: duka cita, ucapan selamat,
                  happy wedding, hingga peresmian.
                </p>
                <p>
                  Ukuran, pilihan warna, dan tulisan pada papan bisa
                  disesuaikan. Setiap penyesuaian mengikuti ketersediaan bahan
                  yang ada saat pesanan masuk.
                </p>
              </div>

              <address className="mt-6 flex items-start gap-3 not-italic text-ink-muted">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <a
                  href={MAPS.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm transition-colors hover:text-accent"
                >
                  {MAPS.address}
                </a>
              </address>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="btn-dark mt-6"
              >
                <MessageCircle className="h-5 w-5" />
                Tanya stok via WhatsApp
              </a>
            </motion.div>
          </div>

          <div className="mt-16 md:mt-20">
            <SectionHeading title="Ragam rangkaian" align="left" />
            <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {types.map((t) => (
                <li key={t.name} className="border-t border-line pt-5">
                  <h3 className="font-serif text-xl font-semibold text-ink">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {t.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Tilt>
    </PageTransition>
  );
}
