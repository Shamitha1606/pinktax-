import { AnimatedCounter, Rating, SectionHeading, useInView } from "./primitives";
import { trustMetrics } from "@/lib/recommendation-data";

function Ring({ value, active }: { value: number; active: boolean }) {
  const size = 92;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
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
        stroke="var(--primary)"
        strokeDasharray={c}
        strokeDashoffset={active ? c - (c * value) / 100 : c}
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
      />
    </svg>
  );
}

export function TrustSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section className="px-4 py-16">
      <SectionHeading
        eyebrow="Step 06 · Trust"
        title="Rating & Confidence Signals"
        description="How sure the engine is about this recommendation, and what it based that on."
      />

      <div ref={ref} className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustMetrics.map((m, i) => (
          <article
            key={m.label}
            className="glass glass-hover flex flex-col items-center rounded-3xl p-6 text-center"
            style={inView ? { animationDelay: `${i * 90}ms` } : undefined}
          >
            <div className="relative grid place-items-center">
              <Ring value={m.value} active={inView} />
              <span className="absolute font-display text-lg font-bold">
                {m.label === "Similar Products Found" ? (
                  <AnimatedCounter value={1284} active={inView} />
                ) : (
                  m.display
                )}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold">{m.label}</p>
            {m.label === "Customer Rating" ? (
              <Rating className="mt-2" value={4.6} />
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">Updated moments ago</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
