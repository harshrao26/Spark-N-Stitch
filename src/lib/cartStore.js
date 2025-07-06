// src/lib/cartStore.js
import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: [],
  add: (product) =>
    set((state) => {
      const existing = state.items.find(
        (p) =>
          p._id === product._id &&
          p.selectedSize === product.selectedSize &&
          p.color === product.color
      );

      if (existing) {
        return {
          items: state.items.map((p) =>
            p._id === product._id &&
            p.selectedSize === product.selectedSize &&
            p.color === product.color
              ? { ...p, qty: p.qty + 1 }
              : p
          ),
        };
      }

      return {
        items: [...state.items, { ...product, qty: 1 }],
      };
    }),
  remove: (id) =>
    set((state) => ({ items: state.items.filter((p) => p._id !== id) })),
  updateQty: (id, qty) =>
    set((state) => ({
      items: state.items.map((p) =>
        p._id === id ? { ...p, qty: Math.max(1, qty) } : p
      ),
    })),
  updateSize: (id, size) =>
    set((state) => ({
      items: state.items.map((p) =>
        p._id === id ? { ...p, selectedSize: size } : p
      ),
    })),
  updateColor: (id, color) =>
    set((state) => ({
      items: state.items.map((p) =>
        p._id === id ? { ...p, color } : p
      ),
    })),
  clear: () => set({ items: [] }),
}));
