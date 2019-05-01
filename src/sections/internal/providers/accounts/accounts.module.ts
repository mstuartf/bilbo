import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'

import { AccountsService } from './accounts.service';
import { accountsReducer } from './accounts.reducer';
import { AccountsEffects } from './accounts.effects';


@NgModule({
  imports: [
    StoreModule.forFeature('accounts', accountsReducer),
    EffectsModule.forFeature([AccountsEffects])
  ],
  providers: [AccountsService]
})
export class AccountsModule { }
