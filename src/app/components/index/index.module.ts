import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchModule } from '../search/search.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SearchModule
  ]
})
export class IndexModule { }
