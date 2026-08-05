import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductAnalysisForm } from "@/components/ai/ProductAnalysisForm";
import { ProcessingScreen } from "@/components/ai/ProcessingScreen";
import { ResultDashboard } from "@/components/ai/ResultDashboard";
import { buildResult, type AnalysisResult, type ProductDraft } from "@/lib/pricing";
import { toast } from "sonner";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Run a Fair Pricing Analysis — AI Fair Pricing" },
      {
        name: "description",
        content:
          "Submit product details and get an AI fair price prediction, similarity score, fairness gauge and explanation.",
      },
      { property: "og:title", content: "Run a Fair Pricing Analysis" },
      {
        property: "og:description",
        content:
          "Multi-step product intake, live AI processing and an explainable fair pricing dashboard.",
      },
    ],
  }),
  component: AnalyzePage,
});

type Phase = "form" | "processing" | "result";

function AnalyzePage() {
  const [phase, setPhase] = useState<Phase>("form");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [draft, setDraft] = useState<ProductDraft | null>(null);

  return (
    <main className="relative min-h-screen">
      <div className="grid-noise pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground">
              <Link to="/">
                <ArrowLeft className="size-4" /> Back to overview
              </Link>
            </Button>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              <span className="text-aurora">AI Fair Pricing Analysis</span>
            </h1>
          </div>
          {phase === "result" && (
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setPhase("form");
                setResult(null);
                toast("Ready for a new analysis");
              }}
            >
              <RotateCcw className="size-4" /> New analysis
            </Button>
          )}
        </header>

        {phase === "form" && (
          <ProductAnalysisForm
            onSubmit={(d) => {
              setDraft(d);
              setPhase("processing");
            }}
          />
        )}

        {phase === "processing" && (
          <ProcessingScreen
            onDone={() => {
              setResult(buildResult(draft ?? ({} as ProductDraft)));
              setPhase("result");
              toast.success("Fair pricing report ready");
            }}
          />
        )}

        {phase === "result" && result && <ResultDashboard result={result} />}
      </div>
    </main>
  );
}
