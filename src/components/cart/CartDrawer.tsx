import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useCartTotals } from "@/store/cart";
import { CartItem } from "./CartItem";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, subtotal, shipping, total } = useCartTotals();
  const close = useCartStore((s) => s.close);

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        <div>
          <p className="font-display text-lg">Your bag is empty</p>
          <p className="mt-1 text-sm text-muted-foreground">Add something you'll love.</p>
        </div>
        <Button variant="outline" onClick={close} asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6">
        {items.map(({ line, product }) => (
          <CartItem key={`${line.productId}-${line.size}-${line.color}`} line={line} product={product!} />
        ))}
      </div>
      <div className="border-t border-border px-6 py-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-base font-medium pt-1">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <Button size="lg" className="w-full mt-2" onClick={close} asChild>
          <Link to="/checkout">Checkout</Link>
        </Button>
        <button onClick={close} className="w-full text-center text-xs text-muted-foreground hover:text-ink underline-offset-2 hover:underline pt-1">
          or continue shopping
        </button>
      </div>
    </div>
  );
}
