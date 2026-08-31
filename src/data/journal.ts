// Local editorial content for the Journal section.
//
// This is intentionally isolated from the product data/API layer — it's
// demonstration content for the UI only. Article bodies are plain
// paragraph arrays so they're trivial to swap for real CMS/API content
// later without touching any component that renders them.

export type JournalCategory = "Design" | "Stories" | "Guides" | "Materials" | "Culture";

export interface JournalArticle {
  slug: string;
  category: JournalCategory;
  title: string;
  deck: string;
  author: string;
  date: string; // ISO
  readingMinutes: number;
  heroImage: string;
  featured?: boolean;
  body: string[];
  relatedProductIds: string[];
}

export const JOURNAL_CATEGORIES: { id: "all" | JournalCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Design", label: "Design" },
  { id: "Stories", label: "Stories" },
  { id: "Guides", label: "Guides" },
  { id: "Materials", label: "Materials" },
  { id: "Culture", label: "Culture" },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "the-art-of-buying-less-but-better",
    category: "Stories",
    title: "The Art of Buying Less, But Better",
    deck: "A case against the trend cycle — and for the twelve pieces you'll actually wear for a decade.",
    author: "Naina Rao",
    date: "2026-08-14",
    readingMinutes: 6,
    heroImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&auto=format&fit=crop&q=80",
    featured: true,
    body: [
      "Somewhere between the third fast-fashion haul video and the fourth wardrobe clear-out, it becomes worth asking a different question — not \"what's new\" but \"what lasts.\"",
      "Buying less but better isn't a restriction so much as a redirection of attention: toward construction, toward materials that age instead of degrading, toward the handful of silhouettes that quietly work with everything else you own.",
      "We built our own edit around this idea. A wool-blend overcoat that gets better with each winter. A pair of leather boots that soften rather than fall apart. None of it is designed to be replaced next season — that's the entire point.",
      "The upfront cost is usually higher. The cost per wear, measured over years rather than weeks, almost never is.",
    ],
    relatedProductIds: ["p01", "p03", "p09"],
  },
  {
    slug: "materials-that-age-well-not-worse",
    category: "Materials",
    title: "Materials That Age Well, Not Worse",
    deck: "Vegetable-tanned leather, raw denim, and the mills we return to season after season.",
    author: "Devika Iyer",
    date: "2026-07-30",
    readingMinutes: 8,
    heroImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&auto=format&fit=crop&q=80",
    featured: true,
    body: [
      "Most materials are chosen for how they look on day one. We choose ours for how they look in year three.",
      "Vegetable-tanned leather is the clearest example — it darkens, develops a patina, and genuinely improves with handling. The same goes for raw selvedge denim, which fades exactly where you live in it, tracing the shape of your days back at you.",
      "This season we spent time with a small tannery that's used the same slow, plant-based tanning process for three generations. It takes weeks longer than chrome tanning. You can tell.",
    ],
    relatedProductIds: ["p01", "p14", "p19"],
  },
  {
    slug: "a-guide-to-building-a-capsule-wardrobe",
    category: "Guides",
    title: "A Guide to Building a Capsule Wardrobe",
    deck: "Fifteen pieces, endless combinations — a practical starting framework, not a rulebook.",
    author: "Rohan Mehta",
    date: "2026-07-18",
    readingMinutes: 7,
    heroImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1600&auto=format&fit=crop&q=80",
    body: [
      "A capsule wardrobe isn't about owning less for its own sake — it's about owning things that combine well, so getting dressed stops being a daily negotiation.",
      "Start with a neutral base: one coat, two trousers, three tops that all work together. Add one considered accent piece. Resist the urge to fill every gap immediately — the best capsules are built over a year, not a weekend.",
      "The test isn't how the wardrobe looks on a shelf. It's whether you can put together something you like in under two minutes on a bad morning.",
    ],
    relatedProductIds: ["p02", "p05", "p11"],
  },
  {
    slug: "the-quiet-return-of-considered-tailoring",
    category: "Culture",
    title: "The Quiet Return of Considered Tailoring",
    deck: "Why structure is having a moment again, and what that means beyond the office.",
    author: "Naina Rao",
    date: "2026-06-22",
    readingMinutes: 5,
    heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&auto=format&fit=crop&q=80",
    body: [
      "After a few years of near-total softness — the loungewear era, the oversized everything era — tailoring is finding its way back into ordinary wardrobes, minus the stiffness.",
      "It's a different kind of structure than a decade ago: fluid rather than boxy, worn with trainers as often as with dress shoes. The formality has been kept; the friction has been designed out.",
    ],
    relatedProductIds: ["p01", "p07", "p12"],
  },
  {
    slug: "inside-the-workshop-how-a-sneaker-is-built",
    category: "Design",
    title: "Inside the Workshop: How a Sneaker Is Built",
    deck: "From last to lining — a walk through the twenty-two steps behind one pair of trainers.",
    author: "Farhan Qureshi",
    date: "2026-06-05",
    readingMinutes: 9,
    heroImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1600&auto=format&fit=crop&q=80",
    body: [
      "A sneaker looks simple. It rarely is. The pair we followed through production passed through twenty-two distinct steps, from the initial last-shaping to the final quality pass under daylight-balanced lamps.",
      "What struck us most was how much of the process is still manual — hand-buffing edges, hand-checking stitch tension — even on a shoe built at meaningful scale. Good construction doesn't disappear just because a process scales up.",
    ],
    relatedProductIds: ["p04", "p16", "p20"],
  },
  {
    slug: "small-batch-the-case-for-limited-runs",
    category: "Design",
    title: "Small Batch: The Case for Limited Runs",
    deck: "Why we cut some pieces once, in small numbers, and never repeat them.",
    author: "Devika Iyer",
    date: "2026-05-19",
    readingMinutes: 4,
    heroImage: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1600&auto=format&fit=crop&q=80",
    body: [
      "Limited runs get treated as a marketing device, but for us they started as a practical constraint: some fabrics simply aren't available in volume. A small-batch run is often the only honest way to work with them.",
      "There's a side effect we didn't expect — pieces that exist in smaller numbers seem to get worn more, not less. Scarcity, it turns out, is a decent antidote to the impulse to keep shopping.",
    ],
    relatedProductIds: ["p09", "p17", "p23"],
  },
];

export function getArticleBySlug(slug: string) {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: JournalArticle, count = 3) {
  return JOURNAL_ARTICLES.filter(
    (a) => a.slug !== article.slug && (a.category === article.category || a.relatedProductIds.some((id) => article.relatedProductIds.includes(id)))
  ).slice(0, count);
}
