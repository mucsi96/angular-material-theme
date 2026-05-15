# @mucsi96/angular-material-theme

[docs](https://mucsi96.github.io/angular-material-theme/)

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
