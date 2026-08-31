import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { JournalArticle } from "@/data/journal";
import { formatArticleDate } from "@/lib/journal-utils";
import { handleImageError } from "@/lib/images";

export function ArticleCard({
  article,
  index = 0,
  size = "default",
}: {
  article: JournalArticle;
  index?: number;
  size?: "default" | "large";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/journal/${article.slug}`} className="group block">
        <div
          className={`relative overflow-hidden rounded-sm bg-muted ${
            size === "large" ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <img
            src={article.heroImage}
            alt=""
            loading="lazy"
            onError={handleImageError}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute left-4 top-4">
            <span className="glass-chip rounded-full px-3 py-1 text-[10px] uppercase tracking-widest2 text-ink">
              {article.category}
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow mb-2">
              {formatArticleDate(article.date)} · {article.readingMinutes} min read
            </p>
            <h3
              className={`font-display leading-snug text-ink transition-colors group-hover:text-accent ${
                size === "large" ? "text-2xl md:text-3xl" : "text-lg"
              }`}
            >
              {article.title}
            </h3>
            {size === "large" && (
              <p className="mt-2 max-w-md text-sm text-ink-soft">{article.deck}</p>
            )}
          </div>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </motion.div>
  );
}
