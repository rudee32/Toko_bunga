import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PageTransition from "../components/PageTransition";
import Tilt from "../components/Tilt";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
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
  const urlQuery = params.get("q") || "";
  const [sort, setSort] = useState("default");

  // The input is driven by local state and mirrored into the URL on a debounce,
  // so typing stays responsive and Back does not walk through every keystroke.
  const [draft, setDraft] = useState(urlQuery);
  const dirty = useRef(false);
  // Read at fire time, not from the closure: the effect only depends on `draft`,
  // so a category change that happens mid-debounce would otherwise be clobbered
  // by a stale `params`.
  const paramsRef = useRef(params);
  paramsRef.current = params;

  useEffect(() => {
    if (!dirty.current) setDraft(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (draft === urlQuery) return;
    const t = setTimeout(() => {
      dirty.current = false;
      const next = new URLSearchParams(paramsRef.current);
      if (draft) next.set("q", draft);
      else next.delete("q");
      setParams(next, { replace: true });
    }, 250);
    return () => clearTimeout(t);
  }, [draft, urlQuery, setParams]);

  const setCat = (cat) => {
    const next = new URLSearchParams(params);
    if (cat === "semua") next.delete("kategori");
    else next.set("kategori", cat);
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCat !== "semua") {
      result = result.filter(
        (p) =>
          p.category === activeCat || p.categoryLabels?.includes(activeCat)
      );
    }
    if (urlQuery) {
      const q = urlQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.categoryLabels?.some((c) => c.includes(q))
      );
    }
    switch (sort) {
      case "termurah":
        return result.sort((a, b) => a.price - b.price);
      case "termahal":
        return result.sort((a, b) => b.price - a.price);
      case "nama":
        return result.sort((a, b) => a.name.localeCompare(b.name, "id"));
      default:
        return result;
    }
  }, [activeCat, urlQuery, sort]);

  const filteredCount = filtered.length;

  return (
    <PageTransition>
      <Tilt className="min-h-dvh pb-20 pt-28 md:pt-32">
        <div className="container-x">
          <SectionHeading
            title="Katalog Produk"
            subtitle="Pilih rangkaian yang paling sesuai, atau request penyesuaian warna dan tulisan sesuai kebutuhan."
          />

          <div className="mx-auto mb-8 flex max-w-3xl flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint"
                aria-hidden="true"
              />
              <label htmlFor="menu-search" className="sr-only">
                Cari produk
              </label>
              <input
                id="menu-search"
                type="search"
                value={draft}
                onChange={(e) => {
                  dirty.current = true;
                  setDraft(e.target.value);
                }}
                placeholder="Cari nama atau kode produk…"
                enterKeyHint="search"
                className="input pl-11 pr-11"
              />
              {draft && (
                <button
                  type="button"
                  onClick={() => {
                    dirty.current = true;
                    setDraft("");
                  }}
                  className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
                  aria-label="Hapus pencarian"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative md:w-56">
              <SlidersHorizontal
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint"
                aria-hidden="true"
              />
              <label htmlFor="menu-sort" className="sr-only">
                Urutkan produk
              </label>
              <select
                id="menu-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input cursor-pointer appearance-none pl-11 pr-9"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            role="group"
            aria-label="Filter kategori"
            className="mb-10 flex flex-wrap justify-center gap-2"
          >
            {categories.map((c) => {
              const on = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  aria-pressed={on}
                  className={`min-h-[40px] rounded-full border px-4 py-2 text-sm transition-colors duration-120 ${
                    on
                      ? "border-accent bg-accent-soft font-semibold text-ink"
                      : "border-line bg-surface text-ink-muted hover:border-accent-soft hover:text-ink"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <p className="mb-5 text-sm text-ink-muted" aria-live="polite">
            Menampilkan {filteredCount} dari {products.length} produk
          </p>

          {filteredCount === 0 ? (
            <div className="card mx-auto max-w-md px-6 py-14 text-center">
              <p className="font-serif text-xl font-semibold text-ink">
                Produk tidak ditemukan
              </p>
              <p className="mt-2 text-sm text-ink-muted">
                Coba kata kunci lain, atau hubungi kami untuk request custom.
              </p>
              <button type="button" onClick={clearAll} className="btn-outline mt-6">
                Reset filter
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <li key={p.id} className="h-full">
                  <ProductCard product={p} index={i} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Tilt>
    </PageTransition>
  );
}
