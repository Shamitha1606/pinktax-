import { AlertTriangle, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FairnessGauge,
  Rating,
  SavingsBadge,
  SectionHeading,
  SimilarityBadge,
  useInView,
} from "./primitives";
import { analyzedProduct, bestAlternative, type Product } from "@/lib/recommendation-data";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 px-3 py-3 text-center">
      <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}

export function DashboardSection({ onSelect }: { onSelect: (p: Product) => void }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const savings = analyzedProduct.price - bestAlternative.price;

  return (
    <section className="px-4 py-16">
      <SectionHeading
        eyebrow="Step 01 · AI Analysis"
        title="Recommendation Dashboard"
        description="Your analyzed product, scored and matched against the best-value alternative in the catalogue."
      />

      <div ref={ref} className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2">
        {/* Analyzed product */}
        <article className="glass glass-hover rounded-3xl p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Analyzed Product
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-warning/40 bg-warning/12 px-3 py-1 text-xs font-semibold text-warning">
              <AlertTriangle className="size-3.5" />
              Better alternatives found
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row">
            <img
              src={analyzedProduct.image}
              alt={analyzedProduct.name}
              width={768}
              height={768}
              className="size-32 shrink-0 rounded-2xl border border-border object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {analyzedProduct.brand}
              </p>
              <h3 className="truncate text-2xl font-bold">{analyzedProduct.name}</h3>
              <p className="mt-2 font-display text-3xl font-extrabold">₹{analyzedProduct.price}</p>
              <Rating
                className="mt-2"
                value={analyzedProduct.rating}
                reviews={analyzedProduct.reviews}
              />
            </div>
            <FairnessGauge score={analyzedProduct.fairness} active={inView} size={96} />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="Weight" value={analyzedProduct.weight} />
            <Stat label="Quantity" value={analyzedProduct.quantity} />
            <Stat label="Brand value" value="Premium" />
          </div>
        </article>

        {/* Best alternative */}
        <article className="glass glass-hover relative overflow-hidden rounded-3xl border-primary/40 p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-aurora opacity-80"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-aurora opacity-20 blur-3xl"
          />
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <h3 className="font-display text-xl font-bold">Best Alternative</h3>
            <span className="inline-flex shrink-0 animate-pulse-ring items-center gap-1.5 rounded-full bg-aurora px-3 py-1 text-xs font-bold text-primary-foreground">
              <Sparkles className="size-3.5" />
              Recommended by AI
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-5 sm:flex-row">
            <img
              src={bestAlternative.image}
              alt={bestAlternative.name}
              loading="lazy"
              width={768}
              height={768}
              className="size-32 shrink-0 rounded-2xl border border-border object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {bestAlternative.brand}
              </p>
              <h4 className="truncate text-2xl font-bold">{bestAlternative.name}</h4>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-savings">
                  ₹{bestAlternative.price}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{analyzedProduct.price}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <SavingsBadge amount={savings} />
                <SimilarityBadge value={bestAlternative.similarity} />
              </div>
              <Rating
                className="mt-3"
                value={bestAlternative.rating}
                reviews={bestAlternative.reviews}
              />
            </div>
            <FairnessGauge score={bestAlternative.fairness} active={inView} size={96} />
          </div>

          <ul className="mt-6 grid gap-2 sm:grid-cols-3">
            {["Same core features", "Better price", "Higher fairness score"].map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 rounded-2xl border border-savings/25 bg-savings/8 px-3 py-2 text-xs font-medium text-savings"
              >
                <Check className="size-3.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <Button
            variant="hero"
            className="mt-6 w-full"
            onClick={() => onSelect(bestAlternative)}
          >
            View Best Alternative
          </Button>
        </article>
      </div>
    </section>
  );
}
