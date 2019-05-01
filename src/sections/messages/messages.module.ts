import { NgModule } from '@angular/core';

import { MessagesComponent } from './messages.component';
import { AuthSuccessComponent } from './components/auth-success/auth-success.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmailVerifiedComponent } from './components/email-verified/email-verified.component';

import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
  declarations: [
  	MessagesComponent,
  	AuthSuccessComponent,
  	PageNotFoundComponent,
  	EmailVerifiedComponent
  ],
  imports: [
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
