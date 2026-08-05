import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Step = { title: string; caption: string };

export function ProgressStepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <ol className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-2">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step.title} className="flex flex-1 items-start gap-3">
            <span
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-all duration-500",
                done && "border-transparent bg-success text-success-foreground",
                active &&
                  "border-transparent bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]",
                !done && !active && "border-border bg-secondary/50 text-muted-foreground",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-sm font-medium transition-colors",
                  active || done ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">{step.caption}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary/60">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    done
                      ? "w-full bg-success"
                      : active
                        ? "w-1/2 bg-[image:var(--gradient-primary)]"
                        : "w-0",
                  )}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
