import { Component, Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import WhatsAppFab from "./components/WhatsAppFab";
import ScrollToTop from "./components/ScrollToTop";
import PageSkeleton from "./components/PageSkeleton";

const Home = lazy(() => import("./pages/Home"));
const Menu = lazy(() => import("./pages/Menu"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Promo = lazy(() => import("./pages/Promo"));
const Tentang = lazy(() => import("./pages/Tentang"));
const Kontak = lazy(() => import("./pages/Kontak"));

class RouteBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[App] render failed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="grid min-h-[70vh] place-items-center px-6 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="font-serif text-3xl font-semibold text-ink">
              Halaman ini belum bisa dibuka
            </h1>
            <p className="text-ink-muted">
              Terjadi kesalahan saat memuat bagian ini. Coba muat ulang, atau
              hubungi kami langsung lewat WhatsApp.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Muat ulang
              </button>
              <a href="/menu" className="btn-ghost">
                Ke katalog
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-dvh flex-col bg-cream text-ink">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <RouteBoundary>
          <Suspense fallback={<PageSkeleton />}>
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:id" element={<ProductDetail />} />
                <Route path="/promo" element={<Promo />} />
                <Route path="/tentang" element={<Tentang />} />
                <Route path="/kontak" element={<Kontak />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </RouteBoundary>
      </main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <WhatsAppFab />
    </div>
  );
}
