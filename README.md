# brandonmbooth.net

Astro site, deployed via GitHub Actions to GitHub Pages, custom domain `www.brandonmbooth.net`.
No CMS/DB - everything is a file in this repo. `git push` to `main` -> auto rebuild + deploy.

## Commands

```bash
npm install
npm run dev              # localhost:4321, live reload
npm run build             # -> dist/
npm run preview           # serve the dist/ build locally
npm run new:post -- "Title"      # scaffold src/content/blog/title.md
npm run new:project -- "Title"   # scaffold src/content/projects/title.md
```

## File map

```
src/content/blog/           posts (frontmatter: title, description?, date, tags[], draft, coverImage?)
src/content/projects/       one file per project (frontmatter below)
src/data/publications/*.bib     drop/edit .bib files here - picked up automatically
src/data/csl-styles/        MLA/Chicago CSL files - don't touch
src/site.config.ts          bio, nav, EXTERNAL_LINKS (lab, scholar, linkedin, etc.)
src/pages/index.astro       bio paragraph lives here directly (not in config)
public/cv.pdf               replace with Overleaf export, keep filename
public/CNAME                custom domain - don't delete
scripts/build-publications.mjs   .bib -> publications.generated.json (runs pre-dev/pre-build)
```

## Project frontmatter fields

`category`: research | personal | work · `summary` · `dates` · `organization` ·
`image` / `imageAlt` (files in `public/images/projects/`) · `links: [{label, url}]` ·
`tags` · `featured: true` (shows on home) · `draft: true` (hides from index)

## Publications workflow

1. Scholar -> profile -> select papers -> Export -> BibTeX (or per-paper quote icon).
2. Paste into `src/data/publications/booth.bib`.
3. `npm run dev`/`build` regenerates the page automatically.

Non-standard fields I use: `category = {journal|conference|book|patent|preprint|unpublished|other}`,
`pdf = {/papers/my-draft.pdf}` (self-hosted draft, put file in `public/papers/`).

Renders APA/MLA/Chicago/BibTeX per entry, client-side search/filter/sort. No Scholar
auto-sync (no API, scraping = ToS violation + fragile) - manual BibTeX paste is the intended
workflow since I want to post drafts before they're formally published.

## Deploy checklist (new machine / repo re-setup)

1. New GitHub repo, push this project.
2. Settings -> Pages -> Source = GitHub Actions.
3. Settings -> Pages -> Custom domain = `www.brandonmbooth.net` (CNAME file should auto-fill this).
4. DNS at registrar:

   | Type  | Host | Value |
   |-------|------|-------|
   | A     | @    | 185.199.108.153 |
   | A     | @    | 185.199.109.153 |
   | A     | @    | 185.199.110.153 |
   | A     | @    | 185.199.111.153 |
   | CNAME | www  | `<username>.github.io.` |

5. After DNS propagates: Settings -> Pages -> Enforce HTTPS.

Then it's just `git add -A && git commit -m "..." && git push`.

`dist/` is plain static HTML/CSS/JS - portable to Netlify/Cloudflare Pages/Vercel/S3/etc.
with zero source changes if I ever want off GitHub Pages.

## License

Code: MIT (see `LICENSE`). Blog/written content: CC BY 4.0. Photos + CV: all rights reserved.

## Open TODOs

- [ ] `EXTERNAL_LINKS.lab` in `site.config.ts` - still a placeholder, need the real CUBES Lab URL
- [ ] Confirm `SITE.email` is current
- [ ] Swap placeholder-author `.bib` entries for real Scholar exports over time
- [ ] Maybe add fuller photo galleries to Experience Lab / Sample Return / Arcade Joystick / Fan Art Ceramics
- [ ] Create `.github/workflows/deploy.yml` by hand if starting a fresh repo (device bridge can't write this path)
