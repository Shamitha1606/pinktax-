import { Link } from "@tanstack/react-router";
import { ScanLine } from "lucide-react";

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="group flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 group-hover:scale-105">
        <ScanLine className="h-5 w-5" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Sentra<span className="text-primary">AI</span>
      </span>
    </Link>
  );
}
