import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemoSectionComponent } from '../../components/demo-section/demo-section.component';

@Component({
  selector: 'bt-gallery-menus-page',
  imports: [
    PageHeaderComponent,
    DemoSectionComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menus-page.component.html',
})
export class MenusPageComponent {}
