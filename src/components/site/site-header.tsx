import { Link, useRouterState } from "@tanstack/react-router";
import { MenuIcon, PanelLeft } from "lucide-react";
import { Button } from "registry/default/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
} from "registry/default/ui/dropdown-menu";
import { Separator } from "registry/default/ui/separator";

import { useDocsSidebar } from "./docs-sidebar-context";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between gap-4 px-4 max-md:h-14 max-md:gap-2.5 max-md:px-3.5">
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
          <Button
            nativeButton={false}
            variant="ghost"
            render={
              <Link to="/" activeOptions={{ exact: true }} activeProps={{ "data-active": true }} />
            }
          >
            Home
          </Button>
          <Button
            nativeButton={false}
            variant="ghost"
            render={<Link to="/docs" activeProps={{ "data-active": true }} />}
          >
            Docs
          </Button>
          <Button
            nativeButton={false}
            variant="ghost"
            render={
              <a
                href="https://github.com/anxndsgn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              />
            }
          >
            GitHub
          </Button>
          <Separator orientation="vertical" />
          <ThemeToggle />
          <MobileHeaderMenu />
        </nav>
      </div>
    </header>
  );
}

function MobileHeaderMenu() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className="bg-card text-muted-foreground md:hidden" />
        }
        aria-label="Open navigation"
      >
        <MenuIcon size={18} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLinkItem
          href="/"
          closeOnClick
          data-active={pathname === "/" ? true : undefined}
        >
          Home
        </DropdownMenuLinkItem>
        <DropdownMenuLinkItem
          href="/docs"
          closeOnClick
          data-active={pathname.startsWith("/docs") ? true : undefined}
        >
          Docs
        </DropdownMenuLinkItem>
        <DropdownMenuLinkItem
          href="https://github.com/anxndsgn"
          target="_blank"
          rel="noopener noreferrer"
          closeOnClick
          data-active={pathname === "/github" ? true : undefined}
        >
          GitHub
        </DropdownMenuLinkItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DocsSidebarTrigger() {
  const { drawerId, isOpen, open } = useDocsSidebar();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!pathname.startsWith("/docs")) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="md:hidden"
      aria-label="Open documentation navigation"
      aria-controls={drawerId}
      aria-expanded={isOpen}
      onClick={open}
    >
      <PanelLeft size={18} aria-hidden="true" />
    </Button>
  );
}
