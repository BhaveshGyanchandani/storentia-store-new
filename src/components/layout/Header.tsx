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
  { to: "/shop?category=new-arrivals", label: "New Arrivals" },
  { to: "/shop?category=men", label: "Men" },
  { to: "/shop?category=women", label: "Women" },
  { to: "/shop?category=sneakers", label: "Sneakers" },
  { to: "/shop?category=accessories", label: "Accessories" },
];

const EDITORIAL_LINKS = [
  { to: "/journal", label: "Journal" },
  { to: "/the-edit", label: "The Edit" },
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
          "fixed top-0 z-40 w-full transition-all duration-300 text-slate-100",
          scrolled
            ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-slate-950/40"
            : "bg-slate-950/60 backdrop-blur-md border-b border-slate-800/40"
        )}
      >
        <div className="container-px flex h-20 items-center justify-between">
          <div className="flex items-center gap-3 lg:hidden">
            <button
              aria-label="Open menu"
              className="focus-ring rounded-sm p-2 -ml-2 text-slate-200 hover:text-rose-300 hover:bg-slate-800/60 transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <Link
            to="/"
            className="font-display text-2xl tracking-widest font-bold bg-gradient-to-r from-rose-200 via-amber-200 to-rose-300 bg-clip-text text-transparent drop-shadow-[0_1px_3px_rgba(244,63,94,0.3)] select-none hover:opacity-90 transition-opacity"
          >
            MAISON
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-[13px] uppercase tracking-wider text-slate-300 hover:text-rose-200 transition-colors focus-ring",
                    isActive && "text-rose-300 font-medium drop-shadow-[0_0_6px_rgba(244,63,94,0.25)]"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <span className="h-3.5 w-px bg-slate-700/60" aria-hidden />
            {EDITORIAL_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "font-display text-[14px] italic text-rose-300/80 hover:text-rose-200 transition-colors focus-ring",
                    isActive && "text-rose-300 font-semibold"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              className="focus-ring rounded-sm p-2.5 text-slate-200 hover:text-rose-300 hover:bg-slate-800/60 transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden sm:inline-flex focus-ring rounded-sm p-2.5 text-slate-200 hover:text-rose-300 hover:bg-slate-800/60 transition-colors"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative focus-ring rounded-sm p-2.5 text-slate-200 hover:text-rose-300 hover:bg-slate-800/60 transition-colors"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-[9px] font-bold text-white shadow-sm shadow-rose-900/50">
                  {wishCount}
                </span>
              )}
            </Link>
            <button
              aria-label="Cart"
              className="relative focus-ring rounded-sm p-2.5 text-slate-200 hover:text-rose-300 hover:bg-slate-800/60 transition-colors"
              onClick={openCart}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-[9px] font-bold text-white shadow-sm shadow-rose-900/50"
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
            <span className="font-display text-xl font-bold bg-gradient-to-r from-rose-300 via-amber-200 to-rose-400 bg-clip-text text-transparent">
              MAISON
            </span>
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
            {EDITORIAL_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="py-3.5 font-display text-[16px] italic text-accent hairline"
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
