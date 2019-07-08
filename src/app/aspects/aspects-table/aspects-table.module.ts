import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AspectsTableComponent } from './aspects-table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { TextModule } from './text/text.module';
import { ImageModule } from './image/image.module';
import { ButtonModule } from './button/button.module';
import { TextComponent } from './text/text.component';
import { ImageComponent } from './image/image.component';
import { ButtonComponent } from './button/button.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AspectsTableDirective } from './select-aspect-component/select-aspect-component.directive';
import { SelectAspectComponent } from './select-aspect-component/select-aspect-component.component';

@NgModule({
  declarations: [
    AspectsTableComponent,
    PaginatorComponent,
    AspectsTableDirective,
    SelectAspectComponent
  ],
  imports: [
    CommonModule,
    TextModule,
    ImageModule,
    ButtonModule,
    FlexLayoutModule
  ],
  exports: [AspectsTableComponent],
  entryComponents: [
    TextComponent,
    ImageComponent,
    ButtonComponent
  ]
})
export class AspectsTableModule { }
