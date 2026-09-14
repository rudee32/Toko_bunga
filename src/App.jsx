import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import WhatsAppFab from "./components/WhatsAppFab";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const Menu = lazy(() => import("./pages/Menu"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Promo = lazy(() => import("./pages/Promo"));
const Tentang = lazy(() => import("./pages/Tentang"));
const Kontak = lazy(() => import("./pages/Kontak"));

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-cream text-dark flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/menu/:id" element={<ProductDetail />} />
              <Route path="/promo" element={<Promo />} />
              <Route path="/tentang" element={<Tentang />} />
              <Route path="/kontak" element={<Kontak />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <WhatsAppFab />
    </div>
  );
}
