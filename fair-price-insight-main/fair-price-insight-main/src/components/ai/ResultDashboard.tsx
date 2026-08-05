import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Gauge,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";
import { FairnessGauge, ScoreLegend } from "./FairnessGauge";
import { fairnessBand, type AnalysisResult } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tooltipStyle = {
  background: "oklch(0.21 0.032 300)",
  border: "1px solid oklch(1 0 0 / 0.12)",
  borderRadius: 12,
  fontSize: 12,
  color: "oklch(0.96 0.008 300)",
};

export function ResultDashboard({ result }: { result: AnalysisResult }) {
  const band = fairnessBand(result.fairnessScore);
  const [open, setOpen] = useState(true);

  const priceData = [
    { name: "Current Price", value: result.currentPrice },
    { name: "Fair Price", value: result.fairPrice },
  ];
  const similarData = result.similar.map((s) => ({
    name: s.brand,
    value: s.similarity,
  }));

  return (
    <div className="space-y-8">
      {/* Main result */}
      <section className="glass animate-rise rounded-4xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-primary">
              Analysis complete
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              {result.product.name}
              <span className="ml-2 text-base font-normal text-muted-foreground">
                by {result.product.brand}
              </span>
            </h2>
          </div>
          <Badge variant="outline" className="border-primary/50 text-primary">
            Model confidence {result.confidence}%
          </Badge>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <Metric label="Current Price" value={result.currentPrice} prefix="₹" />
          <Metric label="Expected Fair Price" value={result.fairPrice} prefix="₹" accent />
          <Metric
            label="Price Difference"
            value={result.differencePct}
            suffix="%"
            trend="up"
          />
          <Metric label="Similarity Score" value={result.similarityScore} suffix="%" />
          <Metric label="Fairness Score" value={result.fairnessScore} suffix="/100" />
        </div>
      </section>

      {/* Gauge */}
      <section className="glass animate-rise grid gap-8 rounded-4xl p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="mx-auto">
          <FairnessGauge score={result.fairnessScore} />
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Gauge className="size-4 text-primary" /> Fairness score interpretation
          </div>
          <h3 className="text-2xl font-semibold">{band.label}</h3>
          <p className="max-w-xl text-sm text-muted-foreground">
            The fairness score blends similarity, historical pricing and brand premium
            into a single 0–100 signal. Lower scores indicate the price is drifting away
            from comparable products.
          </p>
          <ScoreLegend />
        </div>
      </section>

      {/* AI decision + explanation */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass glass-hover animate-rise rounded-4xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <ShieldAlert className="size-5" />
              </span>
              <h3 className="text-xl font-semibold">AI Decision</h3>
            </div>
            <Badge className="bg-destructive/20 text-destructive">{band.badge}</Badge>
          </div>
          <p className="mt-5 text-lg">{result.decision}</p>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>AI confidence</span>
              <span>{result.confidence}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>
          <Button
            variant="ghost"
            className="mt-5 px-0 text-primary hover:bg-transparent"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Hide" : "Show"} recommendation
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </Button>
          <div
            className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <p className="rounded-2xl border border-border/70 bg-card/40 p-4 text-sm text-muted-foreground">
                Recommended action: renegotiate the shelf price towards ₹{result.fairPrice}
                , or justify the premium with a measurable product difference.
              </p>
            </div>
          </div>
        </section>

        <section className="glass glass-hover animate-rise rounded-4xl p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <Sparkles className="size-5" />
            </span>
            <h3 className="text-xl font-semibold">Why AI Made This Decision?</h3>
          </div>
          <div className="mt-5 flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="h-1 flex-1 rounded-full bg-primary/70 animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {highlight(result.explanation, result.highlights)}
          </p>
          <div className="mt-6 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
            {result.factors.slice(0, 4).map((f) => (
              <div
                key={f.factor}
                className="rounded-xl border border-border/70 bg-card/40 px-3 py-2"
              >
                {f.factor}
                <span className="ml-2 font-mono text-accent">{f.impact}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Comparison */}
      <section className="glass animate-rise rounded-4xl p-6 sm:p-8">
        <h3 className="text-xl font-semibold">Product Comparison</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Current product vs the closest matches found by the model.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <article className="rounded-3xl border border-primary/40 bg-primary/10 p-5">
            <Badge className="bg-primary/20 text-primary">Current product</Badge>
            <h4 className="mt-3 font-display text-lg font-semibold">
              {result.product.name}
            </h4>
            <Row label="Brand" value={result.product.brand} />
            <Row label="Price" value={`₹${result.currentPrice}`} />
            <Row label="Weight" value={result.product.weight} />
            <Row label="Quantity" value={result.product.quantity} />
            <Row label="Features" value={result.product.features} />
            <Row label="Ingredients" value={result.product.ingredients} />
          </article>
          {result.similar.map((s) => {
            const diff = result.currentPrice - s.price;
            return (
              <article
                key={s.name}
                className="glass-hover rounded-3xl border border-border/70 bg-card/40 p-5"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-accent/50 text-accent">
                    {s.similarity}% similar
                  </Badge>
                  <span
                    className={`flex items-center gap-1 text-xs ${diff > 0 ? "text-success" : "text-destructive"}`}
                  >
                    {diff > 0 ? (
                      <ArrowDownRight className="size-3.5" />
                    ) : (
                      <ArrowUpRight className="size-3.5" />
                    )}
                    ₹{Math.abs(diff)} {diff > 0 ? "cheaper" : "costlier"}
                  </span>
                </div>
                <h4 className="mt-3 font-display text-lg font-semibold">{s.name}</h4>
                <Row label="Brand" value={s.brand} />
                <Row label="Price" value={`₹${s.price}`} />
                <Row label="Weight" value={s.weight} />
                <Row label="Quantity" value={s.quantity} />
                <Row label="Features" value={s.features} />
                <Row label="Ingredients" value={s.ingredients} />
              </article>
            );
          })}
        </div>
      </section>

      {/* Charts */}
      <section className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Price Comparison" subtitle="Current price vs predicted fair price">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.07)" />
              <XAxis dataKey="name" stroke="oklch(0.72 0.03 300)" fontSize={12} />
              <YAxis stroke="oklch(0.72 0.03 300)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={64}>
                {priceData.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? "var(--magenta)" : "var(--amber)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Similar Products" subtitle="Similarity percentage by brand">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={similarData}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.07)" />
              <XAxis dataKey="name" stroke="oklch(0.72 0.03 300)" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="oklch(0.72 0.03 300)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="var(--violet)" barSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="lg:col-span-2">
          <ChartCard
            title="Fairness Score Breakdown"
            subtitle="How each factor influenced the final score"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={result.factors} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.07)" />
                <XAxis type="number" domain={[0, 100]} stroke="oklch(0.72 0.03 300)" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="factor"
                  width={150}
                  stroke="oklch(0.72 0.03 300)"
                  fontSize={12}
                />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
                <Bar dataKey="impact" radius={[0, 10, 10, 0]} barSize={20}>
                  {result.factors.map((f, i) => (
                    <Cell
                      key={i}
                      fill={
                        f.impact > 75
                          ? "var(--magenta)"
                          : f.impact > 45
                            ? "var(--violet)"
                            : "var(--amber)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  prefix,
  suffix,
  accent,
  trend,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  accent?: boolean;
  trend?: "up" | "down";
}) {
  return (
    <div className="glass-hover rounded-3xl border border-border/70 bg-card/40 p-5">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <p
        className={`mt-3 font-display text-3xl font-bold ${accent ? "text-accent" : ""}`}
      >
        <AnimatedNumber value={value} prefix={prefix ?? ""} suffix={suffix ?? ""} />
      </p>
      {trend && (
        <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
          <TrendingUp className="size-3.5" /> above fair value
        </p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3 border-t border-border/50 pt-2 text-sm">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-0.5">{value}</p>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass animate-rise rounded-4xl p-6 sm:p-8">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mb-5 mt-1 text-sm text-muted-foreground">{subtitle}</p>
      {children}
    </section>
  );
}

function highlight(text: string, keywords: string[]) {
  const pattern = new RegExp(`(${keywords.join("|")})`, "gi");
  return text.split(pattern).map((part, i) =>
    keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
      <mark
        key={i}
        className="rounded bg-primary/20 px-1 text-foreground"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
