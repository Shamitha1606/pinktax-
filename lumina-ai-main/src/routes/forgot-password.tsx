import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, MailCheck, Send } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — SentraAI" },
      { name: "description", content: "Request a secure password reset link for SentraAI." },
      { property: "og:title", content: "Reset your password — SentraAI" },
      { property: "og:description", content: "Request a secure password reset link." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Reset link sent", { description: email });
    }, 1200);
  };

  if (sent) {
    return (
      <AuthLayout title="Check your inbox" subtitle="We sent a secure reset link your way.">
        <div className="flex flex-col items-center py-6 text-center animate-rise">
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-primary/15">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/25" />
            <MailCheck className="h-10 w-10 text-primary" />
          </span>
          <p className="mt-5 text-sm text-muted-foreground">
            A reset link is on its way to <span className="text-foreground">{email}</span>. It
            expires in 15 minutes.
          </p>
          <Button variant="hero" className="mt-6" asChild>
            <Link to="/login">Back to login</Link>
          </Button>
          <button
            onClick={() => setSent(false)}
            className="mt-3 text-xs text-muted-foreground hover:text-primary"
          >
            Use a different email
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link to="/login" className="font-medium text-primary hover:underline">
          Back to login
        </Link>
      }
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="h-11 rounded-xl border-input bg-secondary/40 focus-visible:border-primary/60"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <Send />}
          {loading ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </AuthLayout>
  );
}
