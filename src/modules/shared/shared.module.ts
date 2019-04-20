import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './modules/mat.module';

import { PopupComponent } from './components/popup/popup.component';

import { UserModule } from './providers/user/user.module';


@NgModule({
  declarations: [
  	PopupComponent
  ],
  entryComponents: [
    PopupComponent
  ],
  imports: [
    UserModule,
  	MatModule,
  	FormsModule,
  	ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    UserModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SharedModule { }
