import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponent } from './new.component';
import { AspectsFormModule } from 'src/app/services/aspects-form/aspects-form/aspects-form.module';

@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    AspectsFormModule
  ]
})
export class NewModule { }
