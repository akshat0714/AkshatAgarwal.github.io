# Online Portfolio

A clean, multi-page portfolio site built for the PLTW Online Portfolio rubric.
Plain HTML / CSS / JavaScript — no build step, no frameworks. It works on
GitHub Pages exactly as-is.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home / landing page |
| `about.html` | About Me |
| `resume.html` | Resume |
| `projects.html` | Projects overview |
| `project-1.html` / `project-2.html` | Two project write-ups |
| `css/style.css` | All styling |
| `js/main.js` | Mobile menu + scroll animations |
| `images/` | Placeholder images (swap for your own) |

---

## Put it on GitHub Pages

### Option A — straight from the GitHub website (easiest, no tools)
1. Go to https://github.com/new and create a repository.
   - To get a clean URL `https://YOURUSERNAME.github.io`, name the repo **exactly** `YOURUSERNAME.github.io`.
   - Any other name works too; the URL just becomes `https://YOURUSERNAME.github.io/REPO-NAME/`.
2. On the new repo page click **uploading an existing file**.
3. Drag in **everything inside this folder** (the `.html` files, the `css`, `js`, and `images` folders, and `.nojekyll`). Commit.
4. Go to **Settings → Pages**.
5. Under **Build and deployment → Source**, choose **Deploy from a branch**.
6. Set the branch to **main** and the folder to **/ (root)**, then **Save**.
7. Wait ~1 minute, refresh, and your live link appears at the top of that page.

### Option B — with Git on your computer
```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/YOURREPO.git
git push -u origin main
```
Then enable Pages in **Settings → Pages** (steps 4–7 above).

> Important: the homepage file is named `index.html`. GitHub Pages loads that
> automatically — don't rename it.

---

## Make it yours (customization checklist)

1. **Your name** — open each `.html` file and replace `Your Name` (it appears in
   the nav, the footer, and the page text). A find-and-replace across all files
   is the fastest way.
2. **Links** — update the `mailto:you@example.com`, GitHub, and LinkedIn links in
   the footer of every page.
3. **About** — write your real bio, skills, and quick facts in `about.html`.
4. **Resume** — fill in education, experience, skills, and activities in
   `resume.html`. To offer a PDF download, add a file named `resume.pdf` to this
   folder (or delete the "Download PDF" button).
5. **Projects** — edit `project-1.html` and `project-2.html`: title, course,
   date, description, what you learned, documentation links, and images.
6. **Images** — replace the files in `images/` with your own photos. Keep the
   same filenames and your images appear automatically, **or** change the `src`
   in the HTML. A real headshot goes in `images/headshot.svg` (a `.jpg`/`.png`
   works — just update the `src`).
7. Anywhere you see an `✏️ EDIT` comment in the HTML, that's a spot to change.

---

## Editing tips
- Open the `.html` files in any text editor (VS Code is great and free).
- Double-click `index.html` to preview locally in your browser before pushing.
- The colors and fonts live at the top of `css/style.css` under `:root` — change
  `--accent` to recolor the whole site in one line.
