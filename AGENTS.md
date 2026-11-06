# Project notes for AI agents

Personal portfolio + blog of Thuy Nguyen. Read `docs/GUIDE.md` (structure, conventions) and `docs/PLAN.md` (roadmap)
before larger changes.

## Development

Start the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, `astro dev logs`. Always run `npm run build` before committing.

## Conventions

- UI copy is English. Blog posts may be English or Vietnamese (`lang: vi`).
- Components use semantic color tokens only (`bg`, `surface`, `fg`, `muted`, `line`, `accent`, `accent-fg`,
  `accent-soft`); never primitive ramps or hex values in markup.
- Tailwind 4: do not `@apply` custom classes; share styles by grouping selectors in `global.css`.
- React is only for interactive islands in `src/components/lab/`; everything else is `.astro`.
- Images go through `astro:assets` (`<Figure>` / `<Image>`), never raw `<img>` from `public/`.
- Every image needs meaningful `alt` text; keep keyboard support and focus styles on interactive components.

## Content confidentiality

- No screens, code or data from Spectos' main product (RTPM).
- No client names (Audi, Vietjet, Royal Mail, bpost, NWS…).
- Company work stays `draft: true` until permission is confirmed.
- MindX projects must be labelled as course projects.

## Documentation

- [Astro docs](https://docs.astro.build)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Framework components](https://docs.astro.build/en/guides/framework-components/)
- [Styling / Tailwind](https://docs.astro.build/en/guides/styling/)
