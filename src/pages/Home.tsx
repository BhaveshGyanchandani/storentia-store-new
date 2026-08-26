import { useEffect, useState } from 'react';
import { storentia } from '../lib/storentia';
import { Product } from '../types/storentia';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data } = await storentia.products.list({
          status: 'ACTIVE',
          pagination: { page: 1, limit: 4 },
        });
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError('Could not load products. Check your API keys in .env.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Good design, sold simply.</h1>
        <p className="mx-auto mt-4 max-w-md text-black/60">
          A small storefront built on Storentia — browse the collection and check out in a
          couple of clicks.
        </p>
      </section>

      <h2 className="mb-6 text-lg font-medium">Featured</h2>

      {loading && <p className="text-sm text-black/50">Loading products…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
