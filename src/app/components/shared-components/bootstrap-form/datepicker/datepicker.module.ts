import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DatepickerModule { }
