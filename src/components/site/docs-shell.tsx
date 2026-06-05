import type { ReactNode } from "react";
import { AnchorProvider, TOCItem } from "fumadocs-core/toc";

export type DocsNavItem = {
  title: string;
  description?: string;
  url: string;
};

export type DocsNavNode =
  | {
      type: "page";
      title: string;
      description?: string;
      url: string;
    }
  | {
      type: "folder";
      title: string;
      url?: string;
      children: Array<DocsNavNode>;
    }
  | {
      type: "separator";
      title?: string;
    };

export type DocsNavTree = {
  title: string;
  nodes: Array<DocsNavNode>;
};

export type DocsTocItem = {
  title: string;
  url: string;
  depth: number;
};

export function DocsShell({
  navTree,
  currentUrl,
  toc = [],
  children,
}: {
  navTree: DocsNavTree;
  currentUrl: string;
  toc?: Array<DocsTocItem>;
  children: ReactNode;
}) {
  return (
    <AnchorProvider toc={toc} single>
      <main className="grid min-h-[calc(100vh-64px)] grid-cols-[264px_minmax(0,1fr)] [@media(min-width:1340px)]:grid-cols-[264px_minmax(0,1fr)_240px] max-md:grid-cols-1">
        <aside
          className="border-r border-line max-md:border-r-0 max-md:border-b"
          aria-label="Documentation navigation"
        >
          <div className="sticky top-16 grid max-h-[calc(100vh-64px)] gap-6 overflow-auto py-4 pr-4 pb-10 pl-4 max-md:static max-md:max-h-none max-md:gap-3.5 max-md:overflow-visible max-md:px-3.5 max-md:py-4.5">
            <nav className="grid gap-1" aria-label="Docs pages">
              {navTree.nodes.map((node, index) => (
                <DocsSidebarNode
                  key={getNavNodeKey(node, index)}
                  node={node}
                  currentUrl={currentUrl}
                />
              ))}
            </nav>
          </div>
        </aside>

        <section className="mx-auto min-w-0 w-[min(100%,940px)] px-10 py-12 pb-[72px] max-md:w-[min(calc(100%_-_28px),940px)] max-md:px-0 max-md:py-9 max-md:pb-14">
          {children}
        </section>

        {toc.length > 0 ? (
          <aside
            className="hidden border-l border-line [@media(min-width:1340px)]:block"
            aria-label="Table of contents"
          >
            <div className="sticky top-16 max-h-[calc(100vh-64px)] overflow-auto px-6 py-12">
              <p className="m-0 mb-3 text-xs font-bold uppercase text-muted">On this page</p>
              <nav className="grid gap-1" aria-label="Page sections">
                {toc.map((item) => (
                  <TOCItem
                    key={item.url}
                    href={item.url}
                    className="block rounded-md py-1.5 pr-2 text-sm font-semibold text-muted no-underline transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/[0.06] hover:text-ink active:scale-[0.96] data-[active=true]:text-ink"
                    style={{
                      paddingLeft: `${8 + Math.max(0, item.depth - 2) * 12}px`,
                    }}
                  >
                    {item.title}
                  </TOCItem>
                ))}
              </nav>
            </div>
          </aside>
        ) : null}
      </main>
    </AnchorProvider>
  );
}

function DocsSidebarNode({ node, currentUrl }: { node: DocsNavNode; currentUrl: string }) {
  if (node.type === "separator") {
    return node.title ? (
      <p className="m-0 px-2.5 text-xs font-bold uppercase text-muted">{node.title}</p>
    ) : (
      <div className="h-px bg-line" aria-hidden="true" />
    );
  }

  if (node.type === "folder") {
    const title = node.url ? (
      <a
        href={node.url}
        className="flex min-h-9 items-center rounded-md px-2.5 text-xs font-bold uppercase text-muted transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/[0.06] hover:text-ink active:scale-[0.96] data-[active=true]:bg-ink/[0.06] data-[active=true]:text-ink"
        data-active={normalizeUrl(node.url) === normalizeUrl(currentUrl)}
      >
        {node.title}
      </a>
    ) : (
      <p className="m-0 px-2.5 py-1 text-xs font-bold uppercase text-muted/70">{node.title}</p>
    );

    return (
      <div className="grid gap-1">
        {title}
        <div className="grid gap-0.5 max-md:flex max-md:gap-1.5 max-md:overflow-x-auto max-md:pb-0.5">
          {node.children.map((child, index) => (
            <DocsSidebarNode
              key={getNavNodeKey(child, index)}
              node={child}
              currentUrl={currentUrl}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <a
      href={node.url}
      className="flex min-h-9 items-center rounded-md px-2.5 text-sm font-semibold text-muted transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/[0.06] hover:text-ink active:scale-[0.96] data-[active=true]:bg-ink/[0.06] data-[active=true]:text-ink max-md:flex-none"
      data-active={normalizeUrl(node.url) === normalizeUrl(currentUrl)}
    >
      {node.title}
    </a>
  );
}

function getNavNodeKey(node: DocsNavNode, index: number) {
  if (node.type === "page" || node.type === "folder") {
    return node.url ?? `${node.title}-${index}`;
  }

  return node.title ?? `separator-${index}`;
}

function normalizeUrl(url: string) {
  return url.replace(/\/$/, "") || "/";
}
