import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemoSectionComponent } from '../../components/demo-section/demo-section.component';

interface Person {
  readonly name: string;
  readonly interest: string;
  readonly owner: string;
  readonly status: 'active' | 'paused' | 'archived';
  readonly updated: string;
  readonly age: number;
}

const SEED: readonly Person[] = [
  { name: 'Chris',  interest: 'HTML tables',         owner: 'mucsi96', status: 'active',   updated: '2 hours ago',  age: 22 },
  { name: 'Dennis', interest: 'Web accessibility',   owner: 'mucsi96', status: 'active',   updated: '1 day ago',    age: 45 },
  { name: 'Sarah',  interest: 'JavaScript frameworks', owner: 'mucsi96', status: 'paused', updated: '3 days ago',   age: 29 },
  { name: 'Karen',  interest: 'Web performance',     owner: 'mucsi96', status: 'active',   updated: '1 week ago',   age: 36 },
  { name: 'Erik',   interest: 'CSS layout',          owner: 'mucsi96', status: 'archived', updated: '8 months ago', age: 51 },
  { name: 'Maya',   interest: 'Animation',           owner: 'mucsi96', status: 'paused',   updated: '1 month ago',  age: 27 },
];

@Component({
  selector: 'bt-gallery-table-page',
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
    'selector',
    'name',
    'interest',
    'owner',
    'status',
    'updated',
    'age',
  ];

  protected readonly rows = signal<readonly Person[]>(SEED);
  protected readonly selectedRow = signal<Person | undefined>(undefined);

  protected select(row: Person): void {
    this.selectedRow.update((current) => (current === row ? undefined : row));
  }

  protected sortBy(event: Sort): void {
    if (!event.active || event.direction === '') {
      this.rows.set(SEED);
      return;
    }
    const dir = event.direction === 'asc' ? 1 : -1;
    const sorted = [...SEED].sort((a, b) => {
      const av = a[event.active as keyof Person];
      const bv = b[event.active as keyof Person];
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
    this.rows.set(sorted);
  }
}
