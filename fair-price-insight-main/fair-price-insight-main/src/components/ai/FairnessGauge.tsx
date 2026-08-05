import { fairnessBand } from "@/lib/pricing";
import { useCountUp } from "./AnimatedNumber";

const toneColor: Record<string, string> = {
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

export function FairnessGauge({ score, size = 260 }: { score: number; size?: number }) {
  const band = fairnessBand(score);
  const animated = useCountUp(score, 1600);
  const stroke = 16;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const arc = 0.75;
  const dash = circumference * arc;
  const color = toneColor[band.tone] ?? "var(--primary)";

  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size} className="-rotate-[225deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="oklch(1 0 0 / 0.08)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${(dash * animated) / 100} ${circumference}`}
          style={{ filter: `drop-shadow(0 0 14px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-5xl font-bold" style={{ color }}>
          {Math.round(animated)}
        </span>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          / 100
        </span>
        <span className="mt-3 rounded-full border px-3 py-1 text-xs font-medium"
          style={{ borderColor: color, color }}>
          {band.label}
        </span>
      </div>
    </div>
  );
}

export function ScoreLegend() {
  const rows = [
    { range: "80 – 100", label: "Fair Pricing", tone: "success" },
    { range: "60 – 79", label: "Slight Premium", tone: "warning" },
    { range: "40 – 59", label: "Potential Overpricing", tone: "warning" },
    { range: "Below 40", label: "Likely Unfair Pricing", tone: "danger" },
  ];
  return (
    <ul className="space-y-2 text-sm">
      {rows.map((r) => (
        <li key={r.range} className="flex items-center gap-3">
          <span
            className="size-2.5 rounded-full"
            style={{ background: toneColor[r.tone] ?? "var(--primary)" }}
          />
          <span className="w-24 font-mono text-xs text-muted-foreground">{r.range}</span>
          <span className="text-foreground/90">{r.label}</span>
        </li>
      ))}
    </ul>
  );
}
