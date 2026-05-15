# @mucsi96/angular-material-theme

A future-proof, opinionated **dark Angular Material 21+ theme**, distilled from
[`mucsi96/ui-elements`](https://github.com/mucsi96/ui-elements). The theme is
built on top of Angular Material's M3 system tokens — no internal selectors,
no `!important`, so it survives Material upgrades.

- Live gallery: <https://mucsi96.github.io/angular-material-theme/>
- Source: <https://github.com/mucsi96/angular-material-theme>

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
    // ...
    provideAngularMaterialTheme(),
  ],
};
```

### From there

- Use any `--bt-*` token from your own styles — `background-color: var(--bt-surface-1);`.
- Drop in `<bt-bar-loader />` for page-level loading.
- Use `<bt-split-button label="Save" (primaryAction)="save()">…</bt-split-button>` when you need a primary action with a secondary menu.
- Use `<bt-donut-slider [(value)]="amount" [valuePerTurn]="100" />` for a touch-friendly multi-turn rotary number input.
- Fire toasts with `NotificationsService.success() / .error()`.
- Render inline alerts with the `.bt-notification` / `.bt-notification--success` / `.bt-notification--error` classes.
- Override any Material token in the same selector: `--mat-sys-tertiary: var(--bt-success);`.

## Customizing

Every color is overridable. Two layers:

```scss
html {
  @include bt.theme();

  // Override an `--bt-*` token (cascades into Material).
  --bt-primary: hsl(280, 80%, 60%);

  // Or override a Material system token directly.
  --mat-sys-tertiary: var(--bt-success);
}
```

You can also `@use` the palette module directly to read the raw HSL values:

```scss
@use '@mucsi96/angular-material-theme/styles/palette' as bt-palette;

.banner {
  background-color: bt-palette.$brand-primary;
}
```

## What the mixin does

1. Emits `--bt-*` design tokens on `:root` so your own styles can reuse them.
2. Configures Angular Material's M3 theme (`mat.theme()`) with a blue/violet
   palette pair.
3. Re-maps `--mat-sys-*` tokens onto the ui-elements palette so all MDC
   components inherit the look.
4. Applies small component tweaks (border radii, menu padding, table cell
   padding and row heights, snackbar success/error variants, …).

## Releases

Versions are computed automatically by CI using
[`mucsi96/get-next-version`](https://github.com/mucsi96/get-next-version) — it
inspects existing `theme-*` git tags and conventional commits touching
`projects/theme`, then bumps and stamps `package.json` before the build.
Publishing to npm and creating the GitHub release are gated on its
`hasNextVersion` output, so a push without library changes is a no-op. The
on-disk `"version"` field in `projects/theme/package.json` is a `0.0.0-dev`
placeholder.

## License

MIT © Igor Bari
