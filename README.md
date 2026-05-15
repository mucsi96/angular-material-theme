# @mucsi96/angular-material-theme

A future-proof, opinionated **dark Angular Material 21+ theme** inspired by
[`mucsi96/ui-elements`](https://github.com/mucsi96/ui-elements), packaged as
[`@mucsi96/angular-material-theme`](./projects/theme/README.md) on npm.

- Live gallery: <https://mucsi96.github.io/angular-material-theme/>
- Package docs: [`projects/theme/README.md`](./projects/theme/README.md)

## Getting started

The theme ships as SCSS plus a couple of small Angular helpers. Drop it
into any Angular 21+ application in three steps.

### 1. Install

Install the package alongside the Angular Material peers.

```bash
npm install @mucsi96/angular-material-theme @angular/material @angular/cdk
```

### 2. Apply the theme

Add the mixin to your global stylesheet (e.g. `src/styles.scss`). That
single call emits the `--bt-*` design tokens, runs `mat.theme()`, and
re-maps Material's M3 system tokens onto the ui-elements palette.

```scss
@use '@mucsi96/angular-material-theme/styles' as bt;

html {
  @include bt.theme();
}
```

### 3. (Optional) wire up the providers

In `app.config.ts`, register the opinionated defaults (outlined form
fields, accessible disabled buttons) and you're done.

```ts
import { provideAngularMaterialTheme } from '@mucsi96/angular-material-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideAngularMaterialTheme(),
  ],
};
```

### From there

- Use any `--bt-*` token from your own styles — `background-color: var(--bt-surface-1);`.
- Drop in `<bt-bar-loader />` for page-level loading and `NotificationsService.success() / .error()` for toasts.
- Use the `.bt-notification` / `.bt-notification--success` / `.bt-notification--error` classes for inline alerts.
- Override any Material token in the same selector: `--mat-sys-tertiary: var(--bt-success);`.

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

`.github/workflows/build.yml` runs on every push:

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

See [`projects/theme/README.md`](./projects/theme/README.md) for full
usage in a consuming application.

[tp]: https://docs.npmjs.com/trusted-publishers
