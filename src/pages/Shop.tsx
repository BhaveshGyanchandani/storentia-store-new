import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, ChevronRight, X } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterPanel, DEFAULT_FILTERS, type FilterState } from "@/components/filters/FilterPanel";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" },
];

const PAGE_SIZE = 12;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState("recommended");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);

  const categoryParam = params.get("category");
  const query = params.get("q")?.toLowerCase() ?? "";

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, sort, categoryParam, query]);

  const filtered = useMemo(() => {
    let list = PRODUCTS.slice();

    if (categoryParam === "new-arrivals") {
      list = list.filter((p) => p.isNew);
    } else if (categoryParam) {
      list = list.filter((p) => p.category === categoryParam);
    }

    if (query) {
      list = list.filter(
        (p) => p.productTitle.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query) || p.category.includes(query)
      );
    }

    if (filters.categories.length) list = list.filter((p) => filters.categories.includes(p.category));
    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand));
    list = list.filter((p) => p.sellingPrice >= filters.priceRange[0] && p.sellingPrice <= filters.priceRange[1]);
    if (filters.sizes.length) list = list.filter((p) => p.sizes?.some((s) => filters.sizes.includes(s)));
    if (filters.colors.length) list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    if (filters.minRating) list = list.filter((p) => p.rating >= filters.minRating);
    if (filters.inStockOnly) list = list.filter((p) => p.availability !== "out-of-stock");

    switch (sort) {
      case "newest":
        list = list.slice().sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "price-asc":
        list = list.slice().sort((a, b) => a.sellingPrice - b.sellingPrice);
        break;
      case "price-desc":
        list = list.slice().sort((a, b) => b.sellingPrice - a.sellingPrice);
        break;
      case "rating":
        list = list.slice().sort((a, b) => b.rating - a.rating);
        break;
    }

    return list;
  }, [categoryParam, query, filters, sort]);

  const visible = filtered.slice(0, visibleCount);
  const activeCategory = CATEGORIES.find((c) => c.id === categoryParam);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];
    filters.categories.forEach((c) =>
      chips.push({
        key: `cat-${c}`,
        label: CATEGORIES.find((cat) => cat.id === c)?.label ?? c,
        onRemove: () => setFilters((f) => ({ ...f, categories: f.categories.filter((x) => x !== c) })),
      })
    );
    filters.brands.forEach((b) =>
      chips.push({ key: `brand-${b}`, label: b, onRemove: () => setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) })) })
    );
    filters.sizes.forEach((s) =>
      chips.push({ key: `size-${s}`, label: s, onRemove: () => setFilters((f) => ({ ...f, sizes: f.sizes.filter((x) => x !== s) })) })
    );
    filters.colors.forEach((c) =>
      chips.push({ key: `color-${c}`, label: c, onRemove: () => setFilters((f) => ({ ...f, colors: f.colors.filter((x) => x !== c) })) })
    );
    if (filters.minRating) {
      chips.push({ key: "rating", label: `${filters.minRating}★ & up`, onRemove: () => setFilters((f) => ({ ...f, minRating: 0 })) });
    }
    if (filters.inStockOnly) {
      chips.push({ key: "stock", label: "In stock only", onRemove: () => setFilters((f) => ({ ...f, inStockOnly: false })) });
    }
    if (filters.priceRange[0] !== DEFAULT_FILTERS.priceRange[0] || filters.priceRange[1] !== DEFAULT_FILTERS.priceRange[1]) {
      chips.push({ key: "price", label: "Price", onRemove: () => setFilters((f) => ({ ...f, priceRange: DEFAULT_FILTERS.priceRange })) });
    }
    return chips;
  }, [filters]);

  return (
    <div className="pt-28">
      <div className="container-px">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-ink">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-ink">{activeCategory ? activeCategory.label : query ? `Search: "${query}"` : "Shop All"}</span>
        </div>

        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl">
              {activeCategory ? activeCategory.label : query ? `Results for "${query}"` : "Shop All"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{filtered.length} products</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pb-6 hairline mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden relative">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                {activeFilterChips.length > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                    {activeFilterChips.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" title="Filters">
              <div className="px-6 pb-24 pt-2">
                <FilterPanel filters={filters} onChange={setFilters} onReset={resetFilters} />
              </div>
            </SheetContent>
          </Sheet>

          <span className="hidden lg:block text-xs uppercase tracking-wide text-muted-foreground">
            {filtered.length} results
          </span>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[190px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {activeFilterChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8 -mt-2">
            {activeFilterChips.map((chip) => (
              <button
                key={chip.key}
                onClick={chip.onRemove}
                className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-ink-soft hover:border-ink hover:text-ink transition-colors"
              >
                {chip.label} <X className="h-3 w-3" />
              </button>
            ))}
            <button onClick={resetFilters} className="text-xs text-muted-foreground hover:text-ink underline underline-offset-2 ml-1">
              Clear all
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <FilterPanel filters={filters} onChange={setFilters} onReset={resetFilters} />
          </aside>

          <div>
            <ProductGrid products={visible} loading={loading} />
            {!loading && visibleCount < filtered.length && (
              <div className="mt-14 flex justify-center">
                <Button variant="outline" size="lg" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
