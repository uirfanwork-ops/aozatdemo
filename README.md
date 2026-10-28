# Omni GC marketing site

Marketing site for Omni GC, the working name for an operating layer that lets one person run a general contracting company: lead generation, estimating and sales, marketing, project delivery, client management and finance.

## Stack

- Next.js 16 (App Router, static export of `/`)
- Tailwind CSS 4 with shadcn components in `src/components/ui`. The files are the official `new-york-v4` registry sources from github.com/shadcn-ui/ui (the registry host ui.shadcn.com was not reachable from the build environment, so the files were pulled from the repository instead of through the CLI). The only edits are the two the CLI itself makes (import paths) plus a `brand` variant on Button and Badge and an `xl` Button size.
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

## Walkthrough form

The form posts to `/api/walkthrough`. Set `RESEND_API_KEY` and `WALKTHROUGH_INBOX` (see `.env.example`) to have requests emailed through Resend. Without them the route validates and logs the request so previews still work.

## Media

Hero footage and photography are licensed Freepik stock assets pulled through the Magnific library. The URLs in `src/lib/media.ts` are signed and expire in roughly a year. The build environment used here cannot reach `videocdn.cdnpk.net` or `pikaso.cdnpk.net`, so hero video playback was verified by markup and fallbacks only, not by watching it play. Before launch, download the files from the Magnific library links in that file, drop them in `public/`, and point the constants at the local paths.

## Reference research

`docs/references.md` records what was taken from and avoided in Procore, Billdr, Bobyard, Contractor Foreman and JACK App.

## Copy

All page copy was run through the SlopMonster lint and ships at 5/5. No customer counts, ratings or testimonials are used anywhere on the page, because none exist yet. Dashboard figures are labelled as a sample workspace.
