import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  ShoppingBag,
  Navigation,
  Star,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import Tilt from "../components/Tilt";
import SectionHeading from "../components/SectionHeading";
import {
  MAPS,
  OPENING_HOURS,
  SOCIALS,
  WHATSAPP_NUMBER,
} from "../utils/constants";

const EMAIL = "sekarfloristt@gmail.com";
const PHONE_DISPLAY = "0896-7428-9400";

const marketplaces = [
  { label: "Shopee", href: SOCIALS.shopee, icon: ShoppingBag },
  { label: "Tokopedia", href: SOCIALS.tokopedia, icon: ShoppingBag },
];

export default function Kontak() {
  return (
    <PageTransition>
      <Tilt className="pb-20 pt-28 md:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Kontak"
            subtitle="Kunjungi toko atau hubungi kami lebih dulu untuk memastikan stok dan waktu pengerjaan."
          />

          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <motion.div
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.45 }}
              className="card flex flex-col p-6 md:p-8"
            >
              <h2 className="font-serif text-2xl font-semibold text-ink">
                Lokasi toko
              </h2>

              <address className="mt-4 not-italic leading-relaxed text-ink-muted">
                {MAPS.address}
              </address>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={MAPS.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  <Navigation className="h-5 w-5" />
                  Petakan arah
                </a>
                <a
                  href={MAPS.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  <MapPin className="h-5 w-5" />
                  Lihat di Google Maps
                </a>
              </div>

              {/*
                The Google Maps embed is intentionally omitted here. The
                listing at this address is published under a different business
                name and is unclaimed, so an iframe would render that name on
                this page. Once the listing is confirmed as ours, the embed src
                can be restored alongside MAPS in utils/constants.js.
              */}

              <div className="mt-8 border-t border-line pt-6">
                <h3 className="flex items-center gap-2 text-sm font-medium text-ink">
                  <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                  Jam buka
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {OPENING_HOURS.map(({ day, time }) => (
                    <li
                      key={day}
                      className="flex items-baseline justify-between gap-4 text-sm"
                    >
                      <span className="text-ink">{day}</span>
                      <span className="text-ink-muted tabular-nums">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="space-y-4"
            >
              <div className="card p-6 md:p-8">
                <h2 className="font-serif text-2xl font-semibold text-ink">
                  Hubungi kami
                </h2>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex items-center gap-3">
                    <Phone
                      className="h-5 w-5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <a
                      href={`tel:+${WHATSAPP_NUMBER}`}
                      className="text-ink transition-colors hover:text-accent"
                    >
                      {PHONE_DISPLAY}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageCircle
                      className="h-5 w-5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink transition-colors hover:text-accent"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail
                      className="h-5 w-5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <a
                      href={`mailto:${EMAIL}`}
                      className="break-all text-ink transition-colors hover:text-accent"
                    >
                      {EMAIL}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card p-6 md:p-8">
                <h2 className="font-serif text-2xl font-semibold text-ink">
                  Ikuti dan Pesan
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Instagram", href: SOCIALS.instagram, icon: Instagram },
                    ...marketplaces,
                  ].map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline h-full w-full flex-col gap-1.5 py-4"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <span className="text-xs">{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {MAPS.rating != null && (
                <p className="flex items-center gap-2 px-1 text-sm text-ink-muted">
                  <Star className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                  {MAPS.rating} dari {MAPS.reviewCount} ulasan di Google Maps
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </Tilt>
    </PageTransition>
  );
}
