import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';

/**
 * Five vertical bars that stretch in sequence — the same loader shape as
 * `mucsi96/ui-elements`, themed against `--amt-text-strong`.
 *
 * Use it as a page-level "loading" indicator. For inline progress, prefer
 * `mat-progress-spinner` or `mat-progress-bar` (already themed).
 */
@Component({
  selector: 'amt-bar-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'progressbar',
    'aria-busy': 'true',
    '[attr.aria-label]': 'label()',
    class: 'amt-bar-loader',
    '[style.--amt-bar-loader-color]': 'color()',
  },
  template: `
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  `,
  styles: `
    .amt-bar-loader {
      display: inline-grid;
      grid-template-columns: repeat(5, auto);
      gap: 0.25rem;
      align-items: center;
      justify-content: center;
      height: 4rem;

      > div {
        display: inline-block;
        width: 0.5rem;
        height: 100%;
        background-color: var(
          --amt-bar-loader-color,
          var(--amt-text-strong, currentColor)
        );
        opacity: 0.85;
        animation: amt-bar-loader-stretch 1.2s infinite ease-in-out;

        &:nth-child(2) {
          animation-delay: -1.1s;
        }
        &:nth-child(3) {
          animation-delay: -1s;
        }
        &:nth-child(4) {
          animation-delay: -0.9s;
        }
        &:nth-child(5) {
          animation-delay: -0.8s;
        }
      }
    }

    @keyframes amt-bar-loader-stretch {
      0%,
      40%,
      100% {
        transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .amt-bar-loader > div {
        animation: none;
        transform: scaleY(0.7);
      }
    }
  `,
})
export class BarLoaderComponent {
  /** Accessible label announced by screen readers. */
  readonly label = input<string>('Loading');
  /**
   * Optional override for the bar color. Accepts any CSS color value;
   * defaults to `var(--amt-text-strong)`.
   */
  readonly color = input<string | undefined>(undefined);
}
