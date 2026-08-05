import type { ReactNode } from "react";
import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  Menu,
  ScanBarcode,
  Settings,
  Sparkles,
  History,
} from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const nav = [
  { title: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { title: "Analyze", to: "/analyze", icon: Sparkles },
];

const soon = [
  { title: "Scan history", icon: History },
  { title: "Barcode library", icon: ScanBarcode },
  { title: "Settings", icon: Settings },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1">
      {nav.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0_0_var(--primary)]"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
            )}
          >
            <item.icon className={cn("h-4 w-4", active && "text-primary")} />
            {item.title}
          </Link>
        );
      })}
      <p className="mt-5 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
        Coming soon
      </p>
      {soon.map((item) => (
        <span
          key={item.title}
          className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground/50"
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </span>
      ))}
    </nav>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const initials = (user?.fullName ?? "User")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    logout();
    toast.success("Signed out", { description: "See you soon." });
    navigate({ to: "/login", replace: true });
  };

  return (
    <div className="aurora min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar/80 p-5 backdrop-blur-xl lg:flex">
        <Logo to="/dashboard" />
        <div className="mt-8 flex-1">
          <NavList />
        </div>
        <div className="glass rounded-2xl p-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Module 1</p>
          <p className="mt-1">Auth &amp; product scanning is live. AI engine hookup next.</p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-background/70 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-5">
                <Logo to="/dashboard" />
                <div className="mt-8">
                  <NavList onNavigate={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            <div className="lg:hidden">
              <Logo to="/dashboard" />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                onClick={() => toast("No new notifications", { description: "You're all caught up." })}
                className="relative"
              >
                <Bell />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full border border-border bg-secondary/40 py-1 pl-1 pr-3 transition-colors hover:border-primary/40">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-bold text-primary-foreground">
                      {initials}
                    </span>
                    <span className="hidden text-sm sm:block">
                      {user?.fullName?.split(" ")[0] ?? "User"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="truncate">
                    {user?.email ?? "guest@sentra.ai"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
