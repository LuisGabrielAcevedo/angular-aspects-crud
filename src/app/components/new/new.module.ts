import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new.component';
import { AspectsFormModule } from 'src/app/services/aspects-form/aspects-form.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    AspectsFormModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ]
})
export class NewModule { }
