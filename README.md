# Truss marketing site

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Lenis. Deploys to Vercel with zero configuration.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Where things live

| Path | What it is |
| --- | --- |
| `content/site.ts` | Every string on the site: nav, hero, form copy, sections, footer, legal pages, mock-screen fixtures. Edit copy here, not in components. |
| `app/layout.tsx` | Fonts (Instrument Serif via `next/font/google`, Geist via `next/font/local`), metadata, providers. |
| `app/page.tsx` | The landing page: preloader, nav, and sections in order. |
| `app/privacy/page.tsx`, `app/terms/page.tsx` | Minimal legal pages rendered by `components/LegalPage.tsx`. |
| `app/api/lead/route.ts` | Receives the hero form. Validates, drops honeypot hits, then calls `lib/server/lead-delivery.ts`. |
| `lib/server/lead-delivery.ts` | Logs leads today. Set env vars to forward them to a webhook or email via Resend (see `.env.example`). |
| `lib/lead.ts` | Validation shared by the form and the API route. |
| `app/globals.css`, `tailwind.config.ts` | Colour tokens (`--navy-900`, `--lime`, ...), fonts, easing, shadows, marquee keyframes. `--muted` (#6B7A90) is kept as specified; running text on light surfaces uses `--muted-text` (#5F6E85, Tailwind `text-secondary`) because the original fails WCAG AA below 24px. |
| `components/motion/` | `Reveal`, `TextReveal`, `Parallax`, `CountUp`, `Magnetic`, `TiltCard`. |
| `components/chrome/` | `Nav` (transparent to frosted), `Preloader`, `Footer`. |
| `components/sections/` | Hero (with `HeroMedia`, `LeadForm`, `TrustedBy`, `ScrollCue`), Problem, Showcase, HowItWorks, TrustBand, Founders, FinalCta. |
| `components/mocks/` | The in-app screens shown in the sticky product showcase. Fixture data comes from `site.mocks`. |
| `components/providers/` | Lenis smooth scroll and anchor handling, Framer `MotionConfig` (reduced motion), preloader state. |

## Drop-in assets

| Asset | Path | Notes |
| --- | --- | --- |
| Logo mark | `public/logo.svg` | Block "T" generated from the Titan One typeface: white fill, navy outline, rendered as an image. Set `site.logo.monochrome = true` to switch to a CSS-recoloured single-colour SVG instead. |
| Favicon | `app/icon.svg` | Next.js picks this up automatically. `app/apple-icon.png` is the iOS home-screen icon. |
| Link preview image | `app/opengraph-image.png`, `app/twitter-image.png` | 1200x630 logo card shown when the link is shared in iMessage, WhatsApp, Slack, X, LinkedIn. Regenerate or replace with any 1200x630 PNG. Set `NEXT_PUBLIC_SITE_URL` in Vercel to your custom domain so the preview URL is absolute and correct. |
| Hero video | `public/video/hero.mp4` | Your `Homepage.MOV`, re-encoded to H.264 at 1280x720. Muted, looping, `playsInline`. |
| Hero poster | `public/video/poster.jpg` | A frame from the video, shown before playback and used as the LCP image. |
| Harvard mark | `public/logos/harvard.png` | Cropped from your upload. Update `width`/`height` in `site.founders.logos` if you swap it. |
| TMD Remodeling mark | `public/logos/tmd.jpg` | Your upload, unchanged. Same rule as above. |
| Founder portraits | `public/founders/shiwaum.jpg`, `public/founders/devan.jpg` | 512px square crops of your uploads. Swap the files or change `portrait` in `site.founders.people`. |
| Customer logos | any path under `public/` | Add `src`, `width`, `height` to entries in `site.hero.trustedBy.logos`; otherwise the name renders as a wordmark. |

## Lead delivery

Every submission is validated, checked against the honeypot, logged to the server console, and emailed to
`LEAD_TO_EMAIL` (defaults to TrussHQ@gmail.com, the site contact email). Email needs one secret, set locally in
`.env.local` and in Vercel under Settings > Environment Variables:

1. **Gmail App Password (recommended).** In the TrussHQ Google Account turn on 2-Step Verification, open
   Security > App passwords, create one named "Truss site", and set `GMAIL_USER=TrussHQ@gmail.com` and
   `GMAIL_APP_PASSWORD=<the 16-character password>`. Leads arrive from the TrussHQ inbox to itself with the
   visitor's address as reply-to.
2. **Resend.** Set `RESEND_API_KEY` (and optionally `LEAD_FROM_EMAIL` once a domain is verified). Used only when
   the Gmail variables are empty. Without a verified domain, Resend delivers only to the email the Resend account
   was created with.

`LEAD_WEBHOOK_URL` additionally POSTs each lead as JSON to a webhook. If a configured channel fails, the API
returns 502 and the form shows its fallback contact details instead of a false success. With nothing configured,
leads are only logged, and production logs a warning on every submission.

## Motion and accessibility

All animation honours `prefers-reduced-motion`: Framer's `MotionConfig reducedMotion="user"` removes transforms, Lenis smoothing is disabled, the marquee stops, and the preloader lifts immediately. Magnetic and tilt effects only run on fine-pointer devices. The site uses the normal system cursor.
