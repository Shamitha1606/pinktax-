import { useState } from "react";
import { Loader2, Search, PackageOpen } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard, type Product } from "@/components/dashboard/ProductCard";

const CATALOG: Product[] = [
  { name: "Aurora Vitamin C Serum", brand: "Lumea", category: "Skincare", barcode: "8901234567890", score: 92 },
  { name: "Protein Crunch Bar — Cocoa", brand: "NuFuel", category: "Nutrition", barcode: "8904567123409", score: 78 },
  { name: "Cold Pressed Olive Oil 500ml", brand: "Terra Verde", category: "Grocery", barcode: "8909876543211", score: 88 },
  { name: "Hydra Sport Electrolyte Mix", brand: "Kinetix", category: "Beverage", barcode: "8901112223334", score: 71 },
  { name: "Bamboo Charcoal Toothpaste", brand: "Pure Root", category: "Personal care", barcode: "8905556667778", score: 84 },
];

export function ProductSearchCard({
  recent,
  onSearched,
}: {
  recent: string[];
  onSearched: (term: string) => void;
}) {
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[] | null>(null);
  const [error, setError] = useState(false);

  const runSearch = (value: string) => {
    const q = value.trim();
    if (!q) {
      toast.error("Enter a product name", { description: "Search needs at least one keyword." });
      return;
    }
    setTerm(q);
    setLoading(true);
    setError(false);
    onSearched(q);
    setTimeout(() => {
      if (q.toLowerCase() === "error") {
        setError(true);
        setResults(null);
      } else {
        setResults(
          CATALOG.filter((p) =>
            `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q.toLowerCase()),
          ),
        );
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="glass rounded-3xl p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <Search className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Search Product</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Look up any product manually by name, brand or category.
      </p>

      <form
        className="mt-5 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          runSearch(term);
        }}
      >
        <Input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="e.g. Vitamin C serum"
          className="h-12 flex-1 rounded-xl border-input bg-secondary/40 text-base focus-visible:border-primary/60"
        />
        <Button type="submit" variant="hero" size="lg" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
          {loading ? "Searching" : "Search"}
        </Button>
      </form>

      {recent.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Recent</span>
          {recent.map((r) => (
            <button
              key={r}
              onClick={() => runSearch(r)}
              className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
            >
              {r}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6 space-y-3">
        {loading &&
          [0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 rounded-2xl bg-secondary/30 p-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}

        {!loading && error && (
          <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-5 text-center">
            <p className="font-medium text-destructive">Search service unavailable</p>
            <p className="mt-1 text-sm text-muted-foreground">
              We couldn't reach the product index. Please try again.
            </p>
            <Button variant="outline" className="mt-4" onClick={() => runSearch(term)}>
              Retry
            </Button>
          </div>
        )}

        {!loading && !error && results?.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center">
            <PackageOpen className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 font-medium">No products found</p>
            <p className="text-sm text-muted-foreground">
              Try a different keyword, or submit it for AI identification.
            </p>
          </div>
        )}

        {!loading &&
          !error &&
          results?.map((p, i) => (
            <div key={p.barcode} style={{ animationDelay: `${i * 60}ms` }} className="animate-rise">
              <ProductCard product={p} />
            </div>
          ))}
      </div>
    </div>
  );
}
