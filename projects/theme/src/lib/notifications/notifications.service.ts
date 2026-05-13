import { Injectable, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';

const DEFAULT_DURATION_MS = 4000;

const BASE_CONFIG: MatSnackBarConfig = {
  duration: DEFAULT_DURATION_MS,
  horizontalPosition: 'end',
  verticalPosition: 'top',
};

/**
 * Thin wrapper around `MatSnackBar` that applies the theme's success/error
 * panel classes. Snackbar styling is provided by the theme itself
 * (`.bt-snackbar-success`, `.bt-snackbar-error`); this service just makes
 * the calling code obvious at the use-site.
 */
@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private readonly snackBar = inject(MatSnackBar);

  success(
    message: string,
    config?: MatSnackBarConfig,
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.open(message, 'bt-snackbar-success', config);
  }

  error(
    message: string,
    config?: MatSnackBarConfig,
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.open(message, 'bt-snackbar-error', config);
  }

  private open(
    message: string,
    panelClass: string,
    config?: MatSnackBarConfig,
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, 'Dismiss', {
      ...BASE_CONFIG,
      ...config,
      panelClass: [panelClass, ...(config?.panelClass ?? [])],
    });
  }
}
