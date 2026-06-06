import { AnchorProvider, TOCItem, useActiveAnchor } from "fumadocs-core/toc";
import { ChevronDownIcon, XIcon } from "lucide-react";
import { useEffect, useId, type ReactNode } from "react";

import { useDocsSidebar } from "./docs-sidebar-context";

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
      <main className="min-h-[calc(100vh-56px)] md:grid md:min-h-[calc(100vh-64px)] md:grid-cols-[264px_minmax(0,1fr)] [@media(min-width:1340px)]:grid-cols-[264px_minmax(0,1fr)_240px]">
        <DocsMobileNav navTree={navTree} currentUrl={currentUrl} />

        <aside
          className="hidden border-r border-border md:block"
          aria-label="Documentation navigation"
        >
          <div className="sticky top-16 grid max-h-[calc(100vh-64px)] gap-6 overflow-auto py-4 pr-4 pb-10 pl-4">
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

        <DocsMobileToc toc={toc} />

        <section className="mx-auto w-[min(100%,940px)] min-w-0 px-10 py-12 pb-18 max-md:w-[min(calc(100%-28px),940px)] max-md:px-0 max-md:py-9 max-md:pb-14">
          {children}
        </section>

        {toc.length > 0 ? (
          <aside
            className="hidden border-l border-border [@media(min-width:1340px)]:block"
            aria-label="Table of contents"
          >
            <div className="sticky top-16 max-h-[calc(100vh-64px)] overflow-auto px-6 py-12">
              <p className="m-0 mb-3 text-xs font-bold text-muted-foreground uppercase">
                On this page
              </p>
              <DocsTocNav toc={toc} />
            </div>
          </aside>
        ) : null}
      </main>
    </AnchorProvider>
  );
}

function DocsMobileNav({ navTree, currentUrl }: { navTree: DocsNavTree; currentUrl: string }) {
  const { drawerId, isOpen, close } = useDocsSidebar();
  const drawerTitleId = useId();

  useEffect(() => {
    close();
  }, [currentUrl, close]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      style={{ pointerEvents: isOpen ? undefined : "none" }}
    >
      <div
        className="absolute inset-0 bg-foreground/25 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
        onClick={close}
        aria-hidden="true"
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 left-[min(86vw,320px)] cursor-default"
        aria-label="Close documentation navigation"
        onClick={close}
        tabIndex={isOpen ? undefined : -1}
      />
      <dialog
        id={drawerId}
        open
        className="absolute inset-y-0 left-0 m-0 grid h-full max-h-none w-[min(86vw,320px)] max-w-none grid-rows-[auto_minmax(0,1fr)] border-0 border-r border-border bg-background p-0 text-foreground shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)]"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
        aria-modal="true"
        aria-labelledby={drawerTitleId}
      >
        <div className="flex min-h-14 items-center justify-between gap-3 border-b border-border px-4">
          <div className="min-w-0">
            <h2 id={drawerTitleId} className="m-0 truncate text-base font-bold">
              UI Library
            </h2>
          </div>
          <button
            type="button"
            className="inline-grid size-8 flex-none cursor-pointer place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label="Close documentation navigation"
            onClick={close}
          >
            <XIcon size={18} aria-hidden="true" />
          </button>
        </div>
        <nav className="grid content-start gap-1 overflow-auto p-3" aria-label="Docs pages">
          {navTree.nodes.map((node, index) => (
            <DocsSidebarNode
              key={getNavNodeKey(node, index)}
              node={node}
              currentUrl={currentUrl}
              onNavigate={close}
            />
          ))}
        </nav>
      </dialog>
    </div>
  );
}

function DocsMobileToc({ toc }: { toc: Array<DocsTocItem> }) {
  if (toc.length === 0) return null;

  const activeAnchor = useActiveAnchor();
  const activeUrl = activeAnchor ? `#${activeAnchor}` : "";

  return (
    <div className="sticky top-14 z-10 border-b border-border bg-background/95 p-4 pb-3 backdrop-blur-md md:hidden">
      <div className="relative">
        <select
          aria-label="On this page"
          className="w-full cursor-pointer appearance-none rounded-md border border-border bg-card py-2.5 pr-9 pl-3 text-sm font-bold text-foreground"
          value={activeUrl}
          onChange={(e) => {
            window.location.hash = e.target.value;
          }}
        >
          {!activeUrl && (
            <option value="" disabled>
              On this page
            </option>
          )}
          {toc.map((item) => (
            <option key={item.url} value={item.url}>
              {"—".repeat(Math.max(0, item.depth - 2)).concat(item.depth > 2 ? " " : "")}
              {item.title}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          size={15}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function DocsTocNav({
  toc,
  className = "grid gap-1",
}: {
  toc: Array<DocsTocItem>;
  className?: string;
}) {
  return (
    <nav className={className} aria-label="Page sections">
      {toc.map((item) => (
        <TOCItem
          key={item.url}
          href={item.url}
          className="block rounded-md py-1.5 pr-2 text-sm font-semibold text-muted-foreground no-underline transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-accent hover:text-accent-foreground active:scale-[0.96] data-[active=true]:text-accent-foreground"
          style={{
            paddingLeft: `${8 + Math.max(0, item.depth - 2) * 12}px`,
          }}
        >
          {item.title}
        </TOCItem>
      ))}
    </nav>
  );
}

function DocsSidebarNode({
  node,
  currentUrl,
  onNavigate,
}: {
  node: DocsNavNode;
  currentUrl: string;
  onNavigate?: () => void;
}) {
  if (node.type === "separator") {
    return node.title ? (
      <p className="m-0 px-2.5 text-xs font-bold text-muted-foreground uppercase">{node.title}</p>
    ) : (
      <div className="h-px bg-border" aria-hidden="true" />
    );
  }

  if (node.type === "folder") {
    const title = node.url ? (
      <a
        href={node.url}
        className="flex min-h-9 items-center justify-between rounded-md px-2.5 text-xs font-bold text-muted-foreground uppercase transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-accent hover:text-accent-foreground active:scale-[0.96] data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
        data-active={normalizeUrl(node.url) === normalizeUrl(currentUrl)}
        onClick={onNavigate}
      >
        {node.title}
      </a>
    ) : (
      <p className="m-0 px-2.5 pt-1 text-sm font-bold text-muted-foreground/50">{node.title}</p>
    );

    return (
      <div className="grid gap-1">
        {title}
        <div className="grid gap-0.5">
          {node.children.map((child, index) => (
            <DocsSidebarNode
              key={getNavNodeKey(child, index)}
              node={child}
              currentUrl={currentUrl}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <a
      href={node.url}
      className="flex min-h-9 items-center rounded-md px-2.5 text-sm text-foreground hover:bg-accent data-[active=true]:bg-accent data-[active=true]:font-semibold"
      data-active={normalizeUrl(node.url) === normalizeUrl(currentUrl)}
      onClick={onNavigate}
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
