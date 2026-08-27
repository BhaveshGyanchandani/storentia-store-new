import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductGrid({ products, loading, columns = 4 }: { products: Product[]; loading?: boolean; columns?: 3 | 4 }) {
  if (loading) {
    return (
      <div className={`grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-[4/5] w-full" />
            <Skeleton className="mt-3.5 h-3 w-2/3" />
            <Skeleton className="mt-2 h-3 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-xl">No products found</p>
        <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
