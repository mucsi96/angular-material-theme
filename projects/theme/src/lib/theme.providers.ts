import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import {
  MAT_BUTTON_CONFIG,
  MatButtonConfig,
} from '@angular/material/button';

const FORM_FIELD_DEFAULTS: MatFormFieldDefaultOptions = {
  appearance: 'fill',
  subscriptSizing: 'dynamic',
  hideRequiredMarker: false,
};

const BUTTON_DEFAULTS: MatButtonConfig = {
  disabledInteractive: true,
};

/**
 * Opinionated defaults that complement the theme: filled form fields with
 * non-floating labels (placeholder-style), and disabled-but-focusable
 * buttons (better keyboard accessibility).
 *
 * Add to `ApplicationConfig.providers`:
 *
 * ```ts
 * providers: [provideAngularMaterialTheme()]
 * ```
 */
export function provideAngularMaterialTheme(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: FORM_FIELD_DEFAULTS },
    { provide: MAT_BUTTON_CONFIG, useValue: BUTTON_DEFAULTS },
  ]);
}
