import type { ReactNode } from "react";

export function ComponentPreview({ children, name }: { children: ReactNode; name?: string }) {
  return (
    <div className="grid min-h-[260px] gap-3 p-5">
      {name ? <div className="text-xs font-bold text-muted">{name}</div> : null}
      <div className="docs-preview-grid grid min-h-[190px] place-items-center rounded-md">
        {children}
      </div>
    </div>
  );
}

ComponentPreview.displayName = "ComponentPreview";
