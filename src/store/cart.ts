import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "@/types";
import { getProductById } from "@/data/products";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  lastAdded: string | null;
  open: () => void;
  close: () => void;
  addItem: (productId: string, opts?: { size?: string; color?: string; quantity?: number }) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  setQuantity: (productId: string, size: string | undefined, color: string | undefined, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      lastAdded: null,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addItem: (productId, opts) => {
        const { size, color, quantity = 1 } = opts ?? {};
        const lines = [...get().lines];
        const idx = lines.findIndex((l) => l.productId === productId && l.size === size && l.color === color);
        if (idx >= 0) {
          lines[idx] = { ...lines[idx], quantity: lines[idx].quantity + quantity };
        } else {
          lines.push({ productId, quantity, size, color });
        }
        set({ lines, lastAdded: productId });
      },
      removeItem: (productId, size, color) => {
        set({ lines: get().lines.filter((l) => !(l.productId === productId && l.size === size && l.color === color)) });
      },
      setQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.productId === productId && l.size === size && l.color === color ? { ...l, quantity } : l
          ),
        });
      },
      clear: () => set({ lines: [] }),
    }),
    { name: "maison-cart" }
  )
);

export function useCartTotals() {
  const lines = useCartStore((s) => s.lines);
  const items = lines
    .map((line) => ({ line, product: getProductById(line.productId) }))
    .filter((x) => x.product);
  const subtotal = items.reduce((sum, x) => sum + (x.product!.price * x.line.quantity), 0);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 199;
  return { items, subtotal, count, shipping, total: subtotal + shipping };
}
