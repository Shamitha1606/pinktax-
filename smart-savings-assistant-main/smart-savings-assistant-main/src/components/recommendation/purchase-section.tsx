import { ExternalLink, RefreshCw, RotateCcw, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/recommendation-data";

export function PurchaseSection({
  alternative,
  onViewProduct,
  onCompareAgain,
  onAnalyzeAnother,
}: {
  alternative: Product;
  onViewProduct: () => void;
  onCompareAgain: () => void;
  onAnalyzeAnother: () => void;
}) {
  return (
    <section className="px-4 pb-24 pt-8">
      <div className="glass relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-8 text-center sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-aurora opacity-70"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-savings-gradient opacity-15 blur-3xl"
        />
        <h2 className="text-balance text-3xl font-bold sm:text-4xl">Ready to Buy Smarter?</h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty text-sm text-muted-foreground sm:text-base">
          {alternative.name} matches your product at {alternative.similarity}% similarity for ₹
          {alternative.price}. Lock in the smarter choice.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="hero" size="lg" onClick={onViewProduct}>
            <ShoppingCart /> View Product
          </Button>
          <Button variant="glass" size="lg" onClick={onCompareAgain}>
            <RefreshCw /> Compare Again
          </Button>
          <Button variant="ghost" size="lg" onClick={onAnalyzeAnother}>
            <RotateCcw /> Analyze Another Product
          </Button>
        </div>

        <button
          type="button"
          disabled
          className="mx-auto mt-8 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-xs text-muted-foreground"
        >
          <ExternalLink className="size-3.5" />
          Buy on partner store — integration coming soon
        </button>
      </div>
    </section>
  );
}
