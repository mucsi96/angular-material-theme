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
- On `main`, derives the next theme version from existing `theme-*` git
  tags and the conventional commits touching `projects/theme` (via
  [`mucsi96/get-next-version`](https://github.com/mucsi96/get-next-version)),
  publishes it to **npm** using [Trusted Publishing][tp] (OIDC — no
  long-lived `NPM_TOKEN` secret), and creates a matching GitHub release
  with auto-generated notes. A push without library changes is a no-op.

The npm package needs to be configured for Trusted Publishing on
[npmjs.com](https://www.npmjs.com/) under the package's
**Settings → Trusted Publishers** tab:

- Publisher: GitHub Actions
- Repository: `mucsi96/angular-material-theme`
- Workflow: `build.yml`
- Environment: (leave blank)

See [`projects/theme/README.md`](./projects/theme/README.md) for usage in a
consuming application.

[tp]: https://docs.npmjs.com/trusted-publishers
