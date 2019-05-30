import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from './modules/mat.module';

import { PopupComponent } from './components/popup/popup.component';

import { UserModule } from './providers/user/user.module';
import { AttributionsComponent } from './components/attributions/attributions.component';


@NgModule({
  declarations: [
  	PopupComponent,
  	AttributionsComponent
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
    CommonModule,
    AttributionsComponent
  ]
})
export class SharedModule { }
