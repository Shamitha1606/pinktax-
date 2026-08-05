import { useRef, useState } from "react";
import { ImagePlus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ImageUpload({
  file,
  onChange,
  onAnalyze,
}: {
  file: string | null;
  onChange: (dataUrl: string | null, name?: string) => void;
  onAnalyze?: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Unsupported file", { description: "Please upload a PNG or JPG image." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string, f.name);
      toast.success("Image ready", { description: f.name });
    };
    reader.readAsDataURL(f);
  };

  return (
    <div className="glass rounded-3xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Product image</h3>
          <p className="text-sm text-muted-foreground">
            Drop a photo to enrich identification accuracy.
          </p>
        </div>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
          Future enhancement
        </span>
      </div>

      {file ? (
        <div className="group relative mt-5 overflow-hidden rounded-2xl border border-border">
          <img src={file} alt="Uploaded product preview" className="h-56 w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove image"
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "mt-5 grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all duration-300",
            dragging
              ? "border-primary bg-primary/10 scale-[1.01]"
              : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50",
          )}
        >
          <ImagePlus className="h-9 w-9 text-primary" />
          <p className="mt-3 text-sm font-medium">Drag &amp; drop your product image</p>
          <p className="text-xs text-muted-foreground">or click to browse — PNG, JPG up to 5MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {onAnalyze ? (
        <Button variant="hero" className="mt-5 w-full" onClick={onAnalyze}>
          <Sparkles /> AI Analyze Product
        </Button>
      ) : null}
    </div>
  );
}
