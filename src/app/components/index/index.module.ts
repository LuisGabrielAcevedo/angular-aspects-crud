import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    FlexLayoutModule
  ]
})
export class IndexModule { }
