import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

export type SplitButtonColor = 'primary' | 'accent' | 'warn';

/**
 * A button with a primary action on the left and a secondary chevron trigger
 * on the right that opens a `mat-menu` of further actions. Menu items are
 * projected as children:
 *
 * ```html
 * <bt-split-button label="Save" (primaryAction)="save()">
 *   <button mat-menu-item (click)="saveAs()">Save as…</button>
 *   <button mat-menu-item (click)="saveAndClose()">Save and close</button>
 * </bt-split-button>
 * ```
 *
 * Both halves share the same Material color (default `primary`) and inherit
 * the theme's shape and surface tokens, so the widget always matches the
 * surrounding filled buttons.
 */
@Component({
  selector: 'bt-split-button',
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Disabled so the corner-shape overrides for the two halves reach the inner
  // MDC button elements without `::ng-deep`.
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="bt-split-button">
      <button
        mat-flat-button
        class="bt-split-button__primary"
        [color]="color()"
        [disabled]="disabled()"
        (click)="primaryAction.emit()"
      >
        @if (icon(); as i) {
          <mat-icon class="material-symbols-rounded">{{ i }}</mat-icon>
        }
        <span>{{ label() }}</span>
      </button>
      <span class="bt-split-button__divider" aria-hidden="true"></span>
      <button
        mat-flat-button
        class="bt-split-button__secondary"
        [color]="color()"
        [disabled]="disabled()"
        [matMenuTriggerFor]="menu"
        [attr.aria-label]="menuAriaLabel()"
      >
        <mat-icon class="material-symbols-rounded">expand_more</mat-icon>
      </button>
      <mat-menu #menu="matMenu" xPosition="before">
        <ng-content />
      </mat-menu>
    </div>
  `,
  styles: `
    .bt-split-button {
      display: inline-flex;
      align-items: stretch;
      vertical-align: middle;
    }

    // Square off the touching edges via the documented MDC shape token so
    // there's no !important and no internal-selector targeting.
    .bt-split-button__primary {
      --mdc-filled-button-container-shape: 0.5rem 0 0 0.5rem;
      --mat-button-filled-container-shape: 0.5rem 0 0 0.5rem;
    }

    .bt-split-button__secondary {
      --mdc-filled-button-container-shape: 0 0.5rem 0.5rem 0;
      --mat-button-filled-container-shape: 0 0.5rem 0.5rem 0;
      min-width: 2.5rem;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    .bt-split-button__divider {
      align-self: stretch;
      width: 1px;
      flex-shrink: 0;
      background-color: rgba(0, 0, 0, 0.25);
      pointer-events: none;
    }

    // Soften the divider when the widget is disabled, so it blends with the
    // disabled-button background instead of looking like a hard seam.
    .bt-split-button:has(.bt-split-button__primary:disabled)
      .bt-split-button__divider {
      background-color: var(--bt-outline);
    }
  `,
})
export class SplitButtonComponent {
  /** Visible label on the primary (left) half. */
  readonly label = input.required<string>();
  /** Optional Material Symbols icon name shown before the label. */
  readonly icon = input<string | undefined>(undefined);
  /** Material color applied to both halves. */
  readonly color = input<SplitButtonColor>('primary');
  /** Disables both halves; the menu can no longer be opened. */
  readonly disabled = input<boolean>(false);
  /** Accessible label announced for the chevron trigger. */
  readonly menuAriaLabel = input<string>('More actions');
  /** Emitted when the primary half is activated. */
  readonly primaryAction = output<void>();
}
