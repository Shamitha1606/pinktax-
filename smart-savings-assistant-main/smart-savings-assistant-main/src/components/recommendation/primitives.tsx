import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Fires once the element scrolls into view — drives entrance + count animations. */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  active = true,
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  active?: boolean;
  decimals?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration, active]);

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const gaugeTone = (score: number) =>
  score >= 75 ? "var(--savings)" : score >= 55 ? "var(--warning)" : "var(--destructive)";

export function FairnessGauge({
  score,
  size = 104,
  label = "Fairness",
  active = true,
}: {
  score: number;
  size?: number;
  label?: string;
  active?: boolean;
}) {
  const stroke = size / 11;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setProgress(score), 120);
    return () => clearTimeout(t);
  }, [score, active]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            stroke="color-mix(in oklab, var(--foreground) 12%, transparent)"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            stroke={gaugeTone(score)}
            strokeDasharray={c}
            strokeDashoffset={c - (c * progress) / 100}
            style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display font-bold leading-none"
            style={{ fontSize: size / 4, color: gaugeTone(score) }}
          >
            <AnimatedCounter value={score} active={active} />
          </span>
          <span className="text-[0.6rem] uppercase tracking-widest text-muted-foreground">
            /100
          </span>
        </div>
      </div>
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}

export function SimilarityBadge({ value, className }: { value: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/12 px-3 py-1 text-xs font-semibold text-primary",
        className,
      )}
    >
      <span className="size-1.5 animate-pulse rounded-full bg-primary" />
      {value}% Similar
    </span>
  );
}

export function SavingsBadge({ amount, className }: { amount: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-savings/40 bg-savings/12 px-3 py-1 text-xs font-semibold text-savings",
        className,
      )}
    >
      Save ₹{amount}
    </span>
  );
}

export function Rating({
  value,
  reviews,
  className,
}: {
  value: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < Math.round(value) ? "fill-warning text-warning" : "text-muted-foreground/40",
            )}
          />
        ))}
      </div>
      <span className="text-sm font-semibold">{value.toFixed(1)}</span>
      {reviews ? (
        <span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span>
      ) : null}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance text-3xl font-bold sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-pretty text-sm text-muted-foreground sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
