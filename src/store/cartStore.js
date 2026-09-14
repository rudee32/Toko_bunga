import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id
                  ? { ...i, qty: i.qty + qty, total: (i.qty + qty) * product.price }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...product, qty, total: product.price * qty }],
          };
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      increment: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? { ...i, qty: i.qty + 1, total: (i.qty + 1) * i.price }
              : i
          ),
        })),
      decrement: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id
                ? { ...i, qty: i.qty - 1, total: (i.qty - 1) * i.price }
                : i
            )
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    { name: "sekar-cart" }
  )
);

export const useCartTotals = () => {
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((acc, i) => acc + i.qty, 0);
  const subtotal = items.reduce((acc, i) => acc + i.total, 0);
  return { totalItems, subtotal };
};

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      ids: [],
      isOpen: false,
      toggle: (id) =>
        set((state) => {
          const has = state.ids.includes(id);
          return {
            ids: has ? state.ids.filter((i) => i !== id) : [...state.ids, id],
          };
        }),
      has: (id) => get().ids.includes(id),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    { name: "sekar-wishlist" }
  )
);
