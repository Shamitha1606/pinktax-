import { PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Rating, SavingsBadge, SectionHeading, SimilarityBadge, useInView } from "./primitives";
import { alternatives, analyzedProduct, type Product } from "@/lib/recommendation-data";
import { cn } from "@/lib/utils";

export function RecommendationList({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (p: Product) => void;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section className="px-4 py-16">
      <SectionHeading
        eyebrow="Step 05 · All matches"
        title="More Smart Recommendations"
        description="Ranked by similarity, fairness and total savings. Pick one to re-run the comparison."
      />

      {alternatives.length === 0 ? (
        <EmptyState />
      ) : (
        <div ref={ref} className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {alternatives.map((p, i) => {
            const saved = analyzedProduct.price - p.price;
            const selected = p.id === selectedId;
            return (
              <article
                key={p.id}
                className={cn(
                  "glass glass-hover group flex flex-col rounded-3xl p-5",
                  selected && "border-primary/60 shadow-[var(--shadow-glow)]",
                  inView && "animate-rise",
                )}
                style={inView ? { animationDelay: `${i * 110}ms` } : undefined}
              >
                <div className="relative overflow-hidden rounded-2xl border border-border">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <SimilarityBadge
                    value={p.similarity}
                    className="absolute left-3 top-3 bg-background/70 backdrop-blur"
                  />
                </div>

                <div className="mt-4 min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {p.brand}
                  </p>
                  <h3 className="truncate text-lg font-bold">{p.name}</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-display text-2xl font-extrabold">₹{p.price}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{p.originalPrice}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <SavingsBadge amount={saved} />
                    <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-semibold">
                      Fairness {p.fairness}/100
                    </span>
                  </div>
                  <Rating className="mt-3" value={p.rating} reviews={p.reviews} />
                </div>

                <Button
                  variant={selected ? "hero" : "glass"}
                  className="mt-5 w-full"
                  onClick={() => onSelect(p)}
                >
                  {selected ? "Currently Compared" : "View Product"}
                </Button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  return (
    <div className="glass mx-auto mt-12 flex max-w-xl flex-col items-center rounded-3xl p-12 text-center">
      <PackageSearch className="size-10 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">No alternatives found yet</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Analyze a product and the engine will surface better-value matches here.
      </p>
    </div>
  );
}
