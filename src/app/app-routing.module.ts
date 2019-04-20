import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternalModule } from '../modules/internal/internal.module';

const routes: Routes = [
	{ path: '',   redirectTo: 'logged-in', pathMatch: 'full' },
  	// { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
