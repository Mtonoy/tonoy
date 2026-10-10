# Portfolio — Md. Mahamudul Hasan Tonoy

A modern, animated portfolio built with **pure HTML, CSS and vanilla JavaScript**.
No frameworks, no build step, no dependencies — open `index.html` and it runs.

---

## 🚀 Quick start

```
index.html
```

Double-click the file, or serve the folder:

```bash
npx serve .        # Node
python -m http.server 8080
```

Then visit <http://localhost:3000> or <http://localhost:8080>

---

## 📂 Structure

```
.
├── index.html                     # Home — all sections + inline SVG icon sprite
├── projects/                      # ── Dedicated case-study pages ──
│   ├── erp.html                   #  Enterprise Resource Planning
│   ├── field-force.html           #  Field Force Management System
│   ├── accounting.html            #  Accounts & Bookkeeping (NRB VAT certified)
│   ├── school-management.html     #  School Management System + payroll
│   └── hrm-redcross.html          #  HRM System — Red Cross Bangladesh
├── assets/
│   ├── css/
│   │   ├── style.css              # Design tokens, home page, responsive, print
│   │   ├── project.css            # Case-study page components
│   │   └── tools.css              # Shared design system for the tool pages
│   ├── js/
│   │   ├── main.js                # 19 modules, works on every page
│   │   └── tools.js               # Theme + modal helpers for the tool pages
│   └── img/
│       ├── avatar.jpg · portrait2.jpg · avatar-gh.jpg
│       ├── erp.png · field-force.png · accounting.jpg
│       ├── enyo.jpg · design.jpg · animated.jpg
│       └── mock/                  # 11 generated sample UI screens (SVG)
├── Tools/                         # ── ToolNest toolkit ──
│   └── index.html                 #  40+ tools: finance, dev, image/PDF, everyday
├── JsonCompare/                   # ── Standalone browser tools ──
│   └── index.html                 #  JSON compare with smart column matching
├── GZIPToJson/
│   └── index.html                 #  Base64 + GZIP → formatted JSON
├── NBRAudit/
│   ├── index.html                 #  NBR (23-24) TIN audit-list checker
│   └── tin_data.json              #  Local audit database (12 MB)
├── PdfSplit/
│   └── index.html                 #  Client-side PDF page splitter
├── TaxCalculator/
│   └── index.html                 #  BD income tax — NBR 2025-26 slabs
├── build/                         # Regenerate the generated files
│   ├── gen-mockups.js             #   → assets/img/mock/*.svg
│   └── build-projects.js          #   → projects/*.html
└── README.md
```

---

## 🗂 Case-study pages

Every project in the **Enterprise** filter on the home page links to its own page.
Each one contains:

- **Hero** — kicker, title, lede, and a 4-cell fact panel (client, sector, dates, your role)
- **The challenge / The solution** — the two-column problem-solution breakdown
- **Sample screens** — a gallery of generated UI mockups with per-screen captions
- **Modules delivered** — 8 functional modules, described by outcome not by menu name
- **Technology** — application stack and data/infrastructure stack
- **What I owned** — your specific responsibilities, plus engagement detail
- **Results** — 4 outcome metrics
- **Quote** — a client voice block
- **CTA + previous/next project navigation**

### Regenerating the pages

Both generators are plain Node scripts with no dependencies:

```bash
node build/gen-mockups.js      # redraw the 11 sample screens
node build/build-projects.js   # rebuild all 5 case-study pages
```

`build-projects.js` holds every project as a data object at the top of the file —
edit the content there and re-run, and all five pages regenerate in place. The
template and the icon sprite are shared, so nothing can drift between pages.

---

## 🧰 Tools

The home page has a **Tools** section, and every tool is hosted **locally** so
the whole site stays self-contained. Each tool page shares
`assets/css/tools.css` + `assets/js/tools.js`, so it inherits the portfolio's
design tokens and dark/light theme.

| Tool | Path | What it does |
|---|---|---|
| **ToolNest Toolkit** | `Tools/` | 40+ calculators in one page — finance (incl. **DPS** & **FDR**), developer, image/PDF and everyday helpers |
| **JSON Compare** | `JsonCompare/` | Diff two JSON documents with smart column matching |
| **GZIP → JSON** | `GZIPToJson/` | Decode Base64 + GZIP payloads into formatted JSON |
| **NBR Audit Checker** | `NBRAudit/` | Verify a 12-digit TIN against the 23-24 audit list (reads `tin_data.json`) |
| **PDF Splitter** | `PdfSplit/` | Split a PDF into single pages — download singly or as a ZIP |
| **Tax Calculator** | `TaxCalculator/` | BD income tax for the NBR 2025-26 annual slabs |

Every tool runs **100% in the browser** — no file or input ever leaves the device.

**Modals:** every modal on these pages closes **only** via its **✕** button.
Clicking the backdrop, pressing `Escape`, or clicking inside the panel never
closes it (implemented once in `assets/js/tools.js`).

---

## 🎨 Customising

### Colours
Every colour is one token at the top of `assets/css/style.css`:

```css
:root{
  --c1:#22d3ee;   /* cyan    */
  --c2:#6366f1;   /* indigo  */
  --c3:#d946ef;   /* fuchsia */
  --c4:#f59e0b;   /* amber   */
  --grad:linear-gradient(120deg,var(--c1),var(--c2) 42%,var(--c3));
  --gut:clamp(1.1rem,4.5vw,6.5rem);   /* fluid gutter */
}
```

Change those four hex values and the entire site — gradients, glows, icons, bars,
badges, buttons — re-themes itself.

### Layout
`--gut` is a fluid gutter, so `.container` is true container-fluid: it stretches to
`--maxw` (1680px) and pads proportionally to the viewport, leaving equal margin on
both sides at any width. Reduce `--maxw` for a narrower reading column, or raise it
for edge-to-edge layouts.

### Fonts
Google Fonts in `<head>`: **Sora** (headings), **Inter** (body), **JetBrains Mono**
(dates, labels, code).

---

## ✨ Features

| Feature | Details |
|---|---|
| **Preloader** | Animated rings + progress bar, unlocks scroll on finish |
| **Custom cursor** | Dot + lagging ring with ripple, morphs on interactive elements |
| **Aurora background** | Three drifting blurred orbs, masked grid, film grain |
| **Particle constellation** | Canvas particles linked by proximity lines |
| **Scroll progress** | Gradient bar pinned to the top of every page |
| **Scroll spy nav** | Glass sticky header + sliding gradient indicator |
| **Typing effect** | Role rotator in the hero |
| **Scroll reveals** | `IntersectionObserver`, per-element delays, 4 variants, fail-safe sweep |
| **Animated counters** | Ease-out counting, including skill percentages |
| **Skill bars** | Fill to target with a looping shimmer sweep |
| **3D tilt / magnetism** | Perspective cards, drifting buttons |
| **Parallax** | Hero portrait and about image offset on scroll |
| **Project filter** | Animated re-entry on filter change |
| **Testimonials** | Auto-play, dots, arrows, swipe, pauses off-screen |
| **Dark / Light theme** | Toggle with `localStorage` |
| **Contact form** | Validation then a pre-filled `mailto:` |
| **Accessibility** | ARIA states, keyboard focus, `prefers-reduced-motion`, `<noscript>` fallback, print stylesheet |

### Progressive enhancement (reveal safety net)

Reveal blocks are hidden by `[data-reveal]{opacity:0}`, so a JavaScript failure
would otherwise leave a page permanently blank. Three layers prevent that:

1. **`.no-js` on `<html>`** — content is visible by default. `main.js` removes
   the class as its very first statement, so reveal animations only activate
   once the script is confirmed running.
2. **Scroll/resize sweep** — alongside the `IntersectionObserver`, a plain
   geometry check reveals anything that enters the viewport. If the observer
   never fires, the sweep still does the job.
3. **`<noscript>` + `@media print`** — both force content visible.

To verify in a browser: disable JS, or break `main.js`, and confirm the pages
still render fully.

---

## 📬 Deploying to GitHub Pages

```bash
git init
git add .
git commit -m "Portfolio v3"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

**Settings → Pages → Source: `main` / `/ (root)`**.
Live at `https://<you>.github.io/<repo>/` — the `projects/` pages work automatically.

To replace the old portfolio, push this over the existing `mtonoy/tonoy` repository
that already serves `mtonoy.github.io/tonoy/`.

Netlify, Vercel, Cloudflare Pages and GitLab Pages all work too — no server-side code.

---

## 🧑 Author

**Md. Mahamudul Hasan Tonoy**
Senior Software Engineer · ASA Bangladesh
[tonoy300@gmail.com](mailto:tonoy300@gmail.com) · [+880 1673 282 415](tel:+8801673282415)
[Dhaka, Bangladesh](https://maps.google.com/?q=Rampura,Dhaka,Bangladesh)
[GitHub](https://github.com/Mtonoy) · [LinkedIn](https://www.linkedin.com/in/mtonoy/) ·
[Facebook](https://www.facebook.com/mahamudul.hasantonoy) ·
[Twitter](https://twitter.com/tonoy300) · [Instagram](https://www.instagram.com/m_tonoy300/)