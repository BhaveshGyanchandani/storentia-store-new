import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-black/60">Your cart is empty.</p>
        <Link to="/products" className="mt-4 inline-block text-sm font-medium text-accent">
          Browse products →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-8 text-2xl font-semibold">Your cart</h1>

      <div className="divide-y divide-black/10">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black/5">
              {item.image && (
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-sm text-black/50">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center rounded-full border border-black/10">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1 text-sm"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 text-sm"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-xs text-black/40 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-6">
        <span className="text-sm text-black/60">Subtotal</span>
        <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
      </div>

      <Link
        to="/checkout"
        className="mt-6 block w-full rounded-full bg-ink px-6 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
      >
        Checkout
      </Link>
    </div>
  );
}
