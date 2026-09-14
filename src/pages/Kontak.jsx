import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from "lucide-react";
import PageTransition from "../components/PageTransition";
import SectionHeading from "../components/SectionHeading";
import PetalRain from "../three/PetalRain";
import { SOCIALS, WHATSAPP_NUMBER } from "../utils/constants";

export default function Kontak() {
  return (
    <PageTransition>
      <section className="relative pt-28 pb-20">
        <PetalRain count={10} />
        <div className="container-x">
          <SectionHeading
            title="Kontak Kami"
            subtitle="Kami memiliki toko offline. Silakan gunakan fitur di bawah untuk informasi lebih lanjut tentang produk kami."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl overflow-hidden glass"
            >
              <iframe
                title="Lokasi Sekar Floristt"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247.06363390419494!2d110.3687255!3d-7.7879007!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a582fa4b419d1%3A0x9cb51f86c0222e02!2sSekar%20Dewi%20Florist!5e0!3m2!1sid!2sid!4v1718413177469!5m2!1sid!2sid"
                className="w-full h-full min-h-[400px]"
                style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-3xl p-7"
            >
              <h3 className="font-serif italic text-2xl font-semibold mb-6">
                Informasi <span className="text-primary">Kontak</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-dark/70">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  Yogyakarta, Indonesia
                </div>
                <div className="flex items-center gap-3 text-sm text-dark/70">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  0896-7428-9400
                </div>
                <div className="flex items-center gap-3 text-sm text-dark/70">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  sekarfloristt@gmail.com
                </div>
                <div className="flex items-center gap-3 text-sm text-dark/70">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  Setiap hari, 08.00 - 20.00 WIB
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full glass text-dark/80 hover:text-primary transition-all hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full glass text-dark/80 hover:text-green-600 transition-all hover:scale-110"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}