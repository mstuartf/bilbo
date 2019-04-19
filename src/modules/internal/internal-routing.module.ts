import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HomeComponent } from '../../components/home/home.component';

 
const internalRoutes: Routes = [
  { path: 'home',  component: HomeComponent }
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
