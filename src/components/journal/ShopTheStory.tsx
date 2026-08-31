import type { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";

export function ShopTheStory({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="border-t border-border pt-14">
      <p className="eyebrow mb-3">Shop the Story</p>
      <h2 className="font-display text-2xl md:text-3xl mb-8">Featured in this piece</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
