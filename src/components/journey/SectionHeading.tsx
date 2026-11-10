import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  id?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, id, className }: Props) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="eyebrow flex items-center gap-3 text-journey">
        <span className="h-px w-8 bg-journey/60" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 font-display text-4xl font-light leading-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  );
}
