import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DocsSidebarContextValue = {
  /** Shared id so the header trigger can reference the drawer via aria-controls. */
  drawerId: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const DocsSidebarContext = createContext<DocsSidebarContextValue | null>(null);

export function DocsSidebarProvider({ children }: { children: ReactNode }) {
  const drawerId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<DocsSidebarContextValue>(
    () => ({ drawerId, isOpen, open, close }),
    [drawerId, isOpen, open, close],
  );

  return <DocsSidebarContext.Provider value={value}>{children}</DocsSidebarContext.Provider>;
}

export function useDocsSidebar() {
  const context = useContext(DocsSidebarContext);

  if (!context) {
    throw new Error("useDocsSidebar must be used within a DocsSidebarProvider");
  }

  return context;
}
