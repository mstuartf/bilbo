import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'

import { BillService } from './bill.service';
import { billReducer } from './bill.reducer';
import { BillEffects } from './bill.effects';

import { BillCalculationService } from './bill-calc.service';


@NgModule({
  imports: [
    StoreModule.forFeature('bills', billReducer),
    EffectsModule.forFeature([BillEffects])
  ],
  providers: [BillService, BillCalculationService]
})
export class BillModule { }
