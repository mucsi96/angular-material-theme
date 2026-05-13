import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeaderComponent } from './components/app-header/app-header.component';

@Component({
  selector: 'amt-gallery-root',
  imports: [RouterOutlet, AppHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <amt-gallery-app-header />
    <main class="page">
      <router-outlet />
    </main>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }

    .page {
      flex: 1;
      max-width: 80rem;
      width: 100%;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
      box-sizing: border-box;
    }
  `,
})
export class AppComponent {}
