import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "../docs/code-block";
import { CodeSnippet, CodeSnippetCommand } from "../docs/code-snippet";
import { ComponentPreview } from "../docs/component-preview";
import { ComponentSource } from "../docs/component-source";
import { ComponentTabs } from "../docs/component-tabs";
import { PropsTable } from "../docs/props-table";

export function getMDXComponents(): MDXComponents {
  return {
    ComponentPreview,
    ComponentSource,
    ComponentTabs,
    CodeBlock,
    CodeSnippet,
    CodeSnippetCommand,
    PropsTable,
    pre: CodeBlock,
    code: InlineCode,
  };
}

function InlineCode(props: React.ComponentProps<"code">) {
  return (
    <code
      className="rounded-[5px] bg-accent-soft px-1.5 py-0.5 text-[0.86em] text-accent-strong"
      {...props}
    />
  );
}
