import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AspectsFormModule } from 'src/app/aspects/aspects-form/aspects-form.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    AspectsFormModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class EditModule { }
