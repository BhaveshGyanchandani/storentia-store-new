import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScrollHeader } from "@/hooks/use-scroll-header";
import { useCartStore, useCartTotals } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchCommand } from "@/components/search/SearchCommand";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_LINKS = [
  { to: "/shop", label: "Shop All" },
  { to: "/shop?category=new-arrivals", label: "New Arrivals" },
  { to: "/shop?category=men", label: "Men" },
  { to: "/shop?category=women", label: "Women" },
  { to: "/shop?category=sneakers", label: "Sneakers" },
  { to: "/shop?category=accessories", label: "Accessories" },
];

export function Header() {
  const { scrolled, hidden } = useScrollHeader();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartOpen = useCartStore((s) => s.isOpen);
  const openCart = useCartStore((s) => s.open);
  const closeCart = useCartStore((s) => s.close);
  const { count } = useCartTotals();
  const wishCount = useWishlistStore((s) => s.ids.length);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 z-40 w-full transition-colors duration-300",
          scrolled ? "bg-cream/90 backdrop-blur-md shadow-soft" : "bg-transparent"
        )}
      >
        <div className="container-px flex h-20 items-center justify-between">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              aria-label="Open menu"
              className="focus-ring rounded-sm p-2 -ml-2"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <Link to="/" className="font-display text-2xl tracking-tight select-none">
            MAISON
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-[13px] uppercase tracking-wide text-ink-soft hover:text-ink transition-colors focus-ring",
                    isActive && "text-ink"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button aria-label="Search" className="focus-ring rounded-sm p-2.5 hover:bg-muted transition-colors" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link to="/account" aria-label="Account" className="hidden sm:inline-flex focus-ring rounded-sm p-2.5 hover:bg-muted transition-colors">
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative focus-ring rounded-sm p-2.5 hover:bg-muted transition-colors">
              <Heart className="h-[18px] w-[18px]" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
                  {wishCount}
                </span>
              )}
            </Link>
            <button aria-label="Cart" className="relative focus-ring rounded-sm p-2.5 hover:bg-muted transition-colors" onClick={openCart}>
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-cream"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile nav */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" title="Menu" hideHeader>
          <div className="flex items-center justify-between px-6 py-5 hairline">
            <span className="font-display text-xl">MAISON</span>
            <button className="focus-ring rounded-sm p-2 hover:bg-muted" onClick={() => setMobileOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="py-3.5 text-[15px] hairline first:border-t-0"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/account" onClick={() => setMobileOpen(false)} className="py-3.5 text-[15px] hairline">
              Account
            </Link>
            <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="py-3.5 text-[15px] hairline">
              Wishlist
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <Sheet open={cartOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
        <SheetContent side="right" title="Your bag">
          <CartDrawer />
        </SheetContent>
      </Sheet>

      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
