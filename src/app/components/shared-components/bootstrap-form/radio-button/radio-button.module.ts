import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './radio-button.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RadioButtonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RadioButtonModule { }
