import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module'
import { ExternalRoutingModule } from './external-routing.module';

import { ExternalComponent } from './external.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PotDepositDayPopupComponent } from './components/pot-deposit-day-popup/pot-deposit-day-popup.component';


@NgModule({
  declarations: [
    ExternalComponent,
  	LoginComponent,
  	RegisterComponent,
    PotDepositDayPopupComponent
  ],
  entryComponents: [
    PotDepositDayPopupComponent  // loaded in a dialog so must be included in entryComponents
  ],
  imports: [
    SharedModule,
    ExternalRoutingModule
  ]
})
export class ExternalModule { }
