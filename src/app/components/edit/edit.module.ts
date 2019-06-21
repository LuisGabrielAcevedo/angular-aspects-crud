import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AspectsFormModule } from '../../services/aspects-form/aspects-form.module';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    AspectsFormModule,
    FlexLayoutModule
  ]
})
export class EditModule { }
