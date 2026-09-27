import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu as MenuIcon,
  Search,
  ShoppingCart,
  Flower2,
  Heart,
} from "lucide-react";
import Drawer from "./Drawer";
import { useCartStore, useCartTotals, useWishlistStore } from "../store/cartStore";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Katalog" },
  { to: "/promo", label: "Promo" },
  { to: "/tentang", label: "Tentang" },
  { to: "/kontak", label: "Kontak" },
];

function CountBadge({ value, tone = "accent" }) {
  if (value <= 0) return null;
  const tones = {
    accent: "bg-accent text-cream",
    danger: "bg-danger text-cream",
  };
  return (
    <span
      className={`absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-semibold tabular-nums ${tones[tone]}`}
    >
      {value}
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const totalItems = useCartTotals().totalItems;
  const openCart = useCartStore((s) => s.open);
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const openWishlist = useWishlistStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  // Client-side navigation, not a full page load.
  const submitSearch = (event) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/menu?q=${encodeURIComponent(q)}` : "/menu");
    setSearchOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 pt-safe transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "glass shadow-nav"
            : "bg-cream/60 backdrop-blur-sm"
        }`}
      >
        <nav
          aria-label="Utama"
          className="container-x flex items-center justify-between gap-2 py-3.5"
        >
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Sekar Floristt, beranda"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-accent-soft/40 bg-accent-soft/15">
              <Flower2 className="h-5 w-5 text-accent" />
            </span>
            <span className="font-serif text-lg font-semibold text-ink md:text-2xl">
              Sekar <span className="text-accent">Floristt</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `relative py-1 text-sm font-medium transition-colors hover:text-accent ${
                      isActive ? "text-accent" : "text-ink-muted"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                          transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-expanded={searchOpen}
              aria-controls="navbar-search"
              className="btn-icon"
              aria-label="Cari produk"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={openWishlist}
              className="btn-icon relative"
              aria-label={`Favorit${wishlistCount ? `, ${wishlistCount} item` : ""}`}
            >
              <Heart className="h-5 w-5" />
              <CountBadge value={wishlistCount} tone="danger" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="btn-icon relative"
              aria-label={`Keranjang${totalItems ? `, ${totalItems} item` : ""}`}
            >
              <ShoppingCart className="h-5 w-5" />
              <CountBadge value={totalItems} />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="btn-icon lg:hidden"
              aria-label="Buka menu navigasi"
              aria-expanded={mobileOpen}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {searchOpen && (
            <motion.div
              id="navbar-search"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <form
                role="search"
                onSubmit={submitSearch}
                className="container-x pb-3.5"
              >
                <label htmlFor="navbar-search-input" className="sr-only">
                  Cari produk
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="navbar-search-input"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari bunga papan, hand bouquet, standing…"
                    className="input"
                    enterKeyHint="search"
                  />
                  <button type="submit" className="btn-primary shrink-0">
                    Cari
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Rendered through a portal: this lives outside <motion.header>, whose
          transform would otherwise become the containing block for
          `position: fixed` and shrink the overlay to the header's box. */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title="Menu"
        icon={MenuIcon}
        side="right"
        labelId="mobile-nav-title"
        footer={
          <p className="text-xs leading-relaxed text-ink-muted">
            Toko bunga papan, hand bouquet, dan standing di Yogyakarta.
          </p>
        }
      >
        <ul className="space-y-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-[48px] items-center rounded-card px-3 font-serif text-2xl transition-colors ${
                    isActive
                      ? "bg-surface-2 text-accent"
                      : "text-ink hover:bg-surface-2"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}
