import { ScanLine, Sparkles, Barcode } from "lucide-react";

export function ScanIllustration() {
  return (
    <div className="glass relative w-full max-w-sm overflow-hidden rounded-3xl p-6 animate-float">
      <div className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-primary)] opacity-70" />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-primary" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Live scan
        </span>
        <span>engine v2.4</span>
      </div>

      <div className="relative mt-4 h-56 overflow-hidden rounded-2xl border border-border bg-secondary/40">
        <div className="absolute inset-6 rounded-xl border border-dashed border-primary/40" />
        <div className="absolute left-0 right-0 top-0 h-16 animate-scanline bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--primary)_35%,transparent))]" />
        <div className="grid h-full place-items-center">
          <Barcode className="h-24 w-24 text-primary/70" strokeWidth={1.2} />
        </div>
        <span className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-primary" />
        <span className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary" />
        <span className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-primary" />
        <span className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-primary" />
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2.5 text-sm">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <ScanLine className="h-4 w-4 text-primary" /> Barcode matched
          </span>
          <span className="font-medium text-success">98.4%</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2.5 text-sm">
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" /> AI insight ready
          </span>
          <span className="font-medium text-primary">2.1s</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/60">
          <div className="shimmer h-full w-2/3 rounded-full bg-[image:var(--gradient-primary)]" />
        </div>
      </div>
    </div>
  );
}
