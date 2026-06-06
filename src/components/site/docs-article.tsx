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
        <h1 className="m-0 max-w-190 text-[clamp(2rem,4vw,3.1rem)] leading-[1.05] text-balance max-md:text-4xl max-md:leading-[1.02]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-170 text-base leading-7 text-pretty text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>
      <div className="grid gap-6 *:min-w-0 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-3 [&_h2]:mt-5 [&_h2]:text-[1.45rem] [&_h3]:mt-2 [&_h3]:text-[1.05rem] [&_li]:leading-7 [&_li]:text-muted-foreground [&_p]:leading-7 [&_p]:text-pretty [&_p]:text-muted-foreground">
        {children}
      </div>
    </article>
  );
}
