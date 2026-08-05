import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Cpu, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { ProgressStepper } from "@/components/ProgressStepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/analyze")({
  validateSearch: (search: Record<string, unknown>) => ({
    product: typeof search["product"] === "string" ? search["product"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Product Submission — SentraAI" },
      {
        name: "description",
        content: "Submit a product name, barcode and image to the SentraAI identification engine.",
      },
      { property: "og:title", content: "Product Submission — SentraAI" },
      { property: "og:description", content: "Submit products for AI identification and analysis." },
    ],
  }),
  component: AnalyzePage,
});

const steps = [
  { title: "Product Input", caption: "Name, barcode & image" },
  { title: "Product Identification", caption: "Matching against index" },
  { title: "AI Analysis", caption: "Generating insights" },
];

function AnalyzePage() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const { product } = Route.useSearch();

  const [name, setName] = useState(product);
  const [barcode, setBarcode] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "identifying" | "identified" | "forwarding">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", replace: true });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="aurora min-h-screen p-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-72 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError("Product name is required (min 2 characters).");
      return;
    }
    setError("");
    setStep(1);
    setStatus("identifying");
    setTimeout(() => {
      setStatus("identified");
      toast.success("Product successfully identified");
      setTimeout(() => {
        setStep(2);
        setStatus("forwarding");
      }, 1200);
    }, 2200);
  };

  const reset = () => {
    setStep(0);
    setStatus("idle");
    setName("");
    setBarcode("");
    setImage(null);
  };

  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <h1 className="text-2xl font-bold sm:text-3xl">Product submission</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Give us a name — barcode and image are optional but improve accuracy.
          </p>
        </header>

        <section className="glass rounded-3xl p-5 sm:p-6">
          <ProgressStepper steps={steps} current={step} />
        </section>

        {step === 0 ? (
          <form onSubmit={submit} className="animate-rise space-y-6">
            <div className="glass space-y-4 rounded-3xl p-5 sm:p-6">
              <div className="space-y-1.5">
                <Label htmlFor="name">Product name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aurora Vitamin C Serum"
                  className={cn(
                    "h-12 rounded-xl border-input bg-secondary/40 text-base focus-visible:border-primary/60",
                    error && "border-destructive",
                  )}
                />
                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="barcode">Barcode (optional)</Label>
                <Input
                  id="barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="8901234567890"
                  className="h-12 rounded-xl border-input bg-secondary/40 font-mono text-base focus-visible:border-primary/60"
                />
              </div>
            </div>

            <ImageUpload file={image} onChange={(v) => setImage(v)} />

            <Button type="submit" variant="hero" size="lg" className="w-full">
              <Sparkles /> Identify product
            </Button>
          </form>
        ) : (
          <section className="glass animate-rise rounded-3xl p-8 text-center">
            {status === "identifying" ? (
              <>
                <span className="relative mx-auto grid h-24 w-24 place-items-center">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/25" />
                  <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-primary/50" />
                  <Loader2 className="h-9 w-9 animate-spin text-primary" />
                </span>
                <p className="mt-6 text-lg font-semibold">Identifying Product…</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Matching “{name}” against the product index.
                </p>
              </>
            ) : (
              <>
                <span className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-success/15">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-success/25" />
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </span>
                <p className="mt-6 text-lg font-semibold">Product Successfully Identified</p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Cpu className="h-4 w-4 text-primary" />
                  Forwarding product details to AI Engine
                </p>

                <dl className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm">
                  {[
                    ["Product", name],
                    ["Barcode", barcode || "—"],
                    ["Image", image ? "Attached" : "Not provided"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between rounded-xl bg-secondary/40 px-4 py-2.5"
                    >
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="max-w-[60%] truncate font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>

                {status === "forwarding" && (
                  <div className="mx-auto mt-6 max-w-sm">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/60">
                      <div className="shimmer h-full w-3/4 rounded-full bg-[image:var(--gradient-primary)]" />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      AI analysis module arrives in Module 2.
                    </p>
                  </div>
                )}

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button variant="glass" onClick={reset}>
                    <RotateCcw /> Submit another
                  </Button>
                  <Button variant="hero" asChild>
                    <Link to="/dashboard">Back to dashboard</Link>
                  </Button>
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </DashboardShell>
  );
}
