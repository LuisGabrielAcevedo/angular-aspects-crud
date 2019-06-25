import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexModule } from 'src/app/components/index/index.module';
import { NewModule } from 'src/app/components/new/new.module';
import { EditModule } from 'src/app/components/edit/edit.module';
import { ShowModule } from 'src/app/components/show/show.module';
import { SearchModule } from './search/search.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexModule,
    NewModule,
    EditModule,
    ShowModule,
    SearchModule
  ]
})
export class ComponentsModule { }
