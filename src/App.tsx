import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";

import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Wishlist from "@/pages/Wishlist";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import Account from "@/pages/Account";
import NotFound from "@/pages/NotFound";
import {
  About,
  Journal,
  Careers,
  Sustainability,
  Contact,
  Shipping,
  FAQ,
  SizeGuide,
  Privacy,
  Terms,
  Accessibility,
} from "@/pages/InfoPages";

export default function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/orders" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "hsl(30 10% 10%)",
            color: "hsl(36 33% 97%)",
            border: "none",
            borderRadius: "4px",
            fontSize: "13px",
          },
        }}
      />
    </TooltipProvider>
  );
}
