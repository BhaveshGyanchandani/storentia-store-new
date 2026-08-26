import { useState } from 'react';
import { useCart } from '../context/CartContext';

export function Checkout() {
  const { items, subtotal } = useCart();
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setPlacing(true);
    // TODO: wire this up to storentia.orders.create(...) once you confirm
    // the exact method name/shape in the "Orders & checkout" docs page.
    await new Promise((res) => setTimeout(res, 800));
    setPlacing(false);
    setPlaced(true);
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold">Thank you 🎉</h1>
        <p className="mt-2 text-black/60">Your order has been placed.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-8 text-2xl font-semibold">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="space-y-4">
        <input
          required
          placeholder="Full name"
          className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm"
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm"
        />
        <input
          required
          placeholder="Shipping address"
          className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            required
            placeholder="City"
            className="rounded-lg border border-black/10 px-4 py-3 text-sm"
          />
          <input
            required
            placeholder="Postal code"
            className="rounded-lg border border-black/10 px-4 py-3 text-sm"
          />
        </div>

        <div className="flex items-center justify-between border-t border-black/10 pt-4 text-sm">
          <span className="text-black/60">{items.length} item(s)</span>
          <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          disabled={placing}
          className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {placing ? 'Placing order…' : 'Place order'}
        </button>
      </form>
    </div>
  );
}
