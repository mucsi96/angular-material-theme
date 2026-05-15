import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { DonutSliderComponent } from '@mucsi96/angular-material-theme';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { DemoSectionComponent } from '../../components/demo-section/demo-section.component';

@Component({
  selector: 'bt-gallery-inputs-page',
  imports: [
    PageHeaderComponent,
    DemoSectionComponent,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatIconModule,
    DonutSliderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inputs-page.component.html',
  styleUrl: './inputs-page.component.scss',
})
export class InputsPageComponent {
  protected readonly emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  protected readonly fruits = [
    'Apple',
    'Apricot',
    'Banana',
    'Blueberry',
    'Cherry',
    'Grape',
    'Lemon',
    'Mango',
    'Orange',
    'Peach',
    'Pear',
  ];

  protected readonly query = signal('');

  protected get filteredFruits(): readonly string[] {
    const q = this.query().toLowerCase();
    return q ? this.fruits.filter((f) => f.toLowerCase().includes(q)) : this.fruits;
  }

  // Donut slider demo state.
  protected readonly tipAmount = signal<number>(15);
  protected readonly brewTime = signal<number>(180);
  protected readonly tempC = signal<number>(20);

  // Snippets that contain `{{ }}` live as TS strings — embedding them as
  // attribute values in the template would make Angular try to interpolate
  // the curly braces.
  protected readonly selectCode = `<mat-form-field>
  <mat-label>Favorite fruit</mat-label>
  <mat-select>
    @for (fruit of fruits; track fruit) {
      <mat-option [value]="fruit">{{ fruit }}</mat-option>
    }
  </mat-select>
</mat-form-field>

<mat-form-field>
  <mat-label>Search fruits</mat-label>
  <input matInput [matAutocomplete]="auto" />
  <mat-autocomplete #auto="matAutocomplete">
    @for (fruit of filteredFruits; track fruit) {
      <mat-option [value]="fruit">{{ fruit }}</mat-option>
    }
  </mat-autocomplete>
</mat-form-field>`;
}
