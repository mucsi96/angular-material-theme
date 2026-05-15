import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/overview-page/overview-page.component').then(
        (m) => m.OverviewPageComponent,
      ),
  },
  {
    path: 'buttons',
    loadComponent: () =>
      import('./pages/buttons-page/buttons-page.component').then(
        (m) => m.ButtonsPageComponent,
      ),
  },
  {
    path: 'inputs',
    loadComponent: () =>
      import('./pages/inputs-page/inputs-page.component').then(
        (m) => m.InputsPageComponent,
      ),
  },
  {
    path: 'menus',
    loadComponent: () =>
      import('./pages/menus-page/menus-page.component').then(
        (m) => m.MenusPageComponent,
      ),
  },
  {
    path: 'dialog',
    loadComponent: () =>
      import('./pages/dialog-page/dialog-page.component').then(
        (m) => m.DialogPageComponent,
      ),
  },
  {
    path: 'typography',
    loadComponent: () =>
      import('./pages/typography-page/typography-page.component').then(
        (m) => m.TypographyPageComponent,
      ),
  },
  {
    path: 'loader',
    loadComponent: () =>
      import('./pages/loader-page/loader-page.component').then(
        (m) => m.LoaderPageComponent,
      ),
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./pages/table-page/table-page.component').then(
        (m) => m.TablePageComponent,
      ),
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./pages/notifications-page/notifications-page.component').then(
        (m) => m.NotificationsPageComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
