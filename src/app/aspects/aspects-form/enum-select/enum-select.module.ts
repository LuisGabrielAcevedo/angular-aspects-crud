import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumSelectComponent } from './enum-select.component';
import { MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [EnumSelectComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class EnumSelectModule { }
