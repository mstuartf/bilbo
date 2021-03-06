import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { InternalComponent } from './internal.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';

import { InternalGuard } from './internal.guard';
 
const internalRoutes: Routes = [
	{ 
		path: 'internal', component: InternalComponent, canActivate: [InternalGuard],
	    children: [
	    	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	      	{ path: 'home', component: HomeComponent },
	      	{ path: 'settings', component: SettingsComponent }
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
