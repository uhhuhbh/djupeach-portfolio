# Djupeach Portfolio

This public repository hosts the static portfolio at [www.djupeach-portfolio.xyz](https://www.djupeach-portfolio.xyz). GitHub Actions publishes the website to GitHub Pages whenever the site files or assets change on `main`.

## Update the portfolio

- Project entries and film stills: `works.js`
- Photography gallery and cover slides: `media.js`
- Page structure and copy: `index.html`
- Visual styles: `styles.css`
- Interaction behavior: `app.js` and `experience.js`
- Images and fonts: `assets/`

Keep asset paths relative to the repository root. The Actions workflow copies only the six site entry files and `assets/` into the published artifact.
