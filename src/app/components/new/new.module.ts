import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AspectsFormModule } from 'src/app/aspects/aspects-form/aspects-form.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    AspectsFormModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class NewModule { }
