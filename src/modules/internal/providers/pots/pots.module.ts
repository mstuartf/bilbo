import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'

import { PotsService } from './pots.service';
import { potsReducer } from './pots.reducer';
import { PotsEffects } from './pots.effects';


@NgModule({
  imports: [
    StoreModule.forFeature('pots', potsReducer),
    EffectsModule.forFeature([PotsEffects])
  ],
  providers: [PotsService]
})
export class PotsModule { }
