import { Link } from "react-router-dom";
import { Instagram, ShoppingBag, Truck, Flower2, MapPin, Phone, Mail } from "lucide-react";
import { SOCIALS } from "../utils/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-dark/10 bg-cream">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container-x py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Flower2 className="w-4 h-4 text-primary" />
            </div>
            <span className="font-serif text-xl font-semibold">
              Sekar <span className="text-primary">Floristt</span>
            </span>
          </div>
          <p className="text-sm text-dark/60 leading-relaxed">
            Toko bunga terpercaya di Yogyakarta. Menyediakan bunga papan,
            hand bouquet, vas meja, dan standing berkualitas tinggi.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-primary">Menu</h4>
          <div className="flex flex-col gap-3 text-sm text-dark/70">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/menu" className="hover:text-primary transition-colors">Katalog</Link>
            <Link to="/promo" className="hover:text-primary transition-colors">Promo</Link>
            <Link to="/tentang" className="hover:text-primary transition-colors">Tentang</Link>
            <Link to="/kontak" className="hover:text-primary transition-colors">Kontak</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-primary">Kontak</h4>
          <div className="flex flex-col gap-3 text-sm text-dark/70">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Yogyakarta, Indonesia</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> 0896-7428-9400</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> sekarfloristt@gmail.com</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-primary">Ikuti Kami</h4>
          <div className="flex gap-3">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full glass text-dark/80 hover:text-primary transition-all hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={SOCIALS.shopee}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full glass text-dark/80 hover:text-primary transition-all hover:scale-110"
              aria-label="Shopee"
            >
              <ShoppingBag className="w-5 h-5" />
            </a>
            <a
              href={SOCIALS.tokopedia}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-full glass text-dark/80 hover:text-primary transition-all hover:scale-110"
              aria-label="Tokopedia"
            >
              <Truck className="w-5 h-5" />
            </a>
          </div>
          <p className="text-xs text-dark/50 mt-4">
            Pesan mudah via WhatsApp / marketplace.
          </p>
        </div>
      </div>

      <div className="border-t border-dark/10 py-5">
        <p className="text-center text-xs text-dark/50">
          Created by{" "}
          <a
            href="https://www.instagram.com/ermikkosatrya/"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            Ermikko Satrya Abimanyu
          </a>{" "}
          | &copy; 2024 Sekar Floristt.
        </p>
      </div>
    </footer>
  );
}
