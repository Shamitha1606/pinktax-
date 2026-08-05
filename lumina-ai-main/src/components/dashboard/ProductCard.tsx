import { Boxes, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export type Product = {
  name: string;
  brand: string;
  category: string;
  barcode: string;
  score: number;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/analyze"
      search={{ product: product.name }}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-secondary/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary/50"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground">
        <Boxes className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{product.name}</p>
        <p className="truncate text-xs text-muted-foreground">
          {product.brand} · {product.category} · {product.barcode}
        </p>
      </div>
      <span className="hidden text-right sm:block">
        <span className="block text-sm font-semibold text-primary">{product.score}</span>
        <span className="block text-[11px] text-muted-foreground">AI score</span>
      </span>
      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
    </Link>
  );
}
