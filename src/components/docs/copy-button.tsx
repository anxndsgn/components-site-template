"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export function CopyButton({
  value,
  label,
  size = 15,
}: {
  value: string;
  label: string;
  size?: number;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = window.setTimeout(() => setCopied(false), 1600);

    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      className="relative inline-grid h-10 w-10 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-inherit transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-code-ink/10 active:scale-[0.96]"
      aria-label={label}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
      }}
    >
      <Copy
        className={cn(
          "absolute transition-[opacity,filter,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          copied && "scale-[0.25] opacity-0 blur-[4px]",
        )}
        size={size}
        aria-hidden="true"
      />
      <Check
        className={cn(
          "absolute transition-[opacity,filter,scale] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          !copied && "scale-[0.25] opacity-0 blur-[4px]",
        )}
        size={size}
        aria-hidden="true"
      />
    </button>
  );
}
