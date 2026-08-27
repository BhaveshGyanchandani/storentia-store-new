import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Rating } from "@/components/product/Rating";
import { BRANDS, CATEGORIES } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  minRating: number;
  inStockOnly: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  brands: [],
  priceRange: [0, 25000],
  sizes: [],
  colors: [],
  minRating: 0,
  inStockOnly: false,
};

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "UK6", "UK7", "UK8", "UK9", "UK10", "UK11"];
const ALL_COLORS = [
  { name: "Black", hex: "#1B1B18" },
  { name: "White", hex: "#F4F1EA" },
  { name: "Camel", hex: "#B08A5A" },
  { name: "Navy", hex: "#2B3348" },
  { name: "Clay", hex: "#B5502D" },
  { name: "Olive", hex: "#5C5C42" },
];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterPanel({
  filters,
  onChange,
  onReset,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}) {
  return (
    <div className="px-1">
      <div className="flex items-center justify-between pb-4">
        <h3 className="font-display text-lg">Filters</h3>
        <Button variant="link" size="sm" onClick={onReset} className="text-xs text-muted-foreground">
          Clear all
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "price"]}>
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {CATEGORIES.map((c) => (
                <label key={c.id} className="flex items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={filters.categories.includes(c.id)}
                    onCheckedChange={() => onChange({ ...filters, categories: toggle(filters.categories, c.id) })}
                  />
                  <span className="text-sm">{c.label}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {BRANDS.map((b) => (
                <label key={b} className="flex items-center gap-2.5 cursor-pointer">
                  <Checkbox
                    checked={filters.brands.includes(b)}
                    onCheckedChange={() => onChange({ ...filters, brands: toggle(filters.brands, b) })}
                  />
                  <span className="text-sm">{b}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <Slider
              min={0}
              max={25000}
              step={500}
              value={filters.priceRange}
              onValueChange={(v) => onChange({ ...filters, priceRange: v as [number, number] })}
              className="mt-2"
            />
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => onChange({ ...filters, sizes: toggle(filters.sizes, s) })}
                  className={`rounded-sm border px-3 py-1.5 text-xs transition-colors ${
                    filters.sizes.includes(s) ? "border-ink bg-ink text-cream" : "border-border hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-3">
              {ALL_COLORS.map((c) => (
                <button
                  key={c.name}
                  aria-label={c.name}
                  onClick={() => onChange({ ...filters, colors: toggle(filters.colors, c.name) })}
                  className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 ${
                    filters.colors.includes(c.name) ? "border-accent" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.hex, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5">
              {[4, 3, 2].map((r) => (
                <button
                  key={r}
                  onClick={() => onChange({ ...filters, minRating: filters.minRating === r ? 0 : r })}
                  className={`flex items-center gap-2 rounded-sm p-1.5 -ml-1.5 transition-colors ${
                    filters.minRating === r ? "bg-muted" : "hover:bg-muted/60"
                  }`}
                >
                  <Rating value={r} />
                  <span className="text-xs text-muted-foreground">& up</span>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <Checkbox
                checked={filters.inStockOnly}
                onCheckedChange={(v) => onChange({ ...filters, inStockOnly: Boolean(v) })}
              />
              <span className="text-sm">In stock only</span>
            </label>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
