import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
      <Link
        to="/"
        className="font-display text-lg tracking-[0.3em] text-foreground transition-colors hover:text-firelight focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        THE BONFIRE
      </Link>
      <nav className="flex items-center gap-8">
        <span className="eyebrow hidden md:inline">A companion for the journey</span>
        <Link
          to="/about"
          className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          activeProps={{ className: "text-foreground" }}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
