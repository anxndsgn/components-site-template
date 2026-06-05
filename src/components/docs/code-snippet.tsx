"use client";

import {
  Children,
  isValidElement,
  useMemo,
  useSyncExternalStore,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "../../lib/utils";
import { CopyButton } from "./copy-button";

type CodeSnippetSlot = {
  value: string;
  command: string;
};

type CodeSnippetCommandProps = {
  value: string;
  children: ReactNode;
};

const defaultPackageManager = "pnpm";
const packageManagerStorageKey = "docs-package-manager";

let selectedPackageManager = defaultPackageManager;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (typeof window === "undefined") {
    return () => listeners.delete(listener);
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== packageManagerStorageKey) return;

    selectedPackageManager = event.newValue || defaultPackageManager;
    listener();
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSelectedPackageManager() {
  if (typeof window !== "undefined") {
    try {
      return window.localStorage.getItem(packageManagerStorageKey) ?? selectedPackageManager;
    } catch {
      return selectedPackageManager;
    }
  }

  return selectedPackageManager;
}

function getServerSelectedPackageManager() {
  return defaultPackageManager;
}

function setSelectedPackageManager(value: string) {
  const previousValue = getSelectedPackageManager();

  selectedPackageManager = value;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(packageManagerStorageKey, value);
    } catch {
      // Keep the in-memory selection when storage is unavailable.
    }
  }

  if (previousValue === value) return;

  listeners.forEach((listener) => listener());
}

function useSelectedPackageManager() {
  return useSyncExternalStore(
    subscribe,
    getSelectedPackageManager,
    getServerSelectedPackageManager,
  );
}

function CodeSnippetRoot({
  command,
  className,
  children,
}: {
  command?: string;
  className?: string;
  children?: ReactNode;
}) {
  const selectedValue = useSelectedPackageManager();
  const slots = useMemo(() => resolveSlots(children), [children]);
  const activeSlot = findActiveSlot(slots, selectedValue);
  const activeValue = activeSlot?.value ?? selectedValue;
  const activeCommand = activeSlot?.command ?? command;
  const hasTabs = slots.length > 1;

  if (!activeCommand) return null;

  return (
    <span
      className={cn(
        "inline-flex min-h-[42px] max-w-full items-center gap-1.5 rounded-md border border-line bg-code py-0 pr-1.5 pl-3 text-code-ink max-md:w-full max-md:justify-between",
        hasTabs &&
          "rounded-lg flex-col items-stretch justify-start gap-1.5 p-1.5 max-md:justify-start",
        className,
      )}
    >
      {hasTabs ? (
        <span
          className="inline-flex w-fit max-w-full self-start rounded-[5px] bg-code-ink/[0.06] p-0.5"
          role="group"
          aria-label="Package manager"
        >
          {slots.map((slot) => (
            <button
              key={slot.value}
              type="button"
              className={cn(
                "min-h-8 w-fit cursor-pointer rounded-[4px] border-0 bg-transparent px-2 text-xs font-bold text-code-ink/65 transition-[background-color,color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-code-ink/[0.08] hover:text-code-ink active:scale-[0.96]",
                activeValue === slot.value && "bg-code text-code-ink shadow-sm",
              )}
              aria-pressed={activeValue === slot.value}
              onClick={() => setSelectedPackageManager(slot.value)}
            >
              {slot.value}
            </button>
          ))}
        </span>
      ) : null}
      <span
        className={cn("inline-flex min-w-0 flex-1 items-center gap-1.5", hasTabs && "min-h-10")}
      >
        <code className="min-w-0 flex-1 truncate whitespace-nowrap px-1">{activeCommand}</code>
        <CopyButton value={activeCommand} label="Copy command" size={14} />
      </span>
    </span>
  );
}

function CodeSnippetCommand({ children }: CodeSnippetCommandProps) {
  return <>{children}</>;
}

CodeSnippetCommand.displayName = "CodeSnippetCommand";

function resolveSlots(children: ReactNode): CodeSnippetSlot[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isCodeSnippetCommand(child)) return [];

    const command = toCommandString(child.props.children);
    if (!child.props.value || !command) return [];

    return [
      {
        value: child.props.value,
        command,
      },
    ];
  });
}

function findActiveSlot(slots: CodeSnippetSlot[], selectedValue: string) {
  return (
    slots.find((slot) => slot.value === selectedValue) ??
    slots.find((slot) => slot.value === "pnpm") ??
    slots[0]
  );
}

function toCommandString(value: ReactNode): string {
  return collectText(value).replace(/\s+/g, " ").trim();
}

function collectText(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(collectText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(value)) {
    return collectText(value.props.children);
  }

  return "";
}

function isCodeSnippetCommand(child: ReactNode): child is ReactElement<CodeSnippetCommandProps> {
  return (
    isValidElement(child) &&
    typeof child.type !== "string" &&
    "displayName" in child.type &&
    child.type.displayName === "CodeSnippetCommand"
  );
}

export const CodeSnippet = Object.assign(CodeSnippetRoot, {
  Command: CodeSnippetCommand,
});

export { CodeSnippetCommand };
