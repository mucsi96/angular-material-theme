# @mucsi96/angular-material-theme

A future-proof, opinionated **dark Angular Material 21+ theme**, distilled from
[`mucsi96/ui-elements`](https://github.com/mucsi96/ui-elements). The theme is
built on top of Angular Material's M3 system tokens — no internal selectors,
no `!important`, so it survives Material upgrades.

- Live gallery: <https://mucsi96.github.io/angular-material-theme/>
- Source: <https://github.com/mucsi96/angular-material-theme>

## Install

```bash
npm install @mucsi96/angular-material-theme @angular/material @angular/cdk
```

## Use

In your application's global stylesheet (e.g. `src/styles.scss`):

```scss
@use '@mucsi96/angular-material-theme/styles' as bt;

html {
  @include bt.theme();
}
```

That's it. The mixin will:

1. Emit `--bt-*` design tokens on `:root` so your own styles can reuse them.
2. Configure Angular Material's M3 theme (`mat.theme()`) with a blue/violet
   palette pair.
3. Re-map `--mat-sys-*` tokens onto the ui-elements palette so all MDC
   components inherit the look.
4. Apply small component tweaks (border radii, menu padding, …).

### Optional Angular providers

If you want the project's opinionated Angular defaults — outlined form fields,
disabled-but-focusable buttons — register the provider in your
`ApplicationConfig`:

```ts
import { provideAngularMaterialTheme } from '@mucsi96/angular-material-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideAngularMaterialTheme(),
  ],
};
```

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
