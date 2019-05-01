import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { MessagesComponent } from './messages.component';
import { AuthSuccessComponent } from './components/auth-success/auth-success.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmailVerifiedComponent } from './components/email-verified/email-verified.component';

const messagesRoutes: Routes = [
  { 
	path: 'messages', component: MessagesComponent,
    children: [
      	{ path: 'email-verified', component: EmailVerifiedComponent },
      	{ path: 'auth-success', component: AuthSuccessComponent },
      	{ path: '**', component: PageNotFoundComponent },
    ]
 }
];

@NgModule({
  imports: [
    RouterModule.forChild(messagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessagesRoutingModule { }
