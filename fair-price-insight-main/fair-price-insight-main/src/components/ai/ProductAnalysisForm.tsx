import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, CloudCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, emptyDraft, type ProductDraft } from "@/lib/pricing";

const stepMeta = [
  { title: "Product Information", hint: "Identity, pricing and pack size" },
  { title: "Product Details", hint: "What the product actually contains" },
  { title: "Review & Analyse", hint: "Confirm before the model runs" },
];

type Errors = Partial<Record<keyof ProductDraft, string>>;

export function ProductAnalysisForm({
  onSubmit,
}: {
  onSubmit: (draft: ProductDraft) => void;
}) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const [errors, setErrors] = useState<Errors>({});
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const filled = useMemo(
    () => Object.values(draft).filter((v) => v.trim().length > 0).length,
    [draft],
  );

  useEffect(() => {
    if (filled === 0) return;
    const t = setTimeout(
      () =>
        setSavedAt(
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        ),
      900,
    );
    return () => clearTimeout(t);
  }, [draft, filled]);

  const set = (key: keyof ProductDraft) => (value: string) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (index: number) => {
    const e: Errors = {};
    if (index === 0) {
      if (!draft.name.trim()) e.name = "Product name is required";
      if (!draft.brand.trim()) e.brand = "Brand name is required";
      if (!draft.price.trim() || Number(draft.price) <= 0)
        e.price = "Enter a valid price";
      if (!draft.weight.trim()) e.weight = "Weight is required";
      if (!draft.quantity.trim()) e.quantity = "Quantity is required";
      if (!draft.category) e.category = "Pick a category";
    }
    if (index === 1) {
      if (draft.description.trim().length < 15)
        e.description = "Add at least 15 characters so NLP has context";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) {
      toast.error("Some fields need attention", {
        description: "Fix the highlighted inputs to continue.",
      });
      return;
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  return (
    <div className="glass animate-rise rounded-4xl p-6 sm:p-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-primary">
            Step {step + 1} of 3
          </p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
            {stepMeta[step]!.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{stepMeta[step]!.hint}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CloudCheck className="size-4 text-accent" />
          {savedAt ? `Draft auto-saved at ${savedAt}` : "Draft saves as you type"}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        {stepMeta.map((s, i) => (
          <div key={s.title} className="flex flex-1 items-center gap-3">
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-500 ${
                i < step
                  ? "border-accent bg-accent text-accent-foreground"
                  : i === step
                    ? "border-primary text-primary shadow-[0_0_24px_-6px_var(--primary)]"
                    : "border-border text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="size-4" /> : i + 1}
            </div>
            {i < stepMeta.length - 1 && (
              <div className="h-px flex-1 bg-border">
                <div
                  className="h-px bg-primary transition-all duration-700"
                  style={{ width: i < step ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div key={step} className="animate-rise mt-8">
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Product Name" error={errors.name}>
              <Input
                value={draft.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="Premium Almond Butter"
              />
            </Field>
            <Field label="Brand Name" error={errors.brand}>
              <Input
                value={draft.brand}
                onChange={(e) => set("brand")(e.target.value)}
                placeholder="NutriCraft"
              />
            </Field>
            <Field label="Current Price (₹)" error={errors.price}>
              <Input
                type="number"
                value={draft.price}
                onChange={(e) => set("price")(e.target.value)}
                placeholder="240"
              />
            </Field>
            <Field label="Weight" error={errors.weight}>
              <Input
                value={draft.weight}
                onChange={(e) => set("weight")(e.target.value)}
                placeholder="500 g"
              />
            </Field>
            <Field label="Quantity" error={errors.quantity}>
              <Input
                value={draft.quantity}
                onChange={(e) => set("quantity")(e.target.value)}
                placeholder="1 jar"
              />
            </Field>
            <Field label="Category" error={errors.category}>
              <Select value={draft.category} onValueChange={set("category")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-5">
            <Field label="Ingredients" error={errors.ingredients}>
              <Textarea
                rows={3}
                value={draft.ingredients}
                onChange={(e) => set("ingredients")(e.target.value)}
                placeholder="Roasted almonds (100%)"
              />
            </Field>
            <Field label="Features" error={errors.features}>
              <Textarea
                rows={3}
                value={draft.features}
                onChange={(e) => set("features")(e.target.value)}
                placeholder="No added sugar, cold pressed, glass jar"
              />
            </Field>
            <Field label="Product Description" error={errors.description}>
              <Textarea
                rows={5}
                value={draft.description}
                onChange={(e) => set("description")(e.target.value)}
                placeholder="Describe the product the way it appears on the label..."
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(draft) as (keyof ProductDraft)[]).map((k) => (
              <div
                key={k}
                className="rounded-2xl border border-border/70 bg-card/40 px-4 py-3"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {k}
                </p>
                <p className="mt-1 truncate text-sm">
                  {draft[k] || <span className="text-muted-foreground">—</span>}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-9 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button
          variant="ghost"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          <ArrowLeft className="size-4" /> Back
        </Button>
        {step < 2 ? (
          <Button onClick={next} className="sm:min-w-44">
            Continue <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            className="sm:min-w-52"
            onClick={() => {
              toast.success("Analysis queued", {
                description: "The pricing model is starting now.",
              });
              onSubmit(draft);
            }}
          >
            <Sparkles className="size-4" /> Run AI Analysis
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
