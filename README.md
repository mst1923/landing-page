# Mădălin Stroe — Personal Website


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

