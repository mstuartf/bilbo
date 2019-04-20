import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { HomeComponent } from './components/home/home.component';
 
const internalRoutes: Routes = [
	{ 
		path: 'logged-in', component: LoggedInComponent,
	    children: [
	    	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	      	{ path: 'home', component: HomeComponent },
	      	// { path: 'settings', component: Specs }
	    ]
	 }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(internalRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InternalRoutingModule { }
