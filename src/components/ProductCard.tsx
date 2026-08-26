import { Link } from 'react-router-dom';
import { Product } from '../types/storentia';

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden bg-black/5">
        {image ? (
          <img
            src={image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-black/40">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium">{product.title}</h3>
        <p className="mt-1 text-sm text-black/60">
          {product.currency} {product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
