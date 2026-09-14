import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingCart, Search, Flower2, Heart } from "lucide-react";
import { useCartStore, useCartTotals, useWishlistStore } from "../store/cartStore";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Katalog" },
  { to: "/promo", label: "Promo" },
  { to: "/tentang", label: "Tentang" },
  { to: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { totalItems } = useCartTotals();
  const openCart = useCartStore((s) => s.open);
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const openWishlist = useWishlistStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg py-3"
          : "bg-gradient-to-b from-white/70 to-transparent py-5"
      }`}
    >
      <nav className="container-x flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Flower2 className="w-5 h-5 text-primary" />
          </div>
          <span className="font-serif text-xl md:text-2xl font-semibold text-dark">
            Sekar <span className="text-primary">Floristt</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-dark/70"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            onClick={() => setSearchOpen(true)}
            className="relative"
          >
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-dark/80 hover:text-primary transition-colors"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </button>
          </Link>
          <button
            onClick={openWishlist}
            className="flex p-2 text-dark/80 hover:text-primary transition-colors relative"
            aria-label="Favorit"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <motion.span
                key={wishlistCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-red-400 text-dark rounded-full flex items-center justify-center font-semibold"
              >
                {wishlistCount}
              </motion.span>
            )}
          </button>
          <button
            onClick={openCart}
            className="relative p-2 text-dark/80 hover:text-primary transition-colors"
            aria-label="Keranjang"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-primary text-dark rounded-full flex items-center justify-center font-bold"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-dark/80"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full inset-x-0 px-5 pb-4"
          >
            <div className="glass rounded-2xl p-3 max-w-xl mx-auto">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    window.location.href = `/menu?q=${encodeURIComponent(query)}`;
                  }
                }}
                placeholder="Cari bunga papan, hand bouquet, standing..."
                className="w-full bg-transparent outline-none text-dark placeholder:text-dark/40"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-cream border-l border-dark/10 p-6"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setMobileOpen(false)} className="text-dark/80">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-serif text-dark hover:text-primary transition-colors"
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
