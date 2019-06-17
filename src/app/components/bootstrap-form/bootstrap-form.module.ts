import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDirective } from './select-field/select-field.directive';
import { SelectFieldComponent } from './select-field/select-field.component';
import { InputModule } from './input/input.module';
import { InputComponent } from './input/input.component';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CheckboxModule } from './checkbox/checkbox.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerModule } from './datepicker/datepicker.module';
import { DatePickerComponent } from './datepicker/date-picker.component';
import { RadioButtonModule } from './radio-button/radio-button.module';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectModule } from './select/select.module';
import { SelectComponent } from './select/select.component';
import { SliderModule } from './slider/slider.module';
import { SliderComponent } from './slider/slider.component';
import { BootstrapFormComponent } from './bootstrap-form.component';

@NgModule({
  declarations: [
    BootstrapFormComponent,
    FormDirective,
    SelectFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    AutocompleteModule,
    CheckboxModule,
    DatepickerModule,
    RadioButtonModule,
    SelectModule,
    SliderModule
  ],
  exports: [
    BootstrapFormComponent
  ],
  entryComponents: [
    InputComponent,
    AutocompleteComponent,
    CheckboxComponent,
    DatePickerComponent,
    RadioButtonComponent,
    SelectComponent,
    SliderComponent
  ]
})
export class BootstrapFormModule { }
