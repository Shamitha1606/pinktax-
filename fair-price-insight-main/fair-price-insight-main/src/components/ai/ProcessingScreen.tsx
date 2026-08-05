import { useEffect, useState } from "react";
import { BrainCircuit, Check, Loader2 } from "lucide-react";
import { processingSteps } from "@/lib/pricing";

export function ProcessingScreen({ onDone }: { onDone: () => void }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (active >= processingSteps.length) {
      const t = setTimeout(onDone, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActive((s) => s + 1), 1100);
    return () => clearTimeout(t);
  }, [active, onDone]);

  const progress = Math.min((active / processingSteps.length) * 100, 100);
  const size = 240;
  const r = 104;
  const c = 2 * Math.PI * r;

  return (
    <div className="glass animate-rise grid gap-10 rounded-4xl p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <div className="absolute inset-6 rounded-full border border-primary/40 animate-ring" />
        <div
          className="absolute inset-6 rounded-full border border-accent/40 animate-ring"
          style={{ animationDelay: "1.2s" }}
        />
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="oklch(1 0 0 / 0.08)"
            strokeWidth="10"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${(c * progress) / 100} ${c}`}
            className="transition-all duration-700 ease-out"
            style={{ filter: "drop-shadow(0 0 12px var(--primary))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <BrainCircuit className="size-10 text-primary animate-float" />
          <span className="font-display text-3xl font-bold">{Math.round(progress)}%</span>
          <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Analysing
          </span>
        </div>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className="animate-particle absolute bottom-6 size-1.5 rounded-full bg-accent"
            style={{ left: `${12 + i * 15}%`, animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>

      <ol className="space-y-3">
        {processingSteps.map((label, i) => {
          const done = i < active;
          const running = i === active;
          return (
            <li
              key={label}
              className={`flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition-all duration-500 ${
                running
                  ? "border-primary/50 bg-primary/10"
                  : done
                    ? "border-accent/30 bg-accent/5"
                    : "border-border/60 bg-card/30 opacity-60"
              }`}
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${
                  done
                    ? "border-accent text-accent"
                    : running
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                }`}
              >
                {done ? (
                  <Check className="size-4" />
                ) : running ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  i + 1
                )}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">
                  {done ? "Completed" : running ? "Processing…" : "Queued"}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
