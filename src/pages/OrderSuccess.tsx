import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface LocationState {
  orderNumber?: string;
  total?: number;
}

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state ?? {}) as LocationState;

  useEffect(() => {
    if (!state.orderNumber) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.orderNumber) return null;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);

  return (
    <div className="pt-28 pb-24">
      <div className="container-px max-w-lg mx-auto text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink"
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.35, type: "spring", stiffness: 300 }}>
            <Check className="h-7 w-7 text-cream" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
          <h1 className="mt-7 font-display text-3xl md:text-4xl">Order confirmed</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Thank you — we've received your order and are getting it ready.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-10 rounded-sm border border-border p-6 text-left"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Order Number</p>
              <p className="font-medium">{state.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Order Total</p>
              <p className="font-medium">{state.total ? formatPrice(state.total) : "—"}</p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
            <Package className="h-4 w-4 text-ink-soft shrink-0" />
            <p className="text-sm text-ink-soft">
              Estimated delivery by{" "}
              <span className="font-medium text-ink">
                {deliveryDate.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric" })}
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/account/orders">View Order</Link>
          </Button>
          <Button size="lg" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
