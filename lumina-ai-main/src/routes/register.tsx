import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordScore, strengthMeta, useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — SentraAI" },
      {
        name: "description",
        content: "Register for SentraAI and start analyzing products with AI insights.",
      },
      { property: "og:title", content: "Create your account — SentraAI" },
      { property: "og:description", content: "Register and start analyzing products with AI." },
    ],
  }),
  component: RegisterPage,
});

const empty = { fullName: "", email: "", phone: "", password: "", confirm: "" };

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const score = passwordScore(values.password);
  const meta = strengthMeta[score] ?? strengthMeta[0]!;

  const set = (key: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (values.fullName.trim().length < 3) next["fullName"] = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next["email"] = "Enter a valid email.";
    if (!/^[0-9+\-\s()]{8,16}$/.test(values.phone)) next["phone"] = "Enter a valid phone number.";
    if (values.password.length < 8) next["password"] = "Use at least 8 characters.";
    if (values.password !== values.confirm) next["confirm"] = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      });
      setDone(true);
      toast.success("Account created", { description: "Redirecting to your dashboard…" });
      setTimeout(() => navigate({ to: "/dashboard" }), 1800);
    } catch (err) {
      toast.error("Registration failed", { description: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <AuthLayout title="You're all set" subtitle="Your SentraAI account is ready.">
        <div className="flex flex-col items-center py-6 text-center animate-rise">
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-success/15">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-success/30" />
            <CheckCircle2 className="h-10 w-10 text-success" />
          </span>
          <p className="mt-5 text-lg font-semibold">Registration successful</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Taking you to your dashboard in a moment…
          </p>
          <Button variant="hero" className="mt-6" asChild>
            <Link to="/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register to scan, search and analyze products."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        {(
          [
            ["fullName", "Full Name", "text", "Ada Okoye"],
            ["email", "Email", "email", "you@company.com"],
            ["phone", "Phone Number", "tel", "+1 555 018 2299"],
          ] as const
        ).map(([key, label, type, placeholder]) => (
          <div key={key} className="space-y-1.5">
            <Label htmlFor={key}>{label}</Label>
            <Input
              id={key}
              type={type}
              placeholder={placeholder}
              value={values[key]}
              onChange={set(key)}
              className={cn(
                "h-11 rounded-xl border-input bg-secondary/40 focus-visible:border-primary/60",
                errors[key] && "border-destructive",
              )}
            />
            {errors[key] && <p className="text-xs text-destructive">{errors[key]}</p>}
          </div>
        ))}

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            value={values.password}
            onChange={set("password")}
            placeholder="••••••••"
            invalid={Boolean(errors["password"])}
          />
          <div className="flex items-center gap-2 pt-1">
            <div className="flex flex-1 gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-all duration-500",
                    i < score ? meta.tone : "bg-secondary",
                  )}
                />
              ))}
            </div>
            <span className="w-20 text-right text-xs text-muted-foreground">
              {values.password ? meta.label : ""}
            </span>
          </div>
          {errors["password"] && <p className="text-xs text-destructive">{errors["password"]}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm Password</Label>
          <PasswordInput
            id="confirm"
            value={values.confirm}
            onChange={set("confirm")}
            placeholder="••••••••"
            invalid={Boolean(errors["confirm"])}
          />
          {errors["confirm"] && <p className="text-xs text-destructive">{errors["confirm"]}</p>}
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <UserPlus />}
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
