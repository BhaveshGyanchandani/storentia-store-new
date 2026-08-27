import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

export function RelatedProducts({ products, title = "You may also like" }: { products: Product[]; title?: string }) {
  if (products.length === 0) return null;
  return (
    <section className="container-px py-20">
      <h2 className="font-display text-2xl md:text-3xl mb-8">{title}</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
