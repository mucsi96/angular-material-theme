import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SplitButtonComponent } from '@mucsi96/angular-material-theme';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemoSectionComponent } from '../../components/demo-section/demo-section.component';

@Component({
  selector: 'bt-gallery-buttons-page',
  imports: [
    PageHeaderComponent,
    DemoSectionComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    SplitButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './buttons-page.component.html',
  styleUrl: './buttons-page.component.scss',
})
export class ButtonsPageComponent {
  protected readonly lastAction = signal<string | undefined>(undefined);

  protected setAction(action: string): void {
    this.lastAction.set(action);
  }
}
