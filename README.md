# Omni GC marketing site

Marketing site for Omni GC, the working name for an operating layer that lets one person run a general contracting company: lead generation, estimating and sales, marketing, project delivery, client management and finance.

## Stack

- Next.js 16 (App Router, static export of `/`)
- Tailwind CSS 4 with shadcn components in `src/components/ui`. The files are the official `new-york-v4` registry sources from github.com/shadcn-ui/ui. The CLI could not be used because it hard-codes `ui.shadcn.com`, which the build environment's network policy blocks (a local registry mirror got the CLI past item resolution, but it still fetched `colors/neutral.json` from the blocked host). The files carry the same two transforms the CLI applies (import paths), plus a `brand` variant on Button and Badge and an `xl` Button size. Future components can be added normally with `npx shadcn@latest add <name>` on any machine with network access.
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

## Colour modes

A Light / Dark toggle sits in the navigation. Light is white with a blue-to-teal gradient. Dark is near-black with an orange-to-amber gradient, and four sections (the statement, finance, approval and FAQ) stay white as islands. The choice is stored in `localStorage` and applied before paint by an inline script in the layout. The hero fallback clip has a matching render per mode (`public/hero.*` and `public/hero-dark.*`).

## Walkthrough form

The form posts to `/api/walkthrough`. Set `RESEND_API_KEY` and `WALKTHROUGH_INBOX` (see `.env.example`) to have requests emailed through Resend. Without them the route validates and logs the request so previews still work.

## Imagery

`public/images/` holds five photorealistic staff and site images generated in the owner's Magnific library (foreman with drawings, superintendent at a steel frame, blueprints on a site table, two project managers walking a fit-out, estimator in a site office), self-hosted at 1024px wide. Full-resolution originals are in the Magnific library for a later swap.

## Media

Hero footage and photography are licensed Freepik stock assets pulled through the Magnific library. The URLs in `src/lib/media.ts` are signed and expire in roughly a year. The hero `<video>` lists the licensed footage first and two self-hosted renders second (`public/hero.webm`, `public/hero.mp4`, poster `public/hero-poster.jpg`). Browsers fall through `<source>` entries on a network failure, so the page always has moving footage. The self-hosted clip is a 14 second navy-and-teal structural-frame animation rendered from `docs/hero-render/scene.html` with Playwright and encoded with ffmpeg. Playback of the fallback was verified in headless Chromium (ready state 4, 1920x1080, currentTime advancing). The licensed footage could not be loaded from the build environment because `videocdn.cdnpk.net` and `pikaso.cdnpk.net` are outside its allowed network. Before launch, download the files from the Magnific library links in that file, drop them in `public/`, and point the constants at the local paths.

## Design review

The page was checked against Anthropic's `frontend-design` skill (fetched from github.com/anthropics/claude-plugins-official). Changes made because of it: no all-caps tracked eyebrows, no monospace data labels, no middle-dot meta strings, numbering only on the day timeline (a real sequence), and no fade-up entrance on every card. Remaining motion is scroll-linked storytelling: hero parallax and masked reveal, the word-by-word statement, the sticky rail with stacking module cards, the dashboard tilt-in, and the pinned horizontal day.

## Reference research

`docs/references.md` records what was taken from and avoided in Procore, Billdr, Bobyard, Contractor Foreman and JACK App.

## Copy

All page copy was run through the SlopMonster lint and ships at 5/5. No customer counts, ratings or testimonials are used anywhere on the page, because none exist yet. Dashboard figures are labelled as a sample workspace.
