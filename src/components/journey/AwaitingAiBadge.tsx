export function AwaitingAiBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-border px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-faint">
      <span className="h-1.5 w-1.5 rounded-full bg-ember/70" aria-hidden />
      Awaiting AI integration
    </span>
  );
}

export function AwaitingAiNotice({ feature }: { feature: string }) {
  return (
    <div role="note" className="flex gap-4 border-l-2 border-ember/60 bg-secondary/70 px-5 py-4">
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ember fire-glow" aria-hidden />
      <div className="text-sm leading-relaxed">
        <p className="font-medium text-foreground">{feature} is awaiting AI integration.</p>
        <p className="mt-1 text-muted-foreground">
          Its answers will appear here once the companion is connected. Nothing on this page is
          generated — the reference notes below are written by hand.
        </p>
      </div>
    </div>
  );
}
