# Independent portfolio

Original HTML, CSS, and JavaScript for Vasu Mekala. The public-facing ApplyWizz layout informed the dark green/gold palette, serif headings, sidebar, mobile dock, and section arrangement. No source files, scripts, or image assets were copied from that website. Project illustrations are original HTML/CSS diagrams, labeled as illustrations; they are not live project screenshots.

## Content source

The supplied `Vasu_Mekala_AI_ML_Engineer_Resume (15).pdf` is the source of truth. Its SHA-256 matches the existing repository file `Vasu_Mekala_AI_ML_Engineer_Resume.pdf`: `93b1573a940d0d21b9135565ca2a8c1614222e0c5592f4cd826b84205cc0527e`. That unchanged file powers every resume download. LinkedIn was extracted from the PDF link annotation. GitHub is the user's supplied account.

Existing README and PDF are preserved. The previous portfolio page remains in the main branch and Git history. This rebuild is proposed on `codex/independent-portfolio`.

## Build and check

Requires Node.js 20 or newer; no package installation or environment variables needed.

```sh
node verify.mjs
node --check app.js
node build.mjs
```

Serve `dist/` with any static web server. Deploy using `vercel.json` (Other framework, build command `node build.mjs`, output `dist`). Only the five public site files are copied to the output; project source and Git metadata are excluded. Google Fonts supplies Inter and Playfair Display, with local system fallbacks.

## Behavior

- Theme switch with optional saved preference.
- Responsive sidebar and mobile section dock with active-section tracking.
- Native accessible expandable work experience and professional summary.
- Keyboard-operable lifecycle tabs and skill filters with announced counts.
- Native modal project and degree details; Escape closes and returns focus.
- Direct email, phone, LinkedIn, GitHub, and unchanged PDF download links.
- Reduced-motion support; no fabricated proficiency scores, project metrics, or credential verification links.
