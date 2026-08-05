import { useState } from "react";
import { Brain, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading, useInView } from "./primitives";
import type { Product } from "@/lib/recommendation-data";

export function ExplanationSection({ alternative }: { alternative: Product }) {
  const [open, setOpen] = useState(true);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  const factors = [
    { label: "Similarity", value: `${alternative.similarity}%`, weight: alternative.similarity },
    { label: "Fairness gain", value: "+43 pts", weight: 86 },
    { label: "Price advantage", value: "17% lower", weight: 72 },
    { label: "Rating uplift", value: "+0.5 ⭐", weight: 64 },
  ];

  return (
    <section className="px-4 py-16">
      <SectionHeading
        eyebrow="Step 04 · Explainable AI"
        title="Why AI Recommended This Product?"
        description="Every recommendation is traceable back to the signals that produced it."
      />

      <div ref={ref} className="glass mx-auto mt-12 max-w-4xl rounded-3xl p-6 sm:p-8">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-left"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-aurora text-primary-foreground">
              <Brain className={cn("size-5", inView && "animate-pulse")} />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">AI reasoning for {alternative.name}</p>
              <p className="text-xs text-muted-foreground">
                4 weighted signals · 96% confidence
              </p>
            </div>
          </div>
          <ChevronDown
            className={cn("size-5 shrink-0 transition-transform", open && "rotate-180")}
          />
        </button>

        <div
          className={cn(
            "grid transition-all duration-500",
            open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              This alternative provides{" "}
              <mark className="rounded bg-primary/15 px-1 text-primary">
                almost identical features
              </mark>{" "}
              at a lower price. The similarity score is{" "}
              <mark className="rounded bg-primary/15 px-1 text-primary">
                {alternative.similarity}%
              </mark>
              , while maintaining a{" "}
              <mark className="rounded bg-savings/15 px-1 text-savings">
                better fairness score
              </mark>{" "}
              and customer rating.
            </p>

            <div className="mt-6 space-y-4">
              {factors.map((f, i) => (
                <div key={f.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium">{f.label}</span>
                    <span className="text-muted-foreground">{f.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-aurora"
                      style={{
                        width: inView && open ? `${f.weight}%` : "0%",
                        transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${i * 140}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
