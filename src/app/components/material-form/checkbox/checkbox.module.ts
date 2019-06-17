import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ]
})
export class CheckboxModule { }
