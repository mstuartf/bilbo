import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalRoutingModule } from './external-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';

import { MatModule } from '../../helpers/mat.module';

@NgModule({
  declarations: [
  	LoginComponent,
  	RegisterComponent
  ],
  imports: [
    CommonModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    ExternalRoutingModule
  ]
})
export class ExternalModule { }
