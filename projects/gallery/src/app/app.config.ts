import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAngularMaterialTheme } from '@mucsi96/angular-material-theme';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Hash routing keeps GitHub Pages deep links working without server config.
    provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(),
    provideAngularMaterialTheme(),
  ],
};
