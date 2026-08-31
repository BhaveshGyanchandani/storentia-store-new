import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { JOURNAL_ARTICLES } from "@/data/journal";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { handleImageError } from "@/lib/images";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const trending = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const featuredArticle = JOURNAL_ARTICLES.find((a) => a.featured) ?? JOURNAL_ARTICLES[0];

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&auto=format&fit=crop&q=80"
          alt="Editorial campaign imagery"
          onError={handleImageError}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/10" />

        <div className="relative container-px flex min-h-[92vh] flex-col justify-end pb-20 pt-40">
          <motion.p
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="eyebrow inline-block bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300 bg-clip-text text-transparent font-bold tracking-widest drop-shadow-[0_1px_3px_rgba(244,63,94,0.3)]"
          >
            Autumn Collection — 2026
          </motion.p>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] text-cream md:text-7xl"
          >
            Considered pieces, worn in — not worn out.
          </motion.h1>
          <motion.p custom={2} initial="hidden" animate="show" variants={fadeUp} className="mt-6 max-w-md text-sm text-cream/75 md:text-base">
            A small, seasonal edit of clothing, footwear and objects — built from materials that age well and last longer than the trend cycle.
          </motion.p>
          <motion.div custom={3} initial="hidden" animate="show" variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <Button size="lg" variant="accent" asChild>
              <Link to="/shop?category=new-arrivals">
                Shop New Arrivals <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-cream hover:bg-cream/10" asChild>
              <Link to="/shop">Explore the Edit</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-px py-24">
        <Reveal className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Shop by Category</p>
            <h2 className="font-display text-3xl md:text-4xl">Find your next favorite</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/shop?category=${cat.id}`} className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-muted">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-center gap-1.5 text-cream">
                  <span className="font-display text-xl">{cat.label}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="container-px py-8">
        <Reveal className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Trending Now</p>
            <h2 className="font-display text-3xl md:text-4xl">This week's favorites</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-1.5 text-sm hover:underline underline-offset-4">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
        <ProductGrid products={trending} />
      </section>

      {/* EDITORIAL */}
      <section className="container-px py-28">
        <div className="grid gap-6 md:grid-cols-2 md:gap-10 items-center">
          <Reveal>
            <Link to={`/journal/${featuredArticle.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src={featuredArticle.heroImage}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </Link>
          </Reveal>
          <Reveal className="md:pl-6">
            <p className="eyebrow mb-4">The Journal — {featuredArticle.category}</p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              {featuredArticle.title}
            </h2>
            <p className="mt-5 max-w-md text-sm text-ink-soft md:text-base">{featuredArticle.deck}</p>
            <Button variant="outline" className="mt-8" asChild>
              <Link to={`/journal/${featuredArticle.slug}`}>Read the Story</Link>
            </Button>
            <div className="mt-10 grid grid-cols-2 gap-4 max-w-sm">
              <div className="aspect-square overflow-hidden rounded-sm">
                <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80" alt="" onError={handleImageError} className="h-full w-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden rounded-sm mt-8">
                <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80" alt="" onError={handleImageError} className="h-full w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-px py-8">
        <Reveal className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Just Landed</p>
            <h2 className="font-display text-3xl md:text-4xl">New Arrivals</h2>
          </div>
          <div className="hidden md:flex items-center gap-5 text-sm text-muted-foreground">
            <Link to="/shop?category=new-arrivals" className="hover:text-ink transition-colors">
              View all
            </Link>
          </div>
        </Reveal>
        <ProductGrid products={newArrivals} columns={4} />
      </section>

      {/* PROMO BANNER */}
      <Reveal>
        <section className="container-px py-24">
          <div className="relative overflow-hidden rounded-sm bg-clay-50">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-10 md:p-16">
                <p className="eyebrow text-clay-600 mb-4">Limited Run</p>
                <h2 className="font-display text-3xl md:text-5xl leading-tight text-ink">
                  Your next favorite piece.
                </h2>
                <p className="mt-5 max-w-sm text-sm text-ink-soft md:text-base">
                  A small capsule of outerwear, cut once and rarely repeated. When it's gone, it's gone.
                </p>
                <Button size="lg" className="mt-8" asChild>
                  <Link to="/shop?category=new-arrivals">
                    Shop the Capsule <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="aspect-[4/3] md:aspect-auto md:h-full">
                <img src="https://images.unsplash.com/photo-1548883354-7622d03aca27?w=1000&auto=format&fit=crop&q=80" alt="" onError={handleImageError} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
