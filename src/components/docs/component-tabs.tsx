import { Eye, FileCode2 } from "lucide-react";
import { Children, isValidElement, useMemo, useId, type ReactElement, type ReactNode } from "react";
import { ComponentSource } from "./component-source";

type TabValue = "preview" | "source";

export function ComponentTabs({
  children,
  preview,
  source,
  defaultValue = "preview",
}: {
  children?: ReactNode;
  preview?: ReactNode;
  source?: ReactNode | string;
  defaultValue?: TabValue;
}) {
  const id = useId();
  const previewId = `${id}-preview`;
  const sourceId = `${id}-source`;
  const slots = useMemo(() => resolveSlots(children, preview, source), [children, preview, source]);

  return (
    <section className="relative overflow-hidden rounded-lg border border-line bg-raised">
      <input
        id={previewId}
        className="peer/preview sr-only"
        type="radio"
        name={id}
        defaultChecked={defaultValue === "preview"}
      />
      <input
        id={sourceId}
        className="peer/source sr-only"
        type="radio"
        name={id}
        defaultChecked={defaultValue === "source"}
      />
      <div className="flex gap-1 overflow-x-auto border-b border-line p-2" role="radiogroup">
        <label
          className="inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-md px-3 text-sm font-bold text-muted transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/[0.07] hover:text-ink active:scale-[0.96] peer-checked/preview:bg-ink/[0.07] peer-checked/preview:text-ink"
          htmlFor={previewId}
        >
          <Eye size={15} aria-hidden="true" />
          Preview
        </label>
        <label
          className="inline-flex min-h-10 cursor-pointer select-none items-center justify-center gap-2 rounded-md px-3 text-sm font-bold text-muted transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-ink/[0.07] hover:text-ink active:scale-[0.96] peer-checked/source:bg-ink/[0.07] peer-checked/source:text-ink"
          htmlFor={sourceId}
        >
          <FileCode2 size={15} aria-hidden="true" />
          Source
        </label>
      </div>
      <div className="block min-h-[260px] peer-checked/source:hidden">{slots.preview}</div>
      <div className="hidden min-h-[260px] peer-checked/source:block [&>figure]:rounded-none [&>figure]:border-0">
        {slots.source}
      </div>
    </section>
  );
}

function resolveSlots(children: ReactNode, preview?: ReactNode, source?: ReactNode | string) {
  const childArray = Children.toArray(children);
  const childPreview = childArray.find((child) => hasDisplayName(child, "ComponentPreview"));
  const childSource = childArray.find((child) => hasDisplayName(child, "ComponentSource"));

  return {
    preview: preview ?? childPreview ?? null,
    source:
      typeof source === "string" ? (
        <ComponentSource code={source} />
      ) : (
        (source ?? childSource ?? null)
      ),
  };
}

function hasDisplayName(child: ReactNode, displayName: string): child is ReactElement {
  return (
    isValidElement(child) &&
    typeof child.type !== "string" &&
    "displayName" in child.type &&
    child.type.displayName === displayName
  );
}
