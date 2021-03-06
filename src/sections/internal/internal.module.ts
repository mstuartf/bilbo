import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component';
import { NewBillPopupComponent } from './components/new-bill-popup/new-bill-popup.component';

import { BillModule } from './providers/bill/bill.module';
import { AuthModule } from './providers/auth/auth.module';
import { PotsModule } from './providers/pots/pots.module';
import { AccountsModule } from './providers/accounts/accounts.module';

import { SharedModule } from '../shared/shared.module';
import { InternalRoutingModule } from './internal-routing.module';
import { InternalComponent } from './internal.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { BillSummaryComponent } from './components/bill-summary/bill-summary.component';
import { MonzoAuthComponent } from './components/monzo-auth/monzo-auth.component';


@NgModule({
  declarations: [
  	HomeComponent,
  	NewBillPopupComponent,
  	InternalComponent,
  	SettingsComponent,
  	DateFilterComponent,
  	BillSummaryComponent,
  	MonzoAuthComponent
  ],
  entryComponents: [
    DateFilterComponent,
    BillSummaryComponent,
    MonzoAuthComponent,
    NewBillPopupComponent  // loaded in a dialog so must be included in entryComponents
  ],
  imports: [
    SharedModule,
    BillModule,
    AuthModule,
    PotsModule,
    AccountsModule,
    InternalRoutingModule
  ]
})
export class InternalModule { }
