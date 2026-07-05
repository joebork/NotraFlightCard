# NOTRA Flight Card

A fillable web version of the NOTRA Rocketry Club flight card. Fill it in your
browser and print or save it as a PDF that matches the paper card. Pure static
site — HTML, CSS, and JavaScript with no build step, no backend, and nothing sent
anywhere.

## Use

Open `index.html` in a browser (or visit the published GitHub Pages URL), fill in
the fields, then click **Print / Save PDF** and choose "Save as PDF" as the print
destination.

- **Date** uses your browser's native date picker.
- Checkboxes toggle on click.
- **Rod/Rail Size** is chosen from a dropdown; the matching value in the row is
  outlined. The dropdown doesn't print — the printed card shows the row with the
  selected value outlined, just like the paper original.
- **Clear** empties every field.

Nothing is stored or transmitted; the page works offline once loaded.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The card markup and form fields |
| `styles.css` | Screen layout + print (`@media print`) rules |
| `script.js` | Print, Clear, and rod/rail selection |
| `SPEC.md` | Full specification (fields, layout, behavior, deployment) |

## Deploy to GitHub Pages

1. Create a public repo named `notra-flight-card` and push these files to `main`.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**, branch
   `main`, folder `/ (root)`, and save.
4. The site publishes at
   `https://<your-user-or-org>.github.io/notra-flight-card/`.

No Actions workflow is needed — it's served straight from the repo root.

To host at a bare `https://<org>.github.io/` URL instead, name the repo
`<org>.github.io`.

## License

MIT — see [LICENSE](LICENSE).
