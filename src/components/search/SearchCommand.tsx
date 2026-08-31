import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp, Clock, ArrowUpRight } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { PRODUCTS, TRENDING_SEARCHES } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { handleImageError } from "@/lib/images";

const RECENT_KEY = "maison-recent-searches";

function getRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function pushRecent(term: string) {
  const recent = [term, ...getRecent().filter((t) => t !== term)].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

export function SearchCommand({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setRecent(getRecent());
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter((p) => p.productTitle.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.includes(q)).slice(0, 6);
  }, [query]);

  const goToProduct = (id: string, term: string) => {
    pushRecent(term);
    onOpenChange(false);
    navigate(`/product/${id}`);
  };

  const runSearch = (term: string) => {
    pushRecent(term);
    onOpenChange(false);
    navigate(`/shop?q=${encodeURIComponent(term)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const chosen = results[activeIndex];
      if (chosen) goToProduct(chosen.id, chosen.productTitle);
      else if (query.trim()) runSearch(query.trim());
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/45 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-[12%] z-50 w-[92vw] max-w-xl -translate-x-1/2 rounded-md glass-panel outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <DialogPrimitive.Title className="sr-only">Search</DialogPrimitive.Title>
          <div className="flex items-center gap-3 px-5 py-4 hairline">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search products, brands, categories…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:inline text-[10px] text-muted-foreground border border-border rounded-xs px-1.5 py-0.5">ESC</kbd>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-3">
            {!query.trim() && (
              <div className="space-y-6 px-2 py-2">
                {recent.length > 0 && (
                  <div>
                    <p className="eyebrow mb-3 flex items-center gap-1.5"><Clock className="h-3 w-3" /> Recent Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {recent.map((term) => (
                        <button key={term} onClick={() => runSearch(term)} className="rounded-sm border border-border px-3 py-1.5 text-xs hover:bg-muted transition-colors">
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="eyebrow mb-3 flex items-center gap-1.5"><TrendingUp className="h-3 w-3" /> Trending Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_SEARCHES.map((term) => (
                      <button key={term} onClick={() => runSearch(term)} className="rounded-sm border border-border px-3 py-1.5 text-xs hover:bg-muted transition-colors">
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {query.trim() && results.length === 0 && (
              <p className="px-2 py-8 text-center text-sm text-muted-foreground">No results for "{query}"</p>
            )}

            {results.map((product, i) => (
              <button
                key={product.id}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => goToProduct(product.id, product.productTitle)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-sm p-2.5 text-left transition-colors",
                  activeIndex === i ? "bg-muted" : "hover:bg-muted/60"
                )}
              >
                <img src={product.productImages[0]} alt="" onError={handleImageError} className="h-12 w-10 rounded-xs object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase text-muted-foreground">{product.brand}</p>
                  <p className="truncate text-sm">{product.productTitle}</p>
                </div>
                <span className="text-sm font-medium">{formatPrice(product.sellingPrice)}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
