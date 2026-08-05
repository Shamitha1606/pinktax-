import { Camera, ScanBarcode } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function BarcodeScannerCard() {
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
      <span className="absolute right-5 top-5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
        Coming soon
      </span>

      <div className="flex items-center gap-2">
        <ScanBarcode className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold">Scan Barcode</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Point your camera at the barcode for instant identification.
      </p>

      <div className="relative mt-5 h-48 overflow-hidden rounded-2xl border border-dashed border-accent/40 bg-secondary/30">
        <div className="absolute left-0 right-0 top-0 h-14 animate-scanline bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--accent)_35%,transparent))]" />
        <div className="grid h-full place-items-center">
          <ScanBarcode className="h-16 w-16 text-accent/60" strokeWidth={1.2} />
        </div>
      </div>

      <Button
        variant="glass"
        className="mt-5 w-full"
        onClick={() =>
          toast("Camera scanning is coming soon", {
            description: "Barcode capture ships in the next module.",
          })
        }
      >
        <Camera /> Start camera scan
      </Button>
    </div>
  );
}
