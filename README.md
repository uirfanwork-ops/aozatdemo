# Omni GC marketing site

Marketing site for Omni GC, the working name for an operating layer that lets one person run a general contracting company: lead generation, estimating and sales, marketing, project delivery, client management and finance.

## Stack

- Next.js 16 (App Router, static export of `/`)
- Tailwind CSS 4 with shadcn-style components in `src/components/ui`
- `motion` for scroll-linked and in-view animation, `lenis` for smooth scrolling
- Fonts: Schibsted Grotesk (display), Geist (body), Geist Mono (labels)

## Run

```bash
npm install
npm run dev
```

Production check:

```bash
npm run lint
npm run build
npm start
```

## Media

Hero footage and photography are licensed Freepik stock assets pulled through the Magnific library. The URLs in `src/lib/media.ts` are signed and expire in roughly a year. Before launch, download the files from the Magnific library links in that file, drop them in `public/`, and point the constants at the local paths.

## Copy

All page copy was run through the SlopMonster lint and ships at 5/5. No customer counts, ratings or testimonials are used anywhere on the page, because none exist yet. Dashboard figures are labelled as a sample workspace.
