import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { NumberComponent } from './number/number.component';

@NgModule({
  declarations: [DynamicFormComponent, NumberComponent],
  imports: [
    CommonModule
  ]
})
export class DynamicFormModule { }
