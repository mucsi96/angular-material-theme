import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BarLoaderComponent } from '@mucsi96/angular-material-theme';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemoSectionComponent } from '../../components/demo-section/demo-section.component';

@Component({
  selector: 'bt-gallery-loader-page',
  imports: [
    PageHeaderComponent,
    DemoSectionComponent,
    BarLoaderComponent,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loader-page.component.html',
  styleUrl: './loader-page.component.scss',
})
export class LoaderPageComponent {}
