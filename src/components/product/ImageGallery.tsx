import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { handleImageError } from "@/lib/images";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const frameRef = useRef<HTMLDivElement>(null);

  const go = (next: number) => {
    setDirection(next > active ? 1 : -1);
    setActive((next + images.length) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex gap-3 md:sticky md:top-24 md:self-start">
      <div className="hidden md:flex flex-col gap-3">
        {images.map((img, i) => (
          <button
            key={img + i}
            onClick={() => go(i)}
            className={cn(
              "h-20 w-16 overflow-hidden rounded-sm border transition-colors",
              active === i ? "border-ink" : "border-border hover:border-ink/40"
            )}
          >
            <img src={img} alt="" onError={handleImageError} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        className="relative flex-1 aspect-[4/5] overflow-hidden rounded-sm bg-muted cursor-zoom-in"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={alt}
            onError={handleImageError}
            custom={direction}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: origin }}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out",
              zoomed && "scale-[1.6]"
            )}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={() => go(active - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-cream/85 backdrop-blur focus-ring hover:bg-cream transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next image"
              onClick={() => go(active + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-cream/85 backdrop-blur focus-ring hover:bg-cream transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={cn("h-1.5 rounded-full transition-all", active === i ? "w-5 bg-ink" : "w-1.5 bg-ink/30")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
