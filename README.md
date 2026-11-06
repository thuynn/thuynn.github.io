# thuynn.github.io

Portfolio, case studies and blog of Thuy Nguyen — built with Astro, Tailwind CSS 4, MDX and React.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Write a blog post

Create `src/content/blog/my-post.mdx`:

```mdx
---
title: 'Post title'
description: 'One-sentence summary.'
date: 2026-11-02
lang: en        # or vi
tags: ['css']
draft: false
---

Text here. Use <Callout title="Tip">…</Callout> and <Figure src={img} alt="…" caption="…" />.
```

## Add a case study

Create `src/content/work/<slug>.mdx` (see existing files for the fields), put images in
`src/assets/work/<slug>/` and import them at the top of the MDX file.

## Deploy

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`
(repo Settings → Pages → Source: **GitHub Actions**).
