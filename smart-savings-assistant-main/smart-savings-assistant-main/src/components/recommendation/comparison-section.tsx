import { ArrowDown, ArrowUp, Minus, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading, useInView } from "./primitives";
import { analyzedProduct, comparisonFields, type Product } from "@/lib/recommendation-data";

function format(key: keyof Product, p: Product) {
  const v = p[key];
  if (key === "price") return `₹${v}`;
  if (key === "rating") return `${v} ⭐`;
  if (key === "fairness") return `${v}/100`;
  return String(v);
}

export function ComparisonSection({ alternative }: { alternative: Product }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section className="px-4 py-16">
      <SectionHeading
        eyebrow="Step 02 · Side by side"
        title="Original vs Recommended"
        description="Every attribute compared, with the winning value highlighted by the engine."
      />

      <div ref={ref} className="glass mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl">
        <div className="grid grid-cols-[minmax(5.5rem,1fr)_1fr_1fr] items-center gap-2 border-b border-border bg-secondary/40 px-4 py-4 sm:px-6">
          <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
            Attribute
          </span>
          <div className="min-w-0 text-center">
            <p className="truncate text-sm font-semibold">{analyzedProduct.name}</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              Original
            </p>
          </div>
          <div className="min-w-0 text-center">
            <p className="truncate text-sm font-semibold text-primary">{alternative.name}</p>
            <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              Recommended
            </p>
          </div>
        </div>

        {comparisonFields.map((field, i) => {
          const altWins = field.winner === "alternative";
          const same = format(field.key, analyzedProduct) === format(field.key, alternative);
          return (
            <div
              key={field.label}
              className={cn(
                "grid grid-cols-[minmax(5.5rem,1fr)_1fr_1fr] items-center gap-2 border-b border-border/60 px-4 py-4 transition-colors last:border-0 hover:bg-secondary/30 sm:px-6",
                inView && "animate-rise",
              )}
              style={inView ? { animationDelay: `${i * 60}ms` } : undefined}
            >
              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                {field.label}
              </span>
              <div
                className={cn(
                  "rounded-xl px-2 py-2 text-center text-xs font-semibold sm:text-sm",
                  !same && !altWins && "bg-savings/12 text-savings",
                )}
              >
                {format(field.key, analyzedProduct)}
              </div>
              <div
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-center text-xs font-semibold sm:text-sm",
                  !same && altWins && "bg-savings/12 text-savings",
                )}
              >
                {format(field.key, alternative)}
                {same ? (
                  <Minus className="size-3.5 text-muted-foreground" />
                ) : altWins ? (
                  field.key === "price" ? (
                    <ArrowDown className="size-3.5" />
                  ) : (
                    <ArrowUp className="size-3.5" />
                  )
                ) : null}
              </div>
            </div>
          );
        })}

        <div className="flex items-center justify-center gap-2 bg-aurora/10 px-6 py-4 text-sm font-semibold text-savings">
          <Trophy className="size-4" />
          {alternative.name} wins 6 of 8 attributes
        </div>
      </div>
    </section>
  );
}
