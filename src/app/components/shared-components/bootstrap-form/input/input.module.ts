import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class InputModule { }
