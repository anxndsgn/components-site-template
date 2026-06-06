import { Button } from "../ui/button";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Install package</Button>
      <Button variant="secondary">View source</Button>
    </div>
  );
}
