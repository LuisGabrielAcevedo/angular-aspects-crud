import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AspectsFormComponent } from './aspects-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { GenericComponent } from './generic/generic.component';
import { NumberComponent } from './number/number.component';
import { CheckboxModule } from './checkbox/checkbox.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { GenericModule } from './generic/generic.module';
import { NumberModule } from './number/number.module';
import { MatButtonModule } from '@angular/material/button';
import { SelectAspectComponent } from './select-aspect-component/select-aspect-component.component';
import { AspectsFormDirective } from './select-aspect-component/select-aspect-component.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SelectComponent } from './select/select.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { SelectModule } from './select/select.module';

@NgModule({
  declarations: [
    AspectsFormComponent,
    SelectAspectComponent,
    AspectsFormDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    DatePickerModule,
    GenericModule,
    AutocompleteModule,
    SelectModule,
    NumberModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  exports: [AspectsFormComponent],
  entryComponents: [
    CheckboxComponent,
    DatePickerComponent,
    GenericComponent,
    NumberComponent,
    SelectComponent,
    AutocompleteComponent
  ]
})
export class AspectsFormModule { }
