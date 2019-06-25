import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class SelectModule { }
