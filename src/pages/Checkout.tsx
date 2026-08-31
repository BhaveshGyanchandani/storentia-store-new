import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Landmark, Smartphone, Truck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useCartTotals } from "@/store/cart";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { handleImageError } from "@/lib/images";

const STEPS = ["Contact", "Shipping", "Payment"] as const;

export default function Checkout() {
  const { items, subtotal, shipping, total } = useCartTotals();
  const clearCart = useCartStore((s) => s.clear);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("upi");
  const [delivery, setDelivery] = useState("standard");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="pt-28">
        <div className="container-px py-24 text-center">
          <h1 className="font-display text-2xl">Your bag is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">Add something before checking out.</p>
          <Button className="mt-7" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "MAISON10") {
      setDiscount(Math.round(subtotal * 0.1));
      toast.success("Promo code applied — 10% off");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const deliveryFee = delivery === "express" ? 349 : shipping;
  const grandTotal = subtotal + deliveryFee - discount;

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const orderNumber = `MSN-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      navigate("/order-success", { state: { orderNumber, total: grandTotal } });
    }, 900);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="container-px">
        <h1 className="font-display text-3xl md:text-4xl mb-2">Checkout</h1>
        <div className="flex items-center gap-2 mb-10 text-xs text-muted-foreground">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className={i <= step ? "text-ink font-medium" : ""}>{s}</span>
              {i < STEPS.length - 1 && <span className="opacity-40">—</span>}
            </div>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          <div className="space-y-10">
            {/* Contact */}
            <section>
              <h2 className="font-display text-xl mb-5">1. Contact Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Full Name</Label>
                  <Input placeholder="Bhavesh Gyanchandani" defaultValue="Bhavesh Gyanchandani" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@email.com" defaultValue="bhaveshgyanchandanip1@gmail.com" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="+91 98765 43210" defaultValue="+91 98765 43210" />
                </div>
              </div>
            </section>

            <Separator />

            {/* Shipping */}
            <section>
              <h2 className="font-display text-xl mb-5">2. Shipping Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label>Address</Label>
                  <Input placeholder="Street address" defaultValue="14 Residency Road" />
                </div>
                <div>
                  <Label>City</Label>
                  <Input placeholder="City" defaultValue="Jaipur" />
                </div>
                <div>
                  <Label>State</Label>
                  <Input placeholder="State" defaultValue="Rajasthan" />
                </div>
                <div>
                  <Label>PIN Code</Label>
                  <Input placeholder="302001" defaultValue="302001" />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input defaultValue="India" disabled />
                </div>
              </div>

              <div className="mt-7">
                <Label>Delivery Method</Label>
                <RadioGroup value={delivery} onValueChange={setDelivery} className="mt-2 space-y-3">
                  <label className="flex items-center justify-between rounded-sm border border-border p-4 cursor-pointer has-[[data-state=checked]]:border-ink">
                    <span className="flex items-center gap-3">
                      <RadioGroupItem value="standard" />
                      <span>
                        <span className="block text-sm">Standard Delivery</span>
                        <span className="block text-xs text-muted-foreground">3–5 business days</span>
                      </span>
                    </span>
                    <span className="text-sm">{subtotal >= 5000 ? "Free" : formatPrice(199)}</span>
                  </label>
                  <label className="flex items-center justify-between rounded-sm border border-border p-4 cursor-pointer has-[[data-state=checked]]:border-ink">
                    <span className="flex items-center gap-3">
                      <RadioGroupItem value="express" />
                      <span>
                        <span className="block text-sm">Express Delivery</span>
                        <span className="block text-xs text-muted-foreground">1–2 business days</span>
                      </span>
                    </span>
                    <span className="text-sm">{formatPrice(349)}</span>
                  </label>
                </RadioGroup>
              </div>
            </section>

            <Separator />

            {/* Payment */}
            <section>
              <h2 className="font-display text-xl mb-5">3. Payment Method</h2>
              <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
                <label className="flex items-center gap-3 rounded-sm border border-border p-4 cursor-pointer has-[[data-state=checked]]:border-ink">
                  <RadioGroupItem value="upi" />
                  <Smartphone className="h-4 w-4 text-ink-soft" />
                  <span className="text-sm">UPI</span>
                </label>
                {payment === "upi" && (
                  <div className="pl-11 -mt-2">
                    <Input placeholder="yourname@upi" />
                  </div>
                )}
                <label className="flex items-center gap-3 rounded-sm border border-border p-4 cursor-pointer has-[[data-state=checked]]:border-ink">
                  <RadioGroupItem value="card" />
                  <CreditCard className="h-4 w-4 text-ink-soft" />
                  <span className="text-sm">Credit / Debit Card</span>
                </label>
                {payment === "card" && (
                  <div className="pl-11 -mt-2 grid gap-3 sm:grid-cols-2">
                    <Input placeholder="Card number" className="sm:col-span-2" />
                    <Input placeholder="MM / YY" />
                    <Input placeholder="CVC" />
                  </div>
                )}
                <label className="flex items-center gap-3 rounded-sm border border-border p-4 cursor-pointer has-[[data-state=checked]]:border-ink">
                  <RadioGroupItem value="cod" />
                  <Landmark className="h-4 w-4 text-ink-soft" />
                  <span className="text-sm">Cash on Delivery</span>
                </label>
              </RadioGroup>
              <p className="mt-3 text-xs text-muted-foreground">
                This is a frontend demonstration — no real payment is processed.
              </p>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-sm border border-border p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-lg mb-5">Order Summary</h2>
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {items.map(({ line, product }) => (
                <div key={`${line.productId}-${line.size}-${line.color}`} className="flex gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xs bg-muted">
                    <img src={product!.productImages[0]} alt="" onError={handleImageError} className="h-full w-full object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-cream">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{product!.productTitle}</p>
                    <p className="text-xs text-muted-foreground">{[line.color, line.size].filter(Boolean).join(" · ")}</p>
                  </div>
                  <span className="text-sm">{formatPrice(product!.sellingPrice * line.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <Input placeholder="Discount code" value={promo} onChange={(e) => setPromo(e.target.value)} />
              <Button variant="outline" onClick={applyPromo}>Apply</Button>
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">Try "MAISON10" for 10% off</p>

            <Separator className="my-5" />

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-accent">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-medium">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <Button size="lg" className="mt-6 w-full" onClick={placeOrder} disabled={placing}>
              {placing ? "Placing Order…" : "Place Order"}
            </Button>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Truck className="h-3 w-3" /> Estimated delivery: {delivery === "express" ? "1–2" : "3–5"} business days
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
