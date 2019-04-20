import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { ExternalComponent } from './external.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


const externalRoutes: Routes = [
	{ 
		path: 'external', component: ExternalComponent,
	    children: [
	    	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	      	{ path: 'login', component: LoginComponent },
	      	{ path: 'register', component: RegisterComponent }
	    ]
	 }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(externalRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExternalRoutingModule { }
