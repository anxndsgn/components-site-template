import type { ReactNode } from "react";

export function DocsArticle({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <article>
      <header className="pb-8">
        <p className="m-0 mb-3 text-xs font-bold uppercase text-accent">Component</p>
        <h1 className="m-0 max-w-[760px] text-balance text-[clamp(2rem,4vw,3.1rem)] leading-[1.05] max-md:text-4xl max-md:leading-[1.02]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-[680px] text-pretty text-base leading-7 text-muted">
            {description}
          </p>
        ) : null}
      </header>
      <div className="grid gap-6 [&>*]:min-w-0 [&_a]:font-semibold [&_a]:text-accent [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-3 [&_h2]:mt-5 [&_h2]:text-[1.45rem] [&_h3]:mt-2 [&_h3]:text-[1.05rem] [&_li]:leading-7 [&_li]:text-muted [&_p]:text-pretty [&_p]:leading-7 [&_p]:text-muted">
        {children}
      </div>
    </article>
  );
}
