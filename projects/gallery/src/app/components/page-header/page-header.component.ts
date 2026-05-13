import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'bt-gallery-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-header">
      <h1>{{ title() }}</h1>
      @if (subtitle(); as text) {
        <p>{{ text }}</p>
      }
    </header>
  `,
  styles: `
    .page-header {
      margin-bottom: 2rem;
    }

    h1 {
      margin: 0 0 0.25rem;
      font-size: 2rem;
      font-weight: 600;
      color: var(--bt-text-strong);
    }

    p {
      margin: 0;
      color: var(--bt-text-muted);
      font-size: 1rem;
    }
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string | undefined>(undefined);
}
