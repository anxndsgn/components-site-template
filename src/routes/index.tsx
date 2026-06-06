import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Blocks, FileCode2, TableProperties } from "lucide-react";
import type { ReactNode } from "react";
import { CodeSnippet } from "../components/docs/code-snippet";

const buttonLinkClass =
  "inline-flex min-h-[42px] items-center justify-center gap-2 rounded-md bg-primary px-3.5 text-sm font-bold text-primary-foreground transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-primary/90 active:scale-[0.96] max-md:w-full";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="mx-auto w-[min(1120px,calc(100vw_-_40px))] py-14 max-md:w-[min(calc(100%_-_28px),940px)] max-md:pt-9">
      <section
        className="grid [grid-template-columns:minmax(0,1.2fr)_minmax(280px,0.8fr)] items-stretch gap-8 max-md:grid-cols-1"
        aria-labelledby="overview-title"
      >
        <div className="flex min-h-[460px] flex-col justify-center py-8 max-md:min-h-0">
          <p className="m-0 mb-3 text-xs font-bold text-muted-foreground uppercase">
            Documentation template
          </p>
          <h1
            id="overview-title"
            className="m-0 max-w-[780px] text-[clamp(2.25rem,6vw,5.4rem)] leading-[0.96] text-balance max-md:text-4xl max-md:leading-[1.02]"
          >
            Component docs with previews and registry output.
          </h1>
          <p className="mt-5 max-w-[660px] text-[1.06rem] leading-7 text-pretty text-muted-foreground">
            A ready app shell for component libraries: MDX content, preview and source views, props
            documentation, command snippets, and shadcn registry generation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 max-md:flex-col max-md:items-stretch">
            <Link to="/docs/$" params={{ _splat: "components/button" }} className={buttonLinkClass}>
              View sample docs
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <CodeSnippet command="npm run registry:build" />
          </div>
        </div>

        <div
          className="grid min-h-[460px] content-center gap-2.5 max-md:min-h-0"
          aria-label="Template features"
        >
          <Feature
            icon={<Blocks size={18} aria-hidden="true" />}
            title="Previewable docs"
            text="Use MDX pages with embedded demos and source tabs."
          />
          <Feature
            icon={<FileCode2 size={18} aria-hidden="true" />}
            title="Fuma MDX source"
            text="Load content through fumadocs-mdx and fumadocs-core."
          />
          <Feature
            icon={<TableProperties size={18} aria-hidden="true" />}
            title="Structured APIs"
            text="Keep prop tables close to each component page."
          />
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="grid grid-cols-[42px_minmax(0,1fr)] gap-3.5 rounded-lg border border-border bg-card p-[18px]">
      <div className="grid h-[42px] w-[42px] place-items-center rounded-md bg-accent text-accent-foreground">
        {icon}
      </div>
      <div>
        <h2 className="m-0 text-base">{title}</h2>
        <p className="mt-1.5 text-[0.92rem] leading-6 text-pretty text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
