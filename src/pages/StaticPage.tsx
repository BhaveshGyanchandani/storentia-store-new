import { ReactNode } from "react";

interface StaticPageProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export function StaticPage({ eyebrow, title, children }: StaticPageProps) {
  return (
    <div className="pt-28 pb-24">
      <div className="container-px max-w-2xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="font-display text-3xl md:text-4xl mb-8">{title}</h1>
        <div className="prose-content space-y-5 text-sm leading-relaxed text-ink-soft [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-ink [&_h2]:mt-8 [&_h2]:mb-2">
          {children}
        </div>
      </div>
    </div>
  );
}
