import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { getProductById } from "@/data/products";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
  const ids = useWishlistStore((s) => s.ids);
  const products = ids.map(getProductById).filter((p): p is Product => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="pt-28">
        <div className="container-px py-24 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
          <h1 className="mt-5 font-display text-2xl">Your wishlist is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">Save pieces you love and find them here later.</p>
          <Button className="mt-7" asChild>
            <Link to="/shop">Explore the Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28">
      <div className="container-px">
        <h1 className="font-display text-3xl md:text-4xl">Your Wishlist</h1>
        <p className="mt-2 mb-10 text-sm text-muted-foreground">{products.length} saved items</p>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
