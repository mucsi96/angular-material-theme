import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsService } from '@mucsi96/angular-material-theme';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemoSectionComponent } from '../../components/demo-section/demo-section.component';

@Component({
  selector: 'amt-gallery-notifications-page',
  imports: [
    PageHeaderComponent,
    DemoSectionComponent,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notifications-page.component.html',
  styleUrl: './notifications-page.component.scss',
})
export class NotificationsPageComponent {
  private readonly notifications = inject(NotificationsService);

  protected success(): void {
    this.notifications.success('Project saved successfully.');
  }

  protected error(): void {
    this.notifications.error('Could not reach the server. Please retry.');
  }
}
