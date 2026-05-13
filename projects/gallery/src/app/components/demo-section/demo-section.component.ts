import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'bt-gallery-demo-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <header class="section__head">
        <h2 class="section__title">{{ title() }}</h2>
        @if (description(); as text) {
          <p class="section__description">{{ text }}</p>
        }
      </header>
      <div class="section__body">
        <ng-content />
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .section {
      background-color: var(--bt-surface-1);
      border: 1px solid var(--bt-outline);
      border-radius: 0.75rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .section__head {
      margin-bottom: 1.25rem;
    }

    .section__title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--bt-text-strong);
    }

    .section__description {
      margin: 0.25rem 0 0;
      color: var(--bt-text-muted);
      font-size: 0.875rem;
    }

    .section__body {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: flex-start;
    }
  `,
})
export class DemoSectionComponent {
  readonly title = input.required<string>();
  readonly description = input<string | undefined>(undefined);
}
