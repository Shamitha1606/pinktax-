import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { LandingSection } from "@/components/recommendation/landing-section";
import { DashboardSection } from "@/components/recommendation/dashboard-section";
import { ComparisonSection } from "@/components/recommendation/comparison-section";
import { SavingsSection } from "@/components/recommendation/savings-section";
import { ExplanationSection } from "@/components/recommendation/explanation-section";
import { RecommendationList } from "@/components/recommendation/recommendation-list";
import { TrustSection } from "@/components/recommendation/trust-section";
import { PurchaseSection } from "@/components/recommendation/purchase-section";
import { DashboardSkeleton, ListSkeleton } from "@/components/recommendation/skeletons";
import { bestAlternative, type Product } from "@/lib/recommendation-data";

const title = "Smart Recommendation Engine — AI Alternatives That Save You Money";
const description =
  "AI compares thousands of products and recommends better-value alternatives by price, similarity, fairness score, features and rating.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [stage, setStage] = useState<"landing" | "loading" | "results">("landing");
  const [selected, setSelected] = useState<Product>(bestAlternative);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const comparisonRef = useRef<HTMLDivElement | null>(null);

  const run = useCallback(() => {
    setStage("loading");
    toast.info("Scanning 1,284 similar products…");
    setTimeout(() => {
      setStage("results");
      toast.success("3 better alternatives found — up to ₹42 saved");
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        80,
      );
    }, 1600);
  }, []);

  const select = useCallback((p: Product) => {
    setSelected(p);
    toast.success(`Comparing ${p.name} · ${p.similarity}% similar`);
    setTimeout(
      () => comparisonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80,
    );
  }, []);

  return (
    <main>
      <h1 className="sr-only">Smart Recommendation Engine</h1>
      <LandingSection onStart={run} loading={stage === "loading"} />

      {stage === "loading" ? (
        <div className="space-y-12 px-4 pb-16">
          <DashboardSkeleton />
          <ListSkeleton />
        </div>
      ) : null}

      {stage === "results" ? (
        <div ref={resultsRef}>
          <DashboardSection onSelect={select} />
          <div ref={comparisonRef}>
            <ComparisonSection alternative={selected} />
          </div>
          <SavingsSection alternative={selected} />
          <ExplanationSection alternative={selected} />
          <RecommendationList selectedId={selected.id} onSelect={select} />
          <TrustSection />
          <PurchaseSection
            alternative={selected}
            onViewProduct={() => toast.info("Product page integration coming soon")}
            onCompareAgain={() =>
              comparisonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            onAnalyzeAnother={() => {
              setStage("landing");
              setSelected(bestAlternative);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      ) : null}
    </main>
  );
}
