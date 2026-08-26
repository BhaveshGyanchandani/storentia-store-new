import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { storentia } from '../lib/storentia';
import { Product, ProductVariant } from '../types/storentia';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      const p = await storentia.products.get(id as string);
      if (!cancelled) {
        setProduct(p);
        setSelectedVariant(p.variants?.[0] ?? null);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!product) {
    return <p className="mx-auto max-w-6xl px-6 py-16 text-sm text-black/50">Loading…</p>;
  }

  const price = selectedVariant?.price ?? product.price;

  function handleAddToCart() {
    if (!product) return;
    addItem({
      id: selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id,
      productId: product.id,
      variantId: selectedVariant?.id,
      title: selectedVariant ? `${product.title} — ${selectedVariant.title}` : product.title,
      price,
      quantity,
      image: product.images?.[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
      <div className="aspect-square overflow-hidden rounded-2xl bg-black/5">
        {product.images?.[0] && (
          <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
        )}
      </div>

      <div>
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="mt-2 text-lg text-black/70">
          {product.currency} {price.toFixed(2)}
        </p>
        {product.description && (
          <p className="mt-6 text-sm leading-relaxed text-black/60">{product.description}</p>
        )}

        {product.variants && product.variants.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Options</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  disabled={!v.available}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    selectedVariant?.id === v.id
                      ? 'border-accent bg-accent text-white'
                      : 'border-black/10 hover:border-black/30'
                  } disabled:cursor-not-allowed disabled:opacity-30`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center rounded-full border border-black/10">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-sm"
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2 text-sm">
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
