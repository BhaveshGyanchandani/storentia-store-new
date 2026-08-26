import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-10 border-b border-black/10 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Storentia Store
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/products" className="hover:text-accent">
            Shop
          </Link>
          <Link to="/cart" className="relative hover:text-accent">
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-3 -top-2 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-medium text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
