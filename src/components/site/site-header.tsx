import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, PanelLeft } from "lucide-react";

import { useDocsSidebar } from "./docs-sidebar-context";
import { ThemeToggle } from "./theme-toggle";

const navLinkClass =
  "inline-flex min-h-10 items-center rounded-md px-3 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-accent hover:text-accent-foreground active:scale-[0.96] data-[active=true]:bg-accent data-[active=true]:text-accent-foreground";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between gap-6 px-8 max-md:h-14 max-md:gap-2.5 max-md:px-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <DocsSidebarTrigger />
          <Link
            to="/"
            className="inline-flex min-h-10 min-w-0 items-center gap-2.5 text-[0.95rem] font-bold"
            activeOptions={{ exact: true }}
          >
            <span className="truncate">UI Library</span>
          </Link>
        </div>

        <nav
          className="flex min-w-0 flex-1 items-center justify-end gap-1.5 max-md:hidden"
          aria-label="Primary"
        >
          <HeaderNavLinks />
        </nav>

        <div className="flex flex-none items-center gap-2">
          <ThemeToggle />
          <details className="group relative md:hidden" suppressHydrationWarning>
            <summary
              className="inline-grid size-8 cursor-pointer list-none place-items-center rounded-md bg-card text-muted-foreground hover:bg-accent"
              aria-label="Open navigation"
            >
              <Menu size={18} aria-hidden="true" />
            </summary>
            <nav
              className="absolute top-12 right-0 z-40 grid min-w-40 gap-1 rounded-md border border-border bg-popover p-1.5 shadow-lg"
              aria-label="Primary"
            >
              <HeaderNavLinks />
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

function DocsSidebarTrigger() {
  const { drawerId, isOpen, open } = useDocsSidebar();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!pathname.startsWith("/docs")) return null;

  return (
    <button
      type="button"
      className="inline-grid size-8 flex-none cursor-pointer place-items-center rounded-md bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.96] md:hidden"
      aria-label="Open documentation navigation"
      aria-controls={drawerId}
      aria-expanded={isOpen}
      onClick={open}
    >
      <PanelLeft size={18} aria-hidden="true" />
    </button>
  );
}

function HeaderNavLinks() {
  return (
    <>
      <Link
        to="/"
        activeOptions={{ exact: true }}
        activeProps={{ "data-active": true }}
        className={navLinkClass}
      >
        Home
      </Link>
      <Link to="/docs" activeProps={{ "data-active": true }} className={navLinkClass}>
        Docs
      </Link>
      <a
        href="https://github.com/anxndsgn"
        target="_blank"
        rel="noopener noreferrer"
        className={navLinkClass}
      >
        GitHub
      </a>
    </>
  );
}
