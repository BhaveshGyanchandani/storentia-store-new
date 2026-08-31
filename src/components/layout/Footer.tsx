import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram, Twitter, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", to: "/shop?category=new-arrivals" },
      { label: "Men", to: "/shop?category=men" },
      { label: "Women", to: "/shop?category=women" },
      { label: "Sneakers", to: "/shop?category=sneakers" },
      { label: "Accessories", to: "/shop?category=accessories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Journal", to: "/journal" },
      { label: "The Edit", to: "/the-edit" },
      { label: "Careers", to: "/careers" },
      { label: "Sustainability", to: "/sustainability" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "Shipping & Returns", to: "/shipping" },
      { label: "FAQ", to: "/faq" },
      { label: "Size Guide", to: "/size-guide" },
      { label: "Track Order", to: "/account/orders" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-ink text-cream mt-32">
      <div className="container-px py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <span className="font-display text-2xl">MAISON</span>
            <p className="mt-4 max-w-xs text-sm text-cream/60">
              Considered clothing, footwear and objects — designed to be worn in, not worn out.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a aria-label="Instagram" href="#" className="rounded-sm p-2 hover:bg-cream/10 transition-colors focus-ring">
                <Instagram className="h-4 w-4" />
              </a>
              <a aria-label="Twitter" href="#" className="rounded-sm p-2 hover:bg-cream/10 transition-colors focus-ring">
                <Twitter className="h-4 w-4" />
              </a>
              <a aria-label="YouTube" href="#" className="rounded-sm p-2 hover:bg-cream/10 transition-colors focus-ring">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-cream/50 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-cream/80 hover:text-cream transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-cream/15 pt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h4 className="eyebrow text-cream/50 mb-3">Newsletter</h4>
            <p className="text-sm text-cream/70 max-w-sm">Join for early access to new arrivals and considered edits, once or twice a month.</p>
          </div>
          <form
            className="flex w-full max-w-sm items-center gap-2 border-b border-cream/30 pb-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("You're on the list.");
              setEmail("");
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-transparent text-sm placeholder:text-cream/40 focus:outline-none"
            />
            <button aria-label="Subscribe" type="submit" className="focus-ring rounded-sm p-1">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-cream/15 pt-6 text-xs text-cream/45 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Maison. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-cream/80">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-cream/80">Terms of Service</Link>
            <Link to="/accessibility" className="hover:text-cream/80">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
