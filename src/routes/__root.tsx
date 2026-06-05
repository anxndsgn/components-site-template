/// <reference types="vite/client" />
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ThemeToggle } from "../components/site/theme-toggle";
import { themeStorageKey } from "../lib/theme";
import appCss from "../styles/app.css?url";

const navLinkClass =
  "inline-flex min-h-10 items-center rounded-md px-3 text-sm font-semibold text-muted transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/[0.06] hover:text-ink active:scale-[0.96] data-[active=true]:bg-ink/[0.06] data-[active=true]:text-ink";

const buttonLinkClass =
  "inline-flex min-h-[42px] items-center justify-center gap-2 rounded-md bg-accent px-3.5 text-sm font-bold text-accent-ink transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-accent-strong active:scale-[0.96]";

const themeInitScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem('${themeStorageKey}')
    const theme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'

    document.documentElement.dataset.theme = theme
  } catch (_) {}
})()
`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "color-scheme", content: "light dark" },
      { title: "Components Site Template" },
      {
        name: "description",
        content: "A TanStack Start documentation template for React component libraries.",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div className="min-h-screen">
          <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-6 border-b border-line bg-paper/90 px-8 backdrop-blur-md max-md:min-h-0 max-md:flex-col max-md:items-start max-md:px-5 max-md:py-3.5">
            <Link
              to="/"
              className="inline-flex min-h-10 items-center gap-2.5 text-[0.95rem] font-bold"
              activeOptions={{ exact: true }}
            >
              <span
                className="h-5 w-5 rounded-full border-4 border-accent-soft bg-accent"
                aria-hidden="true"
              />
              <span>Components</span>
            </Link>
            <div className="flex items-center gap-2 max-md:w-full">
              <nav
                className="flex min-w-0 flex-1 items-center gap-1.5 max-md:overflow-x-auto max-md:pb-0.5"
                aria-label="Primary"
              >
                <Link
                  to="/"
                  activeOptions={{ exact: true }}
                  activeProps={{ "data-active": true }}
                  className={navLinkClass}
                >
                  Overview
                </Link>
                <Link to="/docs" activeProps={{ "data-active": true }} className={navLinkClass}>
                  Docs
                </Link>
                <a className={navLinkClass} href="/r/button.json">
                  Registry
                </a>
              </nav>
              <ThemeToggle />
            </div>
          </header>
          {children}
        </div>
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <main className="mx-auto w-[min(1120px,calc(100vw_-_40px))] py-14 max-md:w-[min(calc(100%_-_28px),940px)] max-md:pt-9">
      <div className="grid min-h-[420px] content-center gap-4">
        <p className="m-0 text-xs font-bold uppercase text-accent">404</p>
        <h1 className="m-0 max-w-[780px] text-balance text-[clamp(2.25rem,6vw,5.4rem)] leading-[0.96] max-md:text-4xl max-md:leading-[1.02]">
          Page not found
        </h1>
        <p className="m-0 max-w-[660px] text-pretty text-[1.06rem] leading-7 text-muted">
          The route does not exist in this documentation template.
        </p>
        <Link to="/docs" className={buttonLinkClass}>
          Open docs
        </Link>
      </div>
    </main>
  );
}
