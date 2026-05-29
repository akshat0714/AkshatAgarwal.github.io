# Akshat Agarwal — Portfolio

A fast, static personal portfolio with a dark "research-lab" aesthetic, an interactive
3D neural-network background (Three.js), and scroll-based motion design.
Plain HTML / CSS / JavaScript — **no build step, no frameworks.**

## Pages
- `index.html` — home: 3D hero, animated stat counters, skills marquee, featured work, recognition
- `about.html` — bio, headshot, skills, quick facts, athletics & nonprofit
- `resume.html` — full resume (Profile · Skills · Education · Athletics · Experience · Awards)
- `projects.html` — overview of the two projects
- `project-1.html` — **Neorons** (founder / AI learning platform)
- `project-2.html` — **Generative AI Research** (JSHS + SPIE, papers & patents)

## Folders
- `css/style.css` — all styling + the motion system (one file)
- `js/three.min.js` — Three.js r128, bundled locally (no CDN needed)
- `js/scene.js` — the 3D neural-network background
- `js/main.js` — nav, scroll progress, reveals, counters, magnetic buttons
- `images/` — headshot + placeholder figures (SVG)

## Make it yours (search for ✏️ in the files)
1. **Photo** — `images/akshat.jpg` / `images/akshat-circle.png` are cropped from your resume. Replace with a higher-res photo if you like (keep the same names).
2. **Phone** — `resume.html` still has the sample number `123-456-7890`. Replace or delete it.
3. **Project figures** — every image in `images/` marked "replace" is a placeholder. Drop in real screenshots/diagrams using the same filenames.
4. **Links** — project pages have `href="#"` placeholders ("Add link"). Paste your real SPIE DOI, patents, demo, etc., or delete those lines.
5. **Resume PDF** — the Download PDF button points to `resume.pdf`. Add that file to this folder, or delete the button in `resume.html`.

Motion respects `prefers-reduced-motion`, and the site looks correct even if WebGL/3D
can't load (the CSS background carries the look).

---

## Deploying to GitHub Pages

**Important:** the files below must sit at the **root of the repo** — *not* inside a
`portfolio/` subfolder. GitHub serves `index.html` from the root, so if it's one level
deep you get a 404.

When uploading, open this folder and select **everything inside it**
(`index.html`, the other `.html` files, and the `css`, `js`, `images` folders) —
**not** the folder itself — then drag those into GitHub.

### Option A — user site (clean URL)
1. Create a repo named **exactly** `yourusername.github.io` (e.g. `akshat0714.github.io`).
2. Upload the **contents** of this folder to the repo root.
3. Settings → Pages → Source: **Deploy from a branch** → **main** → **/(root)** → Save.
4. Live at `https://yourusername.github.io/`.

### Option B — project site
1. Any repo name works.
2. Upload the **contents** to the root, set Pages to **main / (root)**.
3. Live at `https://yourusername.github.io/repo-name/`.

All links are relative, so the site works at either URL with no code changes.
