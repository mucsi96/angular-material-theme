import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemoSectionComponent } from '../../components/demo-section/demo-section.component';

interface Project {
  readonly name: string;
  readonly owner: string;
  readonly status: 'active' | 'paused' | 'archived';
  readonly updated: string;
  readonly issues: number;
}

const SEED: readonly Project[] = [
  { name: 'angular-material-theme', owner: 'mucsi96', status: 'active', updated: '2 hours ago', issues: 3 },
  { name: 'ui-elements', owner: 'mucsi96', status: 'active', updated: '1 day ago', issues: 1 },
  { name: 'workout-tracker', owner: 'mucsi96', status: 'paused', updated: '2 weeks ago', issues: 12 },
  { name: 'pixel-perfect', owner: 'mucsi96', status: 'active', updated: '3 days ago', issues: 0 },
  { name: 'legacy-portal', owner: 'mucsi96', status: 'archived', updated: '8 months ago', issues: 0 },
  { name: 'storybook-sandbox', owner: 'mucsi96', status: 'paused', updated: '1 month ago', issues: 5 },
];

@Component({
  selector: 'amt-gallery-table-page',
  imports: [
    PageHeaderComponent,
    DemoSectionComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss',
})
export class TablePageComponent {
  protected readonly columns: readonly string[] = [
    'name',
    'owner',
    'status',
    'updated',
    'issues',
    'actions',
  ];

  protected readonly rows = signal<readonly Project[]>(SEED);
  protected readonly selectedRow = signal<Project | undefined>(undefined);

  protected select(row: Project): void {
    this.selectedRow.update((current) => (current === row ? undefined : row));
  }

  protected sortBy(event: Sort): void {
    if (!event.active || event.direction === '') {
      this.rows.set(SEED);
      return;
    }
    const dir = event.direction === 'asc' ? 1 : -1;
    const sorted = [...SEED].sort((a, b) => {
      const av = a[event.active as keyof Project];
      const bv = b[event.active as keyof Project];
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
    this.rows.set(sorted);
  }
}
