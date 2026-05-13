# angular-material-theme

A future-proof, opinionated **dark Angular Material 21+ theme** inspired by
[`mucsi96/ui-elements`](https://github.com/mucsi96/ui-elements), packaged as
[`@mucsi96/angular-material-theme`](./projects/theme/README.md) on npm.

## Repository layout

This is a multi-project Angular workspace.

| Project                          | Path                | Purpose                                        |
| -------------------------------- | ------------------- | ---------------------------------------------- |
| `@mucsi96/angular-material-theme` | `projects/theme`    | The publishable theme library (SCSS + tiny TS) |
| `gallery`                        | `projects/gallery`  | Component gallery deployed to GitHub Pages     |

## Develop

```bash
npm install
npm run build:theme    # build the library to dist/theme
npm start              # serve the gallery on http://localhost:4200
```

The gallery imports the theme via the workspace TypeScript path mapping, so
edits to `projects/theme` are picked up immediately during `npm start`.

## Build for release

```bash
npm run build:theme       # publishable artifact in dist/theme
npm run build:gallery     # static site in dist/gallery (with /angular-material-theme/ base href)
```

## Continuous delivery

`/.github/workflows/build.yml` runs on every push:

- Builds the theme library and the gallery.
- On `main`, deploys the gallery to **GitHub Pages**.
- On `main`, publishes the theme to **npm** when `projects/theme/package.json`
  has a new version (the workflow checks `npm view` first, so re-running on the
  same version is a no-op).

See [`projects/theme/README.md`](./projects/theme/README.md) for usage in a
consuming application.
