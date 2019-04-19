import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalRoutingModule } from './internal-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from '../../components/home/home.component';

import { MatModule } from '../../helpers/mat.module';

@NgModule({
  declarations: [
  	HomeComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    InternalRoutingModule
  ]
})
export class InternalModule { }
