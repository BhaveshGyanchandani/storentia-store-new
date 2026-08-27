import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({ value, count, size = "sm" }: { value: number; count?: number; size?: "sm" | "md" }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4", i < Math.round(value) ? "fill-ink text-ink" : "fill-none text-ink/25")}
          />
        ))}
      </div>
      {count !== undefined && <span className="text-xs text-muted-foreground">({count})</span>}
    </div>
  );
}
