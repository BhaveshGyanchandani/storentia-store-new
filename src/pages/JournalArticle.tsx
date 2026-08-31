import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { getArticleBySlug, getRelatedArticles } from "@/data/journal";
import { getProductById } from "@/data/products";
import { formatArticleDate } from "@/lib/journal-utils";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { ShopTheStory } from "@/components/journal/ShopTheStory";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { handleImageError } from "@/lib/images";

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(100, (doc.scrollTop / scrollable) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-40 h-[2px] w-full bg-transparent">
      <div className="h-full bg-accent transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default function JournalArticlePage() {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="pt-28">
        <div className="container-px py-24 text-center">
          <p className="font-display text-2xl">Story not found</p>
          <Button className="mt-6" asChild>
            <Link to="/journal">Back to Journal</Link>
          </Button>
        </div>
      </div>
    );
  }

  const related = getRelatedArticles(article);
  const relatedProducts = article.relatedProductIds
    .map(getProductById)
    .filter((p): p is Product => Boolean(p));

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, url });
        return;
      } catch {
        // fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  return (
    <div className="pt-28">
      <ReadingProgress />

      <article className="container-px max-w-3xl mx-auto">
        <Link to="/journal" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-ink mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Journal
        </Link>

        <p className="eyebrow mb-4">{article.category}</p>
        <h1 className="font-display text-4xl md:text-5xl leading-[1.08]">{article.title}</h1>
        <p className="mt-5 text-base text-ink-soft md:text-lg">{article.deck}</p>

        <div className="mt-6 flex items-center justify-between border-y border-border py-4">
          <div className="text-xs text-muted-foreground">
            <span className="text-ink font-medium">{article.author}</span> · {formatArticleDate(article.date)} ·{" "}
            {article.readingMinutes} min read
          </div>
          <button
            onClick={handleShare}
            aria-label="Share this story"
            className="flex items-center gap-1.5 rounded-sm p-2 -mr-2 text-muted-foreground hover:text-ink hover:bg-muted transition-colors focus-ring"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 aspect-[16/9] overflow-hidden rounded-sm"
        >
          <img src={article.heroImage} alt="" onError={handleImageError} className="h-full w-full object-cover" />
        </motion.div>

        <div className="prose-content mt-10 space-y-5 text-[15px] leading-relaxed text-ink-soft md:text-base">
          {article.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <div className="container-px max-w-3xl mx-auto mt-16">
        <ShopTheStory products={relatedProducts} />
      </div>

      {related.length > 0 && (
        <section className="container-px py-20">
          <h2 className="font-display text-2xl md:text-3xl mb-8">More from the Journal</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
            {related.map((a, i) => (
              <ArticleCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="container-px pb-28">
        <div className="glass-panel rounded-md p-10 md:p-14 text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4">The Edit</p>
          <h2 className="font-display text-2xl md:text-3xl leading-tight">
            Enjoyed this? We send stories like it occasionally.
          </h2>
          <Link
            to="/the-edit"
            className="mt-6 inline-flex items-center gap-1.5 rounded-sm bg-ink px-6 py-3.5 text-xs font-medium uppercase tracking-wide text-cream hover:bg-ink/88 transition-colors"
          >
            Join The Edit <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
