# Mădălin Stroe — Personal Brand Landing Page

Static personal-brand website for Mădălin Stroe, focused on QA automation, reliable AI workflows, and AI-assisted software delivery.

## Live site

- Primary URL: <https://mst1923.github.io/landing-page/>
- Repository: <https://github.com/mst1923/landing-page>

The GitHub Pages URL is the canonical URL used by the page metadata, structured data, `robots.txt`, and `sitemap.xml`.

## Project structure

- `index.html` — production page, styles, structured data, and small interaction scripts
- `images/` — favicon and social-sharing assets
- `robots.txt` — crawler directives and sitemap location
- `sitemap.xml` — Search Console-ready sitemap
- `googlea6aa7d1a385bc196.html` — Google Search Console verification
- `.nojekyll` — serves the repository as static files without Jekyll processing
- `output/playwright/` — ignored local visual-QA artifacts
- `new_theme/` — ignored local design reference

## Local preview

No build step is required. From the repository root, run:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173/>.

## Deployment

GitHub Pages publishes the static files from the repository root on the `main` branch. A push to `main` updates the primary site.

If the existing Cloudflare Pages project remains connected to this GitHub repository, configure it with:

- Production branch: `main`
- Root directory: repository root
- Framework preset: none
- Build command: blank (or `exit 0`)
- Build output directory: repository root (`.`)
- Environment variables: none
- Automatic production deployments: enabled

Cloudflare Pages should then deploy the same commit automatically after it is pushed. The GitHub Pages address remains canonical unless the site is deliberately migrated to a custom domain later.

## Release checks

Before publishing:

1. Preview the site locally and check desktop and mobile layouts in both themes.
2. Confirm navigation, contact links, the mobile phone link, theme persistence, and keyboard access.
3. Validate `robots.txt`, `sitemap.xml`, canonical metadata, JSON-LD, and the 1200×630 social image.
4. Commit the release and push `main`.
5. Verify the GitHub Pages deployment and, if connected, the Cloudflare Pages deployment.

No browser-test CI workflow is used for this one-time rebuild.

## Rollback

If a production issue is found, revert the release commit and push the revert to `main`. GitHub Pages and a Git-connected Cloudflare Pages project will redeploy the previous version. Cloudflare Pages also retains prior deployments that can be promoted from its dashboard if needed.
