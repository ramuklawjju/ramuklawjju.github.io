# ramuklawjju.github.io

[![Pages](https://img.shields.io/badge/GitHub%20Pages-live-blue?logo=github)](https://ramuklawjju.github.io)
[![CI](https://github.com/ramuklawjju/ramuklawjju.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/ramuklawjju/ramuklawjju.github.io/actions/workflows/ci.yml)

Personal portfolio site of **Ujjwal** — Java developer, football fan, and lifelong learner from Hazaribagh, India. Hosted via [GitHub Pages](https://pages.github.com/) at <https://ramuklawjju.github.io>.

The site is a small static collection of HTML/CSS/JS pages presented through a macOS-style "dock" navigation.

## Pages

| Page                      | Description                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------- |
| `index.html`              | Entry page — background YouTube playlist + dock.                                                     |
| `home.html`               | Animated multi-coloured "ramuklawjju" letters.                                                       |
| `about.html`              | Intro, hometown, hobbies, and music notes.                                                           |
| `skill.html`              | Skills proficiency chart.                                                                            |
| `portfolio.html`          | Project timeline.                                                                                    |
| `education.html`          | Career & education timeline.                                                                         |
| `blog.html`               | Placeholder for blog posts.                                                                          |
| `contact.html`            | Contact form (wired for [Formspree](https://formspree.io); update the action URL before going live). |
| `wanderlitt.html`         | Standalone tabbed demo (see credits below).                                                          |
| `404.html` / `error.html` | Custom not-found page.                                                                               |

## Running locally

The site is pure static HTML — no build step required.

```bash
# Using Python's built-in server
python3 -m http.server 8000
# Then open http://localhost:8000
```

Or use any other static server (`npx serve`, `live-server`, etc.).

## Project layout

```
.
├── *.html             # One file per page
├── css/               # Page- and section-scoped stylesheets
├── js/                # jQuery + page scripts
├── img/icons/         # Dock icons
├── img/bg/            # Background images
└── .github/workflows/ # CI: HTML lint + link check
```

## Quality checks

CI runs on every push and pull request:

- **HTMLHint** — structural HTML linting (see [`.htmlhintrc`](./.htmlhintrc)).
- **Lychee** — link checker that verifies internal and external URLs.
- **Prettier (check-only)** — formatting consistency for HTML/CSS/JS.

Run them locally:

```bash
npm install               # one-time
npm run lint              # htmlhint
npm run check-links       # lychee (requires lychee CLI)
npm run format:check      # prettier
```

## Credits

This site depends on and was inspired by the following open-source projects and demos. Huge thanks to their authors.

### Libraries

| Library                                                                                 | License                                                              | Use                                                                                                               |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [jQuery](https://jquery.com/)                                                           | MIT                                                                  | DOM & event helpers (`js/jquery.min.js`).                                                                         |
| [normalize.css](https://necolas.github.io/normalize.css/) by Nicolas Gallagher          | MIT                                                                  | Cross-browser baseline (`css/normalize.min.css`).                                                                 |
| [Open Sans](https://fonts.google.com/specimen/Open+Sans) by Steve Matteson              | SIL Open Font License 1.1                                            | Body font on `home`, `portfolio`, `education` (`css/open.sans.css`).                                              |
| Google "Product Sans" (Restricted)                                                      | Restricted — see <https://fonts.google.com/license/googlerestricted> | Letter animation on `home.html` (`css/sans.css`). The repo only references the font; it is **not** redistributed. |
| [Font Awesome 4.7](https://fontawesome.com/v4/)                                         | SIL OFL 1.1 (icons) / MIT (CSS)                                      | Tab icons in `wanderlitt.html`.                                                                                   |
| [jQuery UI](https://jqueryui.com/)                                                      | MIT                                                                  | Used by `wanderlitt.html`.                                                                                        |
| [PrefixFree](https://leaverou.github.io/prefixfree/) by Lea Verou                       | MIT                                                                  | CSS prefix shim in `wanderlitt.html`.                                                                             |
| [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) | YouTube Terms of Service                                             | Background video on `index.html` (`js/index.js`).                                                                 |

### Demos & inspiration

- **Codrops Blueprint: Full Width Tabs** by [@crnacura / Tympanus Codrops](https://tympanus.net/codrops/2014/12/02/blueprint-full-width-tabs/) — provided the tabbed UI, CSS, and sample imagery used in `wanderlitt.html`.
- **"Clearfix" hack** by [Nicolas Gallagher](https://nicolasgallagher.com/micro-clearfix-hack/) — inline `wanderlitt.html` styles.
- The Google-style bouncing letter animation on `home.html` was adapted from a public CodePen demo of the Google logo loading animation.

If you recognise a snippet that should be credited here and isn't, please open an issue or PR.

## Contributing

1. Fork the repo and create a feature branch.
2. Make your changes; run `npm run lint` and `npm run check-links` locally.
3. Open a pull request — CI will verify your changes.

## License

Source code in this repository is released under the [MIT License](./LICENSE). Third-party assets (fonts, icons, libraries) retain their own licenses as listed above. The image assets under `img/` (icons, backgrounds) are the personal property of the site owner unless otherwise noted.
