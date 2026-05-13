import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemoSectionComponent } from '../../components/demo-section/demo-section.component';

@Component({
  selector: 'amt-gallery-typography-page',
  imports: [PageHeaderComponent, DemoSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './typography-page.component.html',
  styleUrl: './typography-page.component.scss',
})
export class TypographyPageComponent {}
