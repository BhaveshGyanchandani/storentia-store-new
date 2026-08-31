import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { JOURNAL_ARTICLES } from "@/data/journal";
import { PRODUCTS } from "@/data/products";
import { formatArticleDate } from "@/lib/journal-utils";
import { formatPrice } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const BENEFITS = [
  "New Journal stories before they're linked anywhere else",
  "First look at small, limited releases",
  "Occasional — a handful of emails a year, not a weekly newsletter",
];

export default function TheEdit() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const recentStories = JOURNAL_ARTICLES.slice(0, 3);
  const previewProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Simulated subscription — no backend endpoint exists for this yet.
    setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <div className="pt-28">
      {/* Editorial hero */}
      <section className="container-px pb-16 text-center max-w-2xl mx-auto">
        <p className="eyebrow mb-4">The Edit</p>
        <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-balance">
          Things worth discovering. Delivered occasionally.
        </h1>
        <p className="mt-6 text-sm text-ink-soft md:text-base">
          No weekly noise, no "last chance" urgency emails. Just the stories, materials and small releases we
          think are genuinely worth your inbox — sent when we have something worth saying, not on a schedule.
        </p>
      </section>

      {/* Glass subscription form */}
      <section className="container-px pb-24">
        <div className="glass-panel mx-auto max-w-lg rounded-md p-8 md:p-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink"
                >
                  <Check className="h-6 w-6 text-cream" strokeWidth={2.5} />
                </motion.div>
                <h2 className="mt-5 font-display text-2xl">You're on the list</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll be in touch — occasionally, and always with something worth reading.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="font-display text-xl mb-1">Join The Edit</h2>
                <p className="text-sm text-muted-foreground mb-6">One email address. That's all we need.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="Email address"
                      aria-invalid={status === "error"}
                      className="w-full rounded-sm border border-border bg-cream/70 px-4 py-3.5 text-sm placeholder:text-muted-foreground focus-ring focus:border-ink transition-colors"
                    />
                    {status === "error" && (
                      <p className="mt-2 text-xs text-destructive">Please enter a valid email address.</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-ink py-3.5 text-xs font-medium uppercase tracking-wide text-cream hover:bg-ink/88 transition-colors disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Subscribing…
                      </>
                    ) : (
                      <>
                        Subscribe <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </form>
                <p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <ShieldCheck className="h-3 w-3" /> No spam. Unsubscribe anytime with one click.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b} className="text-center text-xs text-ink-soft px-2">
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* Recent stories preview */}
      <section className="container-px py-16 border-t border-border">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Recent Editorial</p>
            <h2 className="font-display text-3xl md:text-4xl">What we've been writing</h2>
          </div>
          <Link to="/journal" className="hidden md:flex items-center gap-1.5 text-sm hover:underline underline-offset-4">
            Visit the Journal <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
          {recentStories.map((article) => (
            <Link key={article.slug} to={`/journal/${article.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                <img
                  src={article.heroImage}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-4 mb-1.5">{formatArticleDate(article.date)}</p>
              <h3 className="font-display text-lg leading-snug transition-colors group-hover:text-accent">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Product previews */}
      <section className="container-px py-16 border-t border-border">
        <p className="eyebrow mb-3">From the Shop</p>
        <h2 className="font-display text-3xl md:text-4xl mb-10">Currently in the edit</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6">
          {previewProducts.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                <img
                  src={p.productImages[0]}
                  alt={p.productTitle}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-wide text-muted-foreground">{p.brand}</p>
              <p className="text-sm">{p.productTitle}</p>
              <p className="mt-1 text-sm font-medium">{formatPrice(p.sellingPrice)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
