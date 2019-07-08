import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducers } from './store.index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AspectsEffects } from './aspects/aspects.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AspectsEffects
    ])
  ]
})
export class AppStoreModule {}
