import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import PageTransition from "../components/PageTransition";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import PetalRain from "../three/PetalRain";
import { products, categories } from "../data/products";

const sortOptions = [
  { id: "default", label: "Urutkan" },
  { id: "termurah", label: "Harga Termurah" },
  { id: "termahal", label: "Harga Termahal" },
  { id: "nama", label: "Nama A-Z" },
];

export default function Menu() {
  const [params, setParams] = useSearchParams();
  const activeCat = params.get("kategori") || "semua";
  const searchQuery = params.get("q") || "";
  const [sort, setSort] = useState("default");

  const setCat = (cat) => {
    const newParams = new URLSearchParams(params);
    if (cat === "semua") newParams.delete("kategori");
    else newParams.set("kategori", cat);
    setParams(newParams);
  };

  const setQuery = (q) => {
    const newParams = new URLSearchParams(params);
    if (q) newParams.set("q", q);
    else newParams.delete("q");
    setParams(newParams);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCat !== "semua") {
      result = result.filter(
        (p) =>
          p.category === activeCat || p.categoryLabels?.includes(activeCat)
      );
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.categoryLabels?.some((c) => c.includes(q))
      );
    }
    switch (sort) {
      case "termurah":
        result.sort((a, b) => a.price - b.price);
        break;
      case "termahal":
        result.sort((a, b) => b.price - a.price);
        break;
      case "nama":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return result;
  }, [activeCat, searchQuery, sort]);

  return (
    <PageTransition>
      <section className="relative pt-28 pb-20 min-h-screen">
        <PetalRain count={10} />
        <div className="container-x">
          <SectionHeading
            title="Katalog Produk"
            subtitle="Pilih rangkaian bunga favorit Anda. Tidak cocok? Silakan request sesuai keinginan."
          />

          {/* Search + Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-3xl mx-auto">
            <div className="flex-1 flex items-center gap-2 glass rounded-2xl px-4 py-3">
              <Search className="w-5 h-5 text-primary" />
              <input
                value={searchQuery}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari berdasarkan nama atau kode produk..."
                className="flex-1 bg-transparent outline-none text-dark placeholder:text-dark/40"
              />
            </div>
            <div className="flex items-center gap-2 glass rounded-2xl px-4 py-3">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent outline-none text-dark cursor-pointer text-sm"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id} className="bg-cream">
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  activeCat === c.id
                    ? "bg-primary text-dark font-semibold shadow-glow"
                    : "glass text-dark/70 hover:text-primary hover:border-primary/40"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-dark/60">Produk tidak ditemukan.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
