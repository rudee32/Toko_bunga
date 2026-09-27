import { Link } from "react-router-dom";
import {
  Instagram,
  ShoppingBag,
  Flower2,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { MAPS, SOCIALS, WHATSAPP_NUMBER } from "../utils/constants";

const menu = [
  { to: "/", label: "Beranda" },
  { to: "/menu", label: "Katalog" },
  { to: "/promo", label: "Promo" },
  { to: "/tentang", label: "Tentang" },
  { to: "/kontak", label: "Kontak" },
];

const shops = [
  { label: "Instagram", href: SOCIALS.instagram },
  { label: "Shopee", href: SOCIALS.shopee },
  { label: "Tokopedia", href: SOCIALS.tokopedia },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-accent-soft/40 bg-accent-soft/15">
              <Flower2 className="h-4 w-4 text-accent" aria-hidden="true" />
            </span>
            <span className="font-serif text-xl font-semibold text-ink">
              Sekar <span className="text-accent">Floristt</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Toko bunga di Yogyakarta. Bunga papan, hand bouquet, vas meja, dan
            standing.
          </p>
        </div>

        <nav aria-labelledby="footer-menu">
          <h2
            id="footer-menu"
            className="text-sm font-semibold text-ink"
          >
            Menu
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {menu.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-ink-muted transition-colors hover:text-accent"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-ink">Kontak</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
            <li className="flex items-start gap-2">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              <a
                href={MAPS.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                {MAPS.shortAddress}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="transition-colors hover:text-accent"
              >
                0896-7428-9400
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <a
                href="mailto:sekarfloristt@gmail.com"
                className="break-all transition-colors hover:text-accent"
              >
                sekarfloristt@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">Pesan lewat</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {shops.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline px-3 py-1.5 text-xs"
                >
                  {label === "Instagram" ? (
                    <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-5">
        <p className="container-x text-center text-xs text-ink-muted">
          &copy; {year} Sekar Floristt. Dibuat oleh{" "}
          <a
            href="https://www.instagram.com/ermikkosatrya/"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            Ermikko Satrya Abimanyu
          </a>
        </p>
      </div>
    </footer>
  );
}
