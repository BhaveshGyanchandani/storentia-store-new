import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="pt-28 pb-24">
      <div className="container-px text-center max-w-md mx-auto">
        <p className="font-display text-7xl text-ink/15">404</p>
        <h1 className="mt-4 font-display text-2xl">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <Button className="mt-8" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
