import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sparkles, TrendingUp, ScanBarcode, Search } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ProductSearchCard } from "@/components/dashboard/ProductSearchCard";
import { BarcodeScannerCard } from "@/components/dashboard/BarcodeScannerCard";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SentraAI" },
      {
        name: "description",
        content: "Search products, scan barcodes and send items to the SentraAI analysis engine.",
      },
      { property: "og:title", content: "Dashboard — SentraAI" },
      { property: "og:description", content: "Search, scan and analyze products in one place." },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { label: "Products scanned", value: "128", icon: ScanBarcode },
  { label: "AI analyses", value: "94", icon: Sparkles },
  { label: "Accuracy", value: "98.4%", icon: TrendingUp },
];

function DashboardPage() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const [recent, setRecent] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", replace: true });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="aurora min-h-screen p-6">
        <div className="mx-auto max-w-4xl space-y-4">
          <Skeleton className="h-16 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      </div>
    );
  }

  const addRecent = (term: string) =>
    setRecent((r) => [term, ...r.filter((x) => x !== term)].slice(0, 5));

  return (
    <DashboardShell>
      <div className="space-y-6">
        <section className="glass animate-rise relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
          <p className="text-sm text-muted-foreground">Welcome back,</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            <span className="text-gradient">{user.fullName.split(" ")[0]}</span>
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Start a new product analysis or pick up where you left off.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="hero" asChild>
              <Link to="/analyze">
                New analysis <ArrowRight />
              </Link>
            </Button>
            <Button variant="glass" asChild>
              <a href="#search">
                <Search /> Search products
              </a>
            </Button>
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/30 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <s.icon className="h-5 w-5 text-primary" />
                <div>
                  <dt className="text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="font-display text-xl font-bold">{s.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        <section id="search" className="grid gap-6 lg:grid-cols-2">
          <ProductSearchCard recent={recent} onSearched={addRecent} />
          <div className="space-y-6">
            <BarcodeScannerCard />
            <ImageUpload
              file={image}
              onChange={(v) => setImage(v)}
              onAnalyze={() => navigate({ to: "/analyze", search: { product: "" } })}
            />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
