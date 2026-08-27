import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline" | "muted";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs px-2 py-1 text-[10px] font-semibold uppercase tracking-widest2",
        variant === "default" && "bg-ink text-cream",
        variant === "accent" && "bg-accent text-accent-foreground",
        variant === "outline" && "border border-ink/40 text-ink",
        variant === "muted" && "bg-muted text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
