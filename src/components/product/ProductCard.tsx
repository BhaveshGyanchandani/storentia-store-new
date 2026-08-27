import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { cn, formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist";
import { useCartStore } from "@/store/cart";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [hovered, setHovered] = useState(false);
  const wished = useWishlistStore((s) => s.has(product.id));
  const toggleWish = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);

  const secondImage = product.images[1] ?? product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-sm">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out",
              hovered && "opacity-0 scale-105"
            )}
          />
          <img
            src={secondImage}
            alt=""
            aria-hidden
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover scale-105 transition-all duration-700 ease-out opacity-0",
              hovered && "opacity-100 scale-100"
            )}
          />

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="default">New</Badge>}
            {product.discount && <Badge variant="accent">-{product.discount}%</Badge>}
          </div>

          <button
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              toggleWish(product.id);
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 backdrop-blur focus-ring transition-transform hover:scale-105"
          >
            <motion.span animate={wished ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.35 }}>
              <Heart className={cn("h-4 w-4", wished ? "fill-accent text-accent" : "text-ink")} />
            </motion.span>
          </button>

          <div
            className={cn(
              "absolute inset-x-3 bottom-3 transition-all duration-300",
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
            )}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product.id, { size: product.sizes?.[Math.floor(product.sizes.length / 2)], quantity: 1 });
                openCart();
                toast.success(`Added ${product.name} to bag`);
              }}
              className="flex w-full items-center justify-center gap-1.5 bg-ink py-3 text-xs font-medium uppercase tracking-wide text-cream focus-ring rounded-sm hover:bg-ink/85 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" /> Quick Add
            </button>
          </div>
        </div>

        <div className="mt-3.5 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground truncate">{product.brand}</p>
            <h3 className="mt-0.5 text-sm text-ink truncate">{product.name}</h3>
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
