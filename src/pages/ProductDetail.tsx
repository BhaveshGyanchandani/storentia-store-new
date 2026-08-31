import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Heart, Minus, Plus, RefreshCw, Ruler, ShieldCheck, Truck } from "lucide-react";
import { getProductById, getRelatedProducts, getReviewsForProduct } from "@/data/products";
import { cn, formatPrice } from "@/lib/utils";
import { ImageGallery } from "@/components/product/ImageGallery";
import { Rating } from "@/components/product/Rating";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;

  const [size, setSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [color, setColor] = useState(product?.colors[0]?.name);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.open);
  const wished = useWishlistStore((s) => (product ? s.has(product.id) : false));
  const toggleWish = useWishlistStore((s) => s.toggle);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting), {
      rootMargin: "-96px 0px 0px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [product?.id]);

  if (!product) {
    return (
      <div className="container-px py-32 text-center">
        <p className="font-display text-2xl">Product not found</p>
        <Button className="mt-6" onClick={() => navigate("/shop")}>Back to Shop</Button>
      </div>
    );
  }

  const reviews = getReviewsForProduct(product.id);
  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    if (product.sizes && !size) {
      setSizeError(true);
      return;
    }
    addItem(product.id, { size, color, quantity });
    openCart();
    toast.success(`Added ${product.productTitle} to bag`);
  };

  const handleBuyNow = () => {
    if (product.sizes && !size) {
      setSizeError(true);
      return;
    }
    addItem(product.id, { size, color, quantity });
    navigate("/checkout");
  };

  return (
    <div className="pt-28">
      <div className="container-px">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <ImageGallery images={product.productImages} alt={product.productTitle} />

          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.brand}</p>
            <h1 className="mt-2 font-display text-3xl md:text-4xl leading-tight">{product.productTitle}</h1>

            <div className="mt-3 flex items-center gap-3">
              <Rating value={product.rating} count={product.reviewCount} size="md" />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-2xl font-medium">{formatPrice(product.sellingPrice)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <Badge variant="accent">-{product.discount}%</Badge>
                </>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink-soft">{product.productDescription}</p>

            {/* Color selector */}
            <div className="mt-8">
              <p className="text-xs font-medium mb-2.5">Color — <span className="text-muted-foreground">{color}</span></p>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    aria-label={c.name}
                    onClick={() => setColor(c.name)}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 transition-transform hover:scale-110",
                      color === c.name ? "border-accent" : "border-transparent"
                    )}
                    style={{ backgroundColor: c.hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            {product.sizes && (
              <div className="mt-7">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-medium">Size {size && <span className="text-muted-foreground">— {size}</span>}</p>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-ink underline-offset-2 hover:underline">
                    <Ruler className="h-3 w-3" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSize(s);
                        setSizeError(false);
                      }}
                      className={cn(
                        "min-w-[3rem] rounded-sm border px-3 py-2.5 text-xs transition-colors",
                        size === s ? "border-ink bg-ink text-cream" : "border-border hover:border-ink"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {sizeError && <p className="mt-2 text-xs text-destructive">Please select a size to continue.</p>}
              </div>
            )}

            {/* Quantity */}
            <div className="mt-7">
              <p className="text-xs font-medium mb-2.5">Quantity</p>
              <div className="inline-flex items-center border border-border rounded-sm">
                <button className="p-3 hover:bg-muted focus-ring" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button className="p-3 hover:bg-muted focus-ring" onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className="mt-8 flex gap-3">
              <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={product.availability === "out-of-stock"}>
                {product.availability === "out-of-stock" ? "Out of Stock" : "Add to Bag"}
              </Button>
              <button
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggleWish(product.id)}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-border hover:border-ink transition-colors focus-ring"
              >
                <Heart className={cn("h-4.5 w-4.5", wished ? "fill-accent text-accent" : "text-ink")} />
              </button>
            </div>
            <Button variant="outline" size="lg" className="mt-3 w-full" onClick={handleBuyNow} disabled={product.availability === "out-of-stock"}>
              Buy Now
            </Button>

            {product.availability === "low-stock" && (
              <p className="mt-3 text-xs text-accent">Only a few left — order soon.</p>
            )}

            {/* Delivery info */}
            <div className="mt-8 space-y-3 rounded-sm border border-border p-4">
              <div className="flex items-start gap-3">
                <Truck className="h-4 w-4 mt-0.5 shrink-0 text-ink-soft" />
                <p className="text-xs text-ink-soft">Free delivery on orders over ₹5,000. Standard delivery in 3–5 business days.</p>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="h-4 w-4 mt-0.5 shrink-0 text-ink-soft" />
                <p className="text-xs text-ink-soft">30-day returns on unworn items with original tags attached.</p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-ink-soft" />
                <p className="text-xs text-ink-soft">Secure checkout with UPI, cards and cash on delivery.</p>
              </div>
            </div>

            {/* Accordion details */}
            <div className="mt-8">
              <Accordion type="multiple" defaultValue={["details"]}>
                <AccordionItem value="details">
                  <AccordionTrigger>Product Details</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1.5 list-disc pl-4">
                      {product.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="reviews">
                  <AccordionTrigger>Reviews ({reviews.length})</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-5">
                      {reviews.map((r) => (
                        <div key={r.id} className="hairline pt-4 first:border-t-0 first:pt-0">
                          <div className="flex items-center justify-between">
                            <Rating value={r.rating} />
                            <span className="text-xs text-muted-foreground">{r.date}</span>
                          </div>
                          <p className="mt-2 text-sm font-medium text-ink">{r.title}</p>
                          <p className="mt-1 text-sm text-ink-soft">{r.body}</p>
                          <p className="mt-1.5 text-xs text-muted-foreground">
                            {r.author} {r.verified && "· Verified Purchase"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <RelatedProducts products={related} />

      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-surface fixed inset-x-0 bottom-0 z-30 shadow-lift"
          >
            <div className="container-px flex items-center justify-between gap-4 py-3.5">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={product.productImages[0]}
                  alt=""
                  className="hidden h-11 w-9 shrink-0 rounded-xs object-cover sm:block"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{product.productTitle}</p>
                  <p className="text-sm text-ink-soft">{formatPrice(product.sellingPrice)}</p>
                </div>
              </div>
              <Button
                size="md"
                onClick={handleAddToCart}
                disabled={product.availability === "out-of-stock"}
                className="shrink-0"
              >
                {product.availability === "out-of-stock" ? "Out of Stock" : "Add to Bag"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
