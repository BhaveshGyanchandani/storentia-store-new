import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Package, MapPin, Settings, LogOut, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { handleImageError } from "@/lib/images";

const MOCK_ORDERS = [
  { id: "MSN-482913", date: "Aug 12, 2026", status: "Delivered", items: [PRODUCTS[0], PRODUCTS[2]], total: 27800 },
  { id: "MSN-471820", date: "Jul 28, 2026", status: "In Transit", items: [PRODUCTS[8]], total: 6400 },
  { id: "MSN-460115", date: "Jun 03, 2026", status: "Delivered", items: [PRODUCTS[14], PRODUCTS[19]], total: 19300 },
];

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="pt-28 pb-24">
      <div className="container-px max-w-md mx-auto">
        <h1 className="font-display text-3xl mb-2">{mode === "login" ? "Sign In" : "Create Account"}</h1>
        <p className="text-sm text-muted-foreground mb-8">
          {mode === "login" ? "Welcome back to Maison." : "Join for early access and order tracking."}
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success(mode === "login" ? "Signed in" : "Account created");
            onAuth();
          }}
        >
          {mode === "register" && (
            <div>
              <Label>Full Name</Label>
              <Input required placeholder="Your name" />
            </div>
          )}
          <div>
            <Label>Email</Label>
            <Input type="email" required placeholder="you@email.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" required placeholder="••••••••" />
          </div>
          <Button type="submit" size="lg" className="w-full mt-2">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "login" ? "New to Maison?" : "Already have an account?"}{" "}
          <button className="text-ink underline underline-offset-2" onClick={() => setMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function Account() {
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="pt-28 pb-24">
      <div className="container-px">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl">My Account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Bhavesh Gyanchandani · bhaveshgyanchandanip1@gmail.com</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setAuthed(false)}>
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </Button>
        </div>

        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">
              <span className="flex items-center gap-1.5"><Package className="h-3.5 w-3.5" /> Orders</span>
            </TabsTrigger>
            <TabsTrigger value="profile">
              <span className="flex items-center gap-1.5"><Settings className="h-3.5 w-3.5" /> Profile</span>
            </TabsTrigger>
            <TabsTrigger value="addresses">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist">
              <span className="flex items-center gap-1.5"><Heart className="h-3.5 w-3.5" /> Wishlist</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="space-y-4 max-w-2xl">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="rounded-sm border border-border p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-xs ${
                        order.status === "Delivered" ? "bg-muted text-ink-soft" : "bg-clay-50 text-clay-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    {order.items.map((p) => (
                      <img key={p.id} src={p.productImages[0]} alt={p.productTitle} onError={handleImageError} className="h-14 w-12 rounded-xs object-cover" />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm text-muted-foreground">{order.items.length} item(s)</span>
                    <span className="text-sm font-medium">{formatPrice(order.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="max-w-md space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input defaultValue="Bhavesh Gyanchandani" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="bhaveshgyanchandanip1@gmail.com" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input defaultValue="+91 98765 43210" />
              </div>
              <Separator className="my-2" />
              <Button onClick={() => toast.success("Profile updated")}>Save Changes</Button>
            </div>
          </TabsContent>

          <TabsContent value="addresses">
            <div className="max-w-md rounded-sm border border-border p-5">
              <p className="text-sm font-medium">Home</p>
              <p className="mt-1 text-sm text-ink-soft">14 Residency Road, Jaipur, Rajasthan 302001, India</p>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
            </div>
            <Button variant="outline" className="mt-4">Add New Address</Button>
          </TabsContent>

          <TabsContent value="wishlist">
            <p className="text-sm text-muted-foreground">
              Manage saved items on your{" "}
              <Link to="/wishlist" className="text-ink underline underline-offset-2">wishlist page</Link>.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
