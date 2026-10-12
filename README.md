# Djupeach Portfolio

This public repository hosts the static portfolio at [www.djupeach-portfolio.xyz](https://www.djupeach-portfolio.xyz). GitHub Actions publishes the website to GitHub Pages whenever the site files, source assets, or image build workflow change on `main`.

## Update the portfolio

- Project entries and film stills: `works.js`
- Photography gallery and cover slides: `media.js`
- Page structure and copy: `index.html`
- Visual styles: `styles.css`
- Interaction behavior: `app.js` and `experience.js`
- Original images and fonts: `assets/`

Keep public asset paths relative to the repository root. The deployment workflow builds responsive display images and small thumbnails with `scripts/optimize_images.py`, then publishes only the page files, favicon, fonts, and generated image variants. Original high-resolution files remain in `assets/` for future edits.
