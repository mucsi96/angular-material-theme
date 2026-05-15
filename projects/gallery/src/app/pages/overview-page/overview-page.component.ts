import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';

interface SwatchSpec {
  readonly token: string;
  readonly label: string;
  readonly textOnTop: 'strong' | 'muted';
}

interface DemoLink {
  readonly path: string;
  readonly label: string;
  readonly description: string;
  readonly icon: string;
}

@Component({
  selector: 'bt-gallery-overview-page',
  imports: [PageHeaderComponent, MatCardModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './overview-page.component.html',
  styleUrl: './overview-page.component.scss',
})
export class OverviewPageComponent {
  protected readonly swatches: readonly SwatchSpec[] = [
    { token: 'surface-0', label: 'Surface 0', textOnTop: 'strong' },
    { token: 'surface-1', label: 'Surface 1', textOnTop: 'strong' },
    { token: 'surface-2', label: 'Surface 2', textOnTop: 'strong' },
    { token: 'surface-3', label: 'Surface 3', textOnTop: 'strong' },
    { token: 'primary', label: 'Primary', textOnTop: 'strong' },
    { token: 'link', label: 'Link', textOnTop: 'strong' },
    { token: 'success', label: 'Success', textOnTop: 'strong' },
    { token: 'warn', label: 'Warn', textOnTop: 'strong' },
    { token: 'error', label: 'Error', textOnTop: 'strong' },
  ];

  protected readonly demos: readonly DemoLink[] = [
    {
      path: '/buttons',
      label: 'Buttons',
      description: 'Filled, outlined, text, icon and floating action buttons.',
      icon: 'smart_button',
    },
    {
      path: '/inputs',
      label: 'Inputs',
      description: 'Text fields, selects, autocomplete, and form layouts.',
      icon: 'edit_note',
    },
    {
      path: '/menus',
      label: 'Menus & Dropdowns',
      description: 'Navigation menus, dropdown buttons, and selects.',
      icon: 'list',
    },
    {
      path: '/dialog',
      label: 'Dialog',
      description: 'Modal dialogs with custom content and actions.',
      icon: 'open_in_new',
    },
    {
      path: '/loader',
      label: 'Loader',
      description: 'Signature 5-bar loader plus themed Material progress.',
      icon: 'progress_activity',
    },
    {
      path: '/table',
      label: 'Table',
      description: 'Sortable, selectable Material table with status badges.',
      icon: 'table_chart',
    },
    {
      path: '/notifications',
      label: 'Notifications',
      description: 'Snackbar toasts and inline success / error panels.',
      icon: 'notifications',
    },
    {
      path: '/typography',
      label: 'Typography',
      description: 'Headings, body text, and the type ramp.',
      icon: 'text_fields',
    },
  ];
}
