import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  readonly path: string;
  readonly label: string;
}

@Component({
  selector: 'amt-gallery-app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
    RouterLinkActive,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss',
})
export class AppHeaderComponent {
  protected readonly links: readonly NavLink[] = [
    { path: '/', label: 'Overview' },
    { path: '/buttons', label: 'Buttons' },
    { path: '/inputs', label: 'Inputs' },
    { path: '/menus', label: 'Menus' },
    { path: '/dialog', label: 'Dialog' },
    { path: '/loader', label: 'Loader' },
    { path: '/table', label: 'Table' },
    { path: '/notifications', label: 'Notifications' },
    { path: '/typography', label: 'Typography' },
  ];
}
