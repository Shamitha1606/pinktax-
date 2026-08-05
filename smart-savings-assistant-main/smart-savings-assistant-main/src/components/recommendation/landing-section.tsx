import { Sparkles, Search, PiggyBank, GitCompareArrows, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Search,
    title: "Best Alternative Finder",
    body: "Find similar products with better value in seconds.",
  },
  {
    icon: PiggyBank,
    title: "Money Saving Insights",
    body: "Discover exactly how much you can save on every cart.",
  },
  {
    icon: GitCompareArrows,
    title: "AI Similarity Matching",
    body: "Compare product specifications attribute by attribute.",
  },
  {
    icon: BadgeCheck,
    title: "Smart Purchase Decision",
    body: "Make informed buying choices backed by fairness scores.",
  },
];

export function LandingSection({
  onStart,
  loading,
}: {
  onStart: () => void;
  loading: boolean;
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-aurora opacity-15 blur-[120px]"
      />
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex animate-pulse-ring items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <Sparkles className="size-3.5" />
          Smart Recommendation Engine
        </span>
        <h1 className="mt-6 animate-rise text-balance text-4xl font-extrabold leading-[1.05] sm:text-6xl">
          Find Smarter Alternatives &amp; <span className="text-aurora">Save Money</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          AI compares thousands of products and recommends the best alternatives based on price,
          features, and value.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="hero" size="xl" onClick={onStart} disabled={loading}>
            {loading ? "Analyzing products…" : "Get Smart Recommendations"}
          </Button>
          <p className="text-xs text-muted-foreground">
            1,284 similar products indexed · 96% AI confidence
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <article
            key={f.title}
            className="glass glass-hover animate-rise rounded-3xl p-6"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-aurora/90 text-primary-foreground">
              <f.icon className="size-5" />
            </div>
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
