import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import type { Product, CartLine } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { handleImageError } from "@/lib/images";

export function CartItem({ line, product }: { line: CartLine; product: Product }) {
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const toggleWish = useWishlistStore((s) => s.toggle);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 py-5 hairline first:border-t-0 overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-muted">
        <img src={product.productImages[0]} alt={product.productTitle} onError={handleImageError} className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] uppercase text-muted-foreground">{product.brand}</p>
            <Link to={`/product/${product.id}`} className="text-sm font-medium hover:underline truncate block">
              {product.productTitle}
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {[line.color, line.size].filter(Boolean).join(" · ")}
            </p>
          </div>
          <button
            aria-label="Remove"
            onClick={() => removeItem(line.productId, line.size, line.color)}
            className="focus-ring rounded-sm p-1 text-muted-foreground hover:text-ink shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-border rounded-sm">
            <button
              aria-label="Decrease quantity"
              className="p-2 focus-ring hover:bg-muted"
              onClick={() => setQuantity(line.productId, line.size, line.color, line.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-xs">{line.quantity}</span>
            <button
              aria-label="Increase quantity"
              className="p-2 focus-ring hover:bg-muted"
              onClick={() => setQuantity(line.productId, line.size, line.color, line.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{formatPrice(product.sellingPrice * line.quantity)}</p>
            <button
              className="text-[11px] text-muted-foreground hover:text-ink underline-offset-2 hover:underline"
              onClick={() => {
                toggleWish(product.id);
                removeItem(line.productId, line.size, line.color);
              }}
            >
              Move to wishlist
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
