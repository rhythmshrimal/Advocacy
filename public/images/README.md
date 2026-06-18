# Images

Drop real, well-lit, brand-consistent photographs here, then reference them in
the code. Until a path is set, the site shows a tasteful branded placeholder.

> Prefer **real photos of the team, chambers, or court premises** over generic
> stock gavel/handshake images (per the brand brief). Optimise to `.webp` or
> compressed `.jpg` for fast loading.

## Where each image is wired

| Slot              | Set the path in            | Field            | Recommended size      |
| ----------------- | -------------------------- | ---------------- | --------------------- |
| Home hero (bg)    | `lib/site.ts` → `images`   | `hero`           | 1920×1080 (landscape) |
| About / chambers  | `lib/site.ts` → `images`   | `about`          | 1200×900 (4:3)        |
| Contact / office  | `lib/site.ts` → `images`   | `office`         | 1200×900 (4:3)        |
| Practice areas    | `lib/site.ts` → `practiceAreas[].image` | `image` | 1200×900 (4:3)        |
| Team portraits    | `app/team/page.tsx` → `team[].image`    | `image` | 1000×750 (4:3)        |

## Example

1. Add a file, e.g. `public/images/hero.jpg`.
2. Set the path (note the leading `/`, no `public`):

```ts
// lib/site.ts
images: {
  hero: "/images/hero.jpg",
  // ...
}
```

All images render through `components/Photo.tsx`, which uses `next/image`
(automatic resizing, lazy-loading, and modern formats).
