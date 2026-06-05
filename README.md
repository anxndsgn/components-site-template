# Components Site Template

A TanStack Start + React template for documenting UI component libraries with Fumadocs MDX content and shadcn registry generation.

## Stack

- TanStack Start and TanStack Router for the app shell and routing
- `fumadocs-mdx` and `fumadocs-core` for MDX parsing and content loading
- React docs primitives for previews, source, tabs, code blocks, inline command snippets, and props tables
- `shadcn build` support through `registry.json`

## Scripts

```bash
npm install
npm run dev
npm run build
npm run registry:build
```

`npm run registry:build` writes shadcn registry item JSON files to `public/r`.

## Adding Component Docs

1. Add an MDX page under `content/docs/components`.
2. Put installable source files under `registry/default`.
3. Add the item to `registry.json`.
4. Use the docs primitives from MDX:

```mdx
<ComponentTabs>
  <ComponentPreview>
    <YourDemo />
  </ComponentPreview>
  <ComponentSource code={sourceCode} language="tsx" />
</ComponentTabs>
```
