# brandonmbooth.net

Source for Brandon M. Booth's academic website: built with [Astro](https://astro.build),
hosted for free on GitHub Pages, and served from the custom domain `www.brandonmbooth.net`.
Everything - blog posts, projects, publications - is a plain text file in this repo; there is
no CMS, database, or third-party builder involved. Update content by editing files and running
`git push`; a GitHub Action rebuilds and redeploys the site automatically.

## Quick start (local development)

Requires [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

This starts a local server (usually `http://localhost:4321`) that live-reloads as you edit
files. Run `npm run build` to produce the static site in `dist/`, and `npm run preview` to
serve that build locally exactly as it will appear in production.

## Where everything lives

```
src/
  content/
    blog/           one Markdown file per blog post
    projects/        one Markdown file per project
  data/
    publications/     drop .bib files here
    csl-styles/       CSL citation style files (APA/MLA/Chicago) - you shouldn't need to touch these
  pages/              the actual site pages/routes (Astro files)
  components/, layouts/, styles/   shared site chrome
  site.config.ts      your name, bio blurb, nav links, external links (lab, LinkedIn, etc.)
public/
  cv.pdf              your CV - replace this file directly
  CNAME               your custom domain (for GitHub Pages) - do not delete
scripts/
  build-publications.mjs   parses the .bib files into the data the publications page uses
  new-post.mjs, new-project.mjs   scaffolding helpers, see below
```

## Adding a blog post

```bash
npm run new:post -- "Title Of My Post"
```

This creates `src/content/blog/title-of-my-post.md` pre-filled with frontmatter (title,
date, tags, `draft: true`). Write your post in Markdown below the frontmatter, then set
`draft: false` when you want it to go live. Posts are sorted newest-first automatically, and
an RSS feed is published at `/blog/rss.xml`.

## Adding a project

```bash
npm run new:project -- "Title Of My Project"
```

Creates `src/content/projects/title-of-my-project.md`. Fields you can set in the frontmatter:

- `category`: `research`, `personal`, or `work` - controls which section it's grouped under on `/projects`
- `summary`: one or two sentences shown on the index card
- `dates`, `organization`: free text, shown under the title
- `image` / `imageAlt`: put image files in `public/images/projects/` and reference them as
  e.g. `/images/projects/my-photo.jpg`
- `links`: a list of `{ label, url }` buttons (paper PDF, code, demo, etc.)
- `tags`: shown as small pills
- `featured: true`: shows the project on the home page
- `draft: true`: hides it from the index while you're still writing it

The body of the file (below the frontmatter) is regular Markdown - this is where "pictures,
updates, paper links, etc." for a project go. A good pattern is an "Updates" section you
append to over time, e.g.:

```markdown
## Updates

- **2026-09-12**: Initial data collection complete.
- **2026-10-01**: Submitted to CHI 2027.
```

## Adding / updating publications

Publications are driven entirely by BibTeX. To add papers:

1. Go to [Google Scholar](https://scholar.google.com), open your profile, select the papers
   you want, and use "Export" -> BibTeX (or click the "99 citations" quote-mark icon on an
   individual paper and choose BibTeX).
2. Paste the entries into `src/data/publications/booth.bib` (or add a new `.bib` file in that
   same folder - every `*.bib` file there is picked up automatically).
3. Run `npm run dev` or `npm run build` - the publications page regenerates automatically.

Two extra (non-standard) BibTeX fields are supported on any entry, useful for the drafts you
want to post yourself before they're formally published:

- `category = {journal|conference|book|patent|preprint|unpublished|other}` - controls which
  filter/section the entry shows under. If omitted, it's guessed from the BibTeX entry type.
- `pdf = {/papers/my-draft.pdf}` - a link to a self-hosted PDF (e.g. put the file in
  `public/papers/` and reference it here), for drafts that don't have a public URL yet.

Each entry automatically renders in **APA, MLA, Chicago (author-date), and raw BibTeX** -
viewers can toggle the format per entry and copy it to their clipboard. The page also has a
live search box, a category filter, and a sort control (newest/oldest/title).

### About Google Scholar integration

There isn't a supported, reliable way to have this site auto-sync with Google Scholar - Google
doesn't offer a public API for it, and scraping Scholar directly is against its terms of
service and breaks unpredictably. The practical setup here is the one you asked for: you stay
in control by pasting in BibTeX (from Scholar or anywhere else) whenever you want, which also
lets you list drafts and unpublished work that would never appear on Scholar. To make manual
cross-checking easy, add your Scholar profile URL to `EXTERNAL_LINKS.googleScholar` in
`src/site.config.ts` - the publications page will then show a "cross-check against my Google
Scholar profile" link right at the top.

## Updating your CV

Export your CV as a PDF from Overleaf and replace `public/cv.pdf` with it (keep the exact
filename `cv.pdf`). The `/cv` page embeds and links to whatever file is at that path - no code
changes needed.

## Editing your bio, nav, and external links

Open `src/site.config.ts`:

- `SITE.email` - update to your current institutional email
- `EXTERNAL_LINKS.lab` / `labLabel` - **please fill this in** with your current lab's URL at
  Memphis; it was left as a placeholder because the migration couldn't find one automatically
- `EXTERNAL_LINKS.googleScholar` - your Scholar profile URL (optional but recommended, see above)
- `EXTERNAL_LINKS.linkedin`, `youtube`, `github` - update or remove as you like

Your bio paragraph itself lives directly in `src/pages/index.astro` (it's plain prose, not
worth making a config field for).

## Deploying (GitHub Pages)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and
deploys the site automatically on every push to `main`. One-time setup:

1. Create a new GitHub repository and push this project to it.
2. In the repo, go to **Settings -> Pages** and set **Source** to "GitHub Actions".
3. Still in **Settings -> Pages**, set **Custom domain** to `www.brandonmbooth.net` (the
   `public/CNAME` file already contains this, so GitHub should pick it up automatically after
   your first successful deploy - but it's worth double-checking here).
4. At your domain registrar (wherever `brandonmbooth.net` is registered), add these DNS
   records so both the bare domain and `www` resolve to GitHub Pages:

   | Type  | Host/Name | Value                     |
   |-------|-----------|---------------------------|
   | A     | `@`       | `185.199.108.153`          |
   | A     | `@`       | `185.199.109.153`          |
   | A     | `@`       | `185.199.110.153`          |
   | A     | `@`       | `185.199.111.153`          |
   | CNAME | `www`     | `<your-github-username>.github.io.` |

   With both set, visits to `brandonmbooth.net` (no `www`) will automatically redirect to
   `https://www.brandonmbooth.net`, matching the `CNAME` file.
5. Once DNS has propagated (can take a few minutes to a few hours), go back to **Settings ->
   Pages** and check **Enforce HTTPS**.

After that, updating the live site is just:

```bash
git add -A
git commit -m "Add new post about X"
git push
```

The Action rebuilds and republishes within a minute or two.

### Why this hosting setup is portable

The `npm run build` output in `dist/` is a plain folder of static HTML/CSS/JS/JSON - nothing
in it is GitHub-specific. If you ever want to move off GitHub Pages, you can deploy that same
`dist/` folder (or point the same repo) at Netlify, Cloudflare Pages, Vercel, an S3 bucket, or
any other static host, typically in a few minutes, with zero changes to the source.

## License

This repository uses two different licenses for two different kinds of content:

- **Code** (Astro components/pages, build scripts, config, CSS, etc.) is licensed under the
  **MIT License** - see [`LICENSE`](./LICENSE). You're welcome to reuse the site template,
  the publications build pipeline, or any other code here in your own projects.
- **Written content** (blog posts, project write-ups, bio text) is licensed under
  [**CC BY 4.0**](https://creativecommons.org/licenses/by/4.0/) - you're welcome to share or
  republish it with attribution and a link back to the original post.
- **Photos and other images**, and the CV PDF, are **not** covered by either license above and
  remain all rights reserved unless a specific image says otherwise.
