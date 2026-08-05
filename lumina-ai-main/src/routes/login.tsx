import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn, Github, Chrome } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — SentraAI" },
      { name: "description", content: "Sign in to your SentraAI product analysis dashboard." },
      { property: "og:title", content: "Login — SentraAI" },
      { property: "og:description", content: "Sign in to your SentraAI dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next["email"] = "Enter a valid email.";
    if (!values.password) next["password"] = "Password is required.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const user = await login(values.email, values.password);
      toast.success(`Welcome back, ${user.fullName.split(" ")[0]}`);
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error("Login failed", { description: (err as Error).message });
      setErrors({ password: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue analyzing products."
      footer={
        <>
          New to SentraAI?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            placeholder="you@company.com"
            className="h-11 rounded-xl border-input bg-secondary/40 focus-visible:border-primary/60"
          />
          {errors["email"] && <p className="text-xs text-destructive">{errors["email"]}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            placeholder="••••••••"
            invalid={Boolean(errors["password"])}
          />
          {errors["password"] && <p className="text-xs text-destructive">{errors["password"]}</p>}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
            <Checkbox /> Remember me
          </label>
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <LogIn />}
          {loading ? "Signing in…" : "Login"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or continue with
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Google", icon: Chrome },
          { label: "GitHub", icon: Github },
        ].map((p) => (
          <Button
            key={p.label}
            variant="outline"
            onClick={() => toast("Social login coming soon", { description: `${p.label} SSO` })}
          >
            <p.icon /> {p.label}
          </Button>
        ))}
      </div>
    </AuthLayout>
  );
}
