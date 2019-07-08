import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { IndexComponent } from 'src/app/components/index/index.component';
import { SearchModule } from 'src/app/components/search/search.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    MatTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    SearchModule
  ]
})
export class IndexModule { }
