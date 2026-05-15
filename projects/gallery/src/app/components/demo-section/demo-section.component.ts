import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
      @if (code(); as snippet) {
        <div class="section__code">
          <div class="section__code-head">
            <span class="section__code-lang">{{ codeLang() }}</span>
            <button
              type="button"
              class="section__code-copy"
              (click)="copy(snippet)"
            >
              {{ copied() ? 'Copied' : 'Copy' }}
            </button>
          </div>
          <pre><code>{{ snippet }}</code></pre>
        </div>
      }
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

    .section__code {
      margin-top: 1.5rem;
      border-radius: 0.5rem;
      border: 1px solid var(--bt-outline);
      background-color: var(--bt-surface-0);
      overflow: hidden;
    }

    .section__code-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.4rem 0.75rem;
      background-color: var(--bt-surface-2);
      border-bottom: 1px solid var(--bt-outline);
    }

    .section__code-lang {
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--bt-text-muted);
    }

    .section__code-copy {
      font: inherit;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid var(--bt-outline);
      background-color: transparent;
      color: var(--bt-text-default);
      padding: 0.2rem 0.625rem;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease;

      &:hover {
        background-color: var(--bt-surface-1);
        color: var(--bt-text-strong);
      }
    }

    pre {
      margin: 0;
      padding: 0.9rem 1rem;
      overflow-x: auto;
      font-family: ui-monospace, monospace;
      font-size: 0.8125rem;
      line-height: 1.55;
      color: var(--bt-text-default);
    }

    code {
      font-family: inherit;
    }
  `,
})
export class DemoSectionComponent {
  readonly title = input.required<string>();
  readonly description = input<string | undefined>(undefined);
  readonly code = input<string | undefined>(undefined);
  readonly codeLang = input<string>('HTML');

  private readonly document = inject(DOCUMENT);
  protected readonly copied = signal(false);
  private resetTimer: ReturnType<typeof setTimeout> | undefined;

  protected async copy(snippet: string): Promise<void> {
    const nav = this.document.defaultView?.navigator;
    if (!nav?.clipboard) return;
    try {
      await nav.clipboard.writeText(snippet);
      this.copied.set(true);
      clearTimeout(this.resetTimer);
      this.resetTimer = setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // Clipboard write may fail in insecure contexts; nothing to do.
    }
  }
}
