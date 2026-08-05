import { PiggyBank, TrendingDown } from "lucide-react";
import { AnimatedCounter, SectionHeading, useInView } from "./primitives";
import { analyzedProduct, type Product } from "@/lib/recommendation-data";

export function SavingsSection({ alternative }: { alternative: Product }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const savings = analyzedProduct.price - alternative.price;
  const pct = Math.round((savings / analyzedProduct.price) * 100);

  return (
    <section className="px-4 py-16">
      <SectionHeading
        eyebrow="Step 03 · Savings"
        title="Savings Calculator"
        description="A live breakdown of what switching to the recommended product puts back in your pocket."
      />

      <div ref={ref} className="glass mx-auto mt-12 grid max-w-5xl gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-savings/35 bg-savings/10 px-3 py-1 text-xs font-semibold text-savings">
            <PiggyBank className="size-3.5" />
            Verified saving
          </div>
          <h3 className="mt-4 text-balance font-display text-2xl font-bold sm:text-3xl">
            You can save{" "}
            <span className="text-savings">
              ₹<AnimatedCounter value={savings} active={inView} />
            </span>{" "}
            by choosing this alternative
          </h3>

          <div className="mt-8 space-y-6">
            <PriceBar
              label="Original Price"
              amount={analyzedProduct.price}
              max={analyzedProduct.price}
              active={inView}
              tone="muted"
            />
            <PriceBar
              label="Recommended Price"
              amount={alternative.price}
              max={analyzedProduct.price}
              active={inView}
              tone="savings"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-border bg-secondary/30 p-8">
          <div className="relative grid size-44 place-items-center rounded-full bg-savings-gradient/15">
            <div
              aria-hidden
              className="absolute inset-0 animate-pulse-ring rounded-full border border-savings/30"
            />
            <div className="text-center">
              <p className="font-display text-5xl font-extrabold text-savings">
                <AnimatedCounter value={pct} suffix="%" active={inView} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                Cheaper
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingDown className="size-4 text-savings" />
            ₹{analyzedProduct.price} → <span className="font-semibold text-savings">₹{alternative.price}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceBar({
  label,
  amount,
  max,
  active,
  tone,
}: {
  label: string;
  amount: number;
  max: number;
  active: boolean;
  tone: "muted" | "savings";
}) {
  const width = active ? `${(amount / max) * 100}%` : "0%";
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-display text-xl font-bold">₹{amount}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-secondary">
        <div
          className={
            tone === "savings"
              ? "shimmer-line h-full rounded-full bg-savings-gradient"
              : "h-full rounded-full bg-muted-foreground/50"
          }
          style={{ width, transition: "width 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </div>
    </div>
  );
}
