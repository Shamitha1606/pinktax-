import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BrainCircuit,
  Layers,
  LineChart,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Fair Pricing Analysis — Fair Price Intelligence" },
      {
        name: "description",
        content:
          "Analyze product pricing with AI: detect similar products, predict a fair price, and see an explainable fairness score.",
      },
      { property: "og:title", content: "AI Fair Pricing Analysis" },
      {
        property: "og:description",
        content:
          "AI-powered fair price intelligence with similarity scores, fairness gauge and explainable reasoning.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: ScanSearch,
    title: "Similar Product Detection",
    body: "Vector matching surfaces near-identical products across brands and pack sizes.",
  },
  {
    icon: LineChart,
    title: "Fair Price Prediction",
    body: "A regression model estimates what the product should cost given its real attributes.",
  },
  {
    icon: BrainCircuit,
    title: "AI Explanation",
    body: "Every verdict comes with human-readable reasoning, not a black-box number.",
  },
  {
    icon: ShieldCheck,
    title: "Pricing Transparency",
    body: "Fairness scoring makes brand premium visible and measurable to shoppers.",
  },
];

function Landing() {
  return (
    <main className="relative overflow-hidden">
      <div className="grid-noise pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-16 sm:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary">
              <Sparkles className="size-3.5" /> Module 2
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl">
              <span className="text-aurora">AI-Powered Fair Price</span>
              <br />
              Intelligence
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Analyze product pricing using AI, compare similar products, and understand
              whether a product is fairly priced.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link to="/analyze">
                  Start Price Analysis <Sparkles className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <Link to="/analyze">See a sample report</Link>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["1.2M", "Products indexed"],
                ["96%", "Match accuracy"],
                ["<4s", "Median analysis"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-bold text-accent">{v}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ScanIllustration />
        </div>

        <div className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="glass glass-hover animate-rise rounded-3xl p-6"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

function ScanIllustration() {
  return (
    <div className="glass animate-rise relative overflow-hidden rounded-4xl p-7">
      <div className="absolute -inset-x-10 top-0 h-24 animate-scan bg-[linear-gradient(180deg,transparent,oklch(0.72_0.19_330/0.25),transparent)]" />
      <div className="relative flex items-center justify-center">
        <div className="absolute size-40 rounded-full border border-primary/30 animate-ring" />
        <div className="relative flex size-24 items-center justify-center rounded-3xl bg-primary/15 text-primary animate-float">
          <BrainCircuit className="size-11" />
        </div>
      </div>

      <div className="relative mt-9 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <ProductChip name="Product A" price="₹240" tone="primary" />
        <span className="font-display text-xs uppercase tracking-[0.25em] text-muted-foreground">
          vs
        </span>
        <ProductChip name="Product B" price="₹205" tone="accent" />
      </div>

      <div className="mt-6 space-y-3">
        {[
          ["Similarity", 96],
          ["Fairness", 42],
        ].map(([label, val]) => (
          <div key={label as string}>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{label}</span>
              <span className="font-mono">{val}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${val}%`, backgroundImage: "var(--gradient-aurora)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductChip({
  name,
  price,
  tone,
}: {
  name: string;
  price: string;
  tone: "primary" | "accent";
}) {
  return (
    <div
      className={`rounded-2xl border p-4 text-center ${
        tone === "primary"
          ? "border-primary/40 bg-primary/10"
          : "border-accent/40 bg-accent/10"
      }`}
    >
      <Layers
        className={`mx-auto size-5 ${tone === "primary" ? "text-primary" : "text-accent"}`}
      />
      <p className="mt-2 text-xs text-muted-foreground">{name}</p>
      <p className="font-display text-xl font-bold">{price}</p>
    </div>
  );
}
