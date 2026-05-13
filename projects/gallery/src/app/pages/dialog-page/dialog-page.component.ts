import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemoSectionComponent } from '../../components/demo-section/demo-section.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

@Component({
  selector: 'amt-gallery-dialog-page',
  imports: [
    PageHeaderComponent,
    DemoSectionComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-page.component.html',
  styleUrl: './dialog-page.component.scss',
})
export class DialogPageComponent {
  private readonly dialog = inject(MatDialog);
  protected readonly lastResult = signal<string | undefined>(undefined);

  protected openConfirm(): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete project?',
        message:
          'This will permanently remove the project and its history. You cannot undo this action.',
      },
    });
    ref.afterClosed().subscribe((result) =>
      this.lastResult.set(result === true ? 'Confirmed' : 'Dismissed'),
    );
  }

  protected openForm(): void {
    const ref = this.dialog.open(FormDialogComponent, { width: '480px' });
    ref.afterClosed().subscribe((result?: { name: string; email: string }) =>
      this.lastResult.set(result ? `Submitted: ${result.name}` : 'Dismissed'),
    );
  }
}
