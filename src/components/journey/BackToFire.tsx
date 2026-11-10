import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BackToFire({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-firelight transition-colors hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className,
      )}
    >
      <span aria-hidden>←</span> Return to the fire
    </Link>
  );
}
