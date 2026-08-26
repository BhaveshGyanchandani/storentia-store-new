import { useEffect, useState } from 'react';
import { storentia } from '../lib/storentia';
import { PageInfo, Product } from '../types/storentia';
import { ProductCard } from '../components/ProductCard';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function load() {
      const { data, pageInfo } = await storentia.products.list({
        status: 'ACTIVE',
        pagination: { page, limit: 12 },
      });
      if (!cancelled) {
        setProducts(data);
        setPageInfo(pageInfo);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-semibold">Shop all</h1>

      {loading ? (
        <p className="text-sm text-black/50">Loading…</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className="mt-10 flex items-center justify-center gap-4 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded-full border border-black/10 px-4 py-2 disabled:opacity-30"
        >
          Previous
        </button>
        <span className="text-black/60">
          Page {page}
          {pageInfo?.totalPages ? ` of ${pageInfo.totalPages}` : ''}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={pageInfo?.totalPages ? page >= pageInfo.totalPages : false}
          className="rounded-full border border-black/10 px-4 py-2 disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
}
