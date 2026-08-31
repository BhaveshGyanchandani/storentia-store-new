import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { JOURNAL_ARTICLES, JOURNAL_CATEGORIES, type JournalCategory } from "@/data/journal";
import { formatArticleDate } from "@/lib/journal-utils";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { cn } from "@/lib/utils";

export default function JournalIndex() {
  const [active, setActive] = useState<"all" | JournalCategory>("all");

  const featured = JOURNAL_ARTICLES.find((a) => a.featured) ?? JOURNAL_ARTICLES[0];
  const rest = JOURNAL_ARTICLES.filter((a) => a.slug !== featured.slug);

  const filtered = useMemo(
    () => (active === "all" ? rest : rest.filter((a) => a.category === active)),
    [active, rest]
  );

  return (
    <div className="pt-28">
      {/* Editorial hero / featured article */}
      <section className="container-px">
        <div className="mb-10">
          <p className="eyebrow mb-3">The Journal</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">
            Notes on materials, making, and buying less — but better.
          </h1>
        </div>

        <Link to={`/journal/${featured.slug}`} className="group grid gap-6 md:grid-cols-2 md:gap-10 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-sm"
          >
            <img
              src={featured.heroImage}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute left-4 top-4">
              <span className="glass-chip rounded-full px-3 py-1 text-[10px] uppercase tracking-widest2 text-ink">
                Featured
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-3">
              {featured.category} · {formatArticleDate(featured.date)}
            </p>
            <h2 className="font-display text-3xl md:text-4xl leading-tight transition-colors group-hover:text-accent">
              {featured.title}
            </h2>
            <p className="mt-4 max-w-md text-sm text-ink-soft md:text-base">{featured.deck}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
              Read the story <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </motion.div>
        </Link>
      </section>

      {/* Category filter */}
      <section className="container-px">
        <div className="flex flex-wrap items-center gap-2 pb-8 mb-8 hairline">
          {JOURNAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs uppercase tracking-wide transition-colors",
                active === cat.id ? "border-ink bg-ink text-cream" : "border-border text-ink-soft hover:border-ink hover:text-ink"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asymmetric editorial grid: first item large, rest standard */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-xl">No stories in this category yet</p>
            <p className="mt-2 text-sm text-muted-foreground">Check back soon, or explore another category.</p>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-14 md:grid-cols-3">
            {filtered.map((article, i) => (
              <div key={article.slug} className={i === 0 ? "md:col-span-2" : ""}>
                <ArticleCard article={article} index={i} size={i === 0 ? "large" : "default"} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* The Edit CTA */}
      <section className="container-px py-28">
        <div className="glass-panel rounded-md p-10 md:p-16 text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4">The Edit</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight">
            Things worth discovering. Delivered occasionally.
          </h2>
          <p className="mt-4 text-sm text-ink-soft md:text-base">
            Our least frequent, most considered newsletter — new stories, small releases, nothing you didn't ask for.
          </p>
          <Link
            to="/the-edit"
            className="mt-7 inline-flex items-center gap-1.5 rounded-sm bg-ink px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-cream hover:bg-ink/88 transition-colors"
          >
            Explore The Edit <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
