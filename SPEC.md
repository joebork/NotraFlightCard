# NOTRA Flight Card — Web Version Specification

## 1. Overview

Convert the static NOTRA Flight Card (currently a PNG) into a fillable web page. A
flyer opens the page in a browser, fills in their rocket and flight details, and
prints or saves it as a PDF that reproduces the paper card's layout. The page is a
single, self-contained static site published as a GitHub repository and hosted on
GitHub Pages (`*.github.io`).

### Goals

- Faithfully reproduce the existing card layout on paper (US Letter, portrait).
- All fields fillable in the browser (text, checkboxes, selectable options).
- One click to print / save to PDF; the printed output looks like the paper card.
- Zero build step, zero backend, zero dependencies — deployable by copying files.
- Works offline once loaded; nothing is transmitted anywhere.

### Non-goals (this version)

- No data persistence, accounts, or server submission.
- No JSON export/import (can be added later — see §9).
- No multi-card batch printing.

## 2. Constraints & Platform

- **Stack:** Vanilla HTML + CSS + JavaScript. No frameworks, no bundler.
- **Hosting:** GitHub Pages, served from the repo root (`index.html`).
- **Target:** Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Print via
  the browser's native print dialog ("Save as PDF" destination).
- **Paper:** US Letter (8.5 × 11 in), portrait. Card occupies the top portion,
  matching the source image proportions.
- **Privacy:** Purely client-side. No analytics, no network calls, no cookies.

## 3. Field Inventory

Transcribed from the source card. Grouping mirrors the visual boxes.

### 3.1 Header

| Field | Type | Notes |
|-------|------|-------|
| Date | date picker (`<input type="date">`) | Top-right of card; native browser date picker |

### 3.2 Flyer box (upper-left)

| Field | Type | Notes |
|-------|------|-------|
| Name | text | |
| TRA # | text | Tripoli member number |
| NAR # | text | National Association of Rocketry number |
| Certification Level | text | e.g. L0–L3 |

### 3.3 Recovery box (lower-left)

| Field | Type | Notes |
|-------|------|-------|
| Parachute | checkbox | Recovery device group |
| Streamer | checkbox | |
| Other | checkbox | |
| Apogee Ejection | checkbox | |
| Dual Deploy | checkbox | |
| Electronics Type | text | |
| Drogue | checkbox | |
| Drogueless | checkbox | |
| Main at ___ feet | number/text | Deployment altitude |
| Main Parachute size | text | |

### 3.4 Rocket box (upper-right)

| Field | Type | Notes |
|-------|------|-------|
| Rocket Mfg/Name | text | |
| Kit | checkbox | Build type group |
| Scratch Built | checkbox | |
| First Flight | checkbox | |
| Length | text | with unit implied |
| Dia (diameter) | text | |
| Weight | text | |
| Color(s) | text | |
| Multi-Stage | checkbox | |
| Cluster | checkbox | |
| Air Start | checkbox | |
| Motor Mfg/Type(s) | text | |
| Commercial | checkbox | Motor category group |
| Research | checkbox | |
| Cert. Flight | checkbox | |
| Expected Altitude | text/number | |
| Heads Up | checkbox | |

### 3.5 Range / RSO row

| Field | Type | Notes |
|-------|------|-------|
| RSO Check | box (blank) | Filled by Range Safety Officer; leave as an empty box |
| Pad # | box (blank) | Assigned at the range; empty box |

### 3.6 Rod/Rail Size (bottom bar)

Single value chosen from: `1/8`, `3/16`, `1/4`, `3/8`, `7/16`, `1010`, `1515`
(plus a blank "—" for no selection).

On screen the value is chosen from a **dropdown** (`<select>`) next to the label.
The full row of options is always rendered as static text (matching the paper card),
and the value matching the dropdown is marked with an **outline**.

On print the dropdown itself is hidden; only the static row of options prints, with
the selected value still indicated by its outline. This keeps the printed card
identical to the paper original while giving on-screen users a compact picker.

## 4. Layout

Reproduce the source grid:

```
┌───────────────────────────── NOTRA FLIGHT CARD ────────── DATE: ____ ┐
│ ┌── Flyer ─────────────┐  ┌──────── Rocket ──────────────────────┐   │
│ │ Name / TRA# / NAR#   │  │ Mfg/Name, build type, dims, colors,  │   │
│ │ Certification Level  │  │ stage flags, motor, category, alt    │   │
│ ├── Recovery ──────────┤  └──────────────────────────────────────┘   │
│ │ device / ejection /  │  ┌── RSO Check ──┐   ┌── Pad # ──┐          │
│ │ electronics / main   │  └───────────────┘   └───────────┘          │
│ └──────────────────────┘                                             │
│ ┌── Rod/Rail Size:  1/8  3/16  1/4  3/8  7/16  1010  1515 ─────────┐  │
│ └──────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────┘
```

- Two-column upper region: left column stacks the Flyer and Recovery boxes; right
  column holds the Rocket box above the RSO Check / Pad # boxes.
- Full-width Rod/Rail bar underneath.
- Boxes have solid black borders matching the original.
- Fixed card width (~7.5 in printable) so screen and print match.

## 5. Behavior

- **Fill:** All inputs editable inline. Checkboxes toggle. Date uses the native date
  picker. Rod/Rail is chosen from a dropdown, which outlines the matching value in the
  printed row.
- **Print / Save PDF:** A "Print / Save PDF" button triggers `window.print()`. Print
  CSS hides on-screen controls (buttons), removes input chrome (borders/backgrounds
  become invisible so entered text sits on the ruled lines), and forces the card to a
  single Letter page.
- **Clear:** A "Clear" button resets all fields to blank (with confirm).
- **No validation blocking:** Fields are free-form; a flyer can print a partially
  completed card (the RSO completes the rest by hand or the flyer fills at the pad).

## 6. Print / PDF Requirements

- `@page { size: letter portrait; margin: 0.5in; }`
- On-screen-only elements (`.no-print`: buttons, help text) hidden in print.
- Inputs render borderless with visible typed values; checkbox states preserved.
- Underlines under labels (Name, TRA#, etc.) remain so blank fields still show a line.
- If no date is selected, the date field prints **blank** (just the line) — the
  native `mm/dd/yyyy` placeholder is suppressed.
- The rod/rail **dropdown is hidden**; the static row of values prints, with the
  selected value outlined.
- Card fits one page; no clipped content or page-2 overflow.
- Black-on-white, no background fills that waste toner.

## 7. Accessibility

- Every input has an associated `<label>` (clicking the label focuses the field).
- Checkbox groups use `fieldset`/`legend` where practical.
- Sufficient contrast; keyboard-navigable; logical tab order top-to-bottom,
  left-to-right.

## 8. Repository Structure

```
notra-flight-card/
├── index.html        # the card
├── styles.css        # screen + print styles
├── script.js         # print / clear / rod-rail select
├── README.md         # what it is + how to deploy
├── LICENSE           # MIT
└── .gitignore
```

### Deployment (GitHub Pages)

1. Create a public repo, e.g. `notra-flight-card`.
2. Push these files to the default branch (`main`).
3. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`.
4. Site publishes at `https://<user-or-org>.github.io/notra-flight-card/`.
5. (Optional) For a bare `https://<org>.github.io/` URL, name the repo
   `<org>.github.io` instead.

No Actions workflow or build step is required for a static root-served site.

## 9. Future Enhancements (out of scope now)

- JSON export/import to save and pre-fill known rockets.
- `localStorage` presets for repeat flyers.
- Date field defaulting to today.
- Multiple cards per sheet (e.g., 2-up) for a range printout.
- Club logo / branding in the header.
- QR code linking flight to an online log.

## 10. Acceptance Criteria

- Page renders the full card with every field from §3 present and fillable.
- Date field opens the native date picker.
- Rod/Rail size is chosen from a dropdown; the chosen value is outlined in the row.
- "Print / Save PDF" produces a clean, single-page Letter PDF that visually matches
  the paper card, with typed values legible, the rod/rail dropdown hidden, the chosen
  rod/rail value outlined, and no on-screen buttons showing.
- "Clear" empties all fields.
- Deploys unchanged to GitHub Pages from repo root and works offline after load.
