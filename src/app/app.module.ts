import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { metaReducer } from '../state/meta.reducer';

import { SharedModule } from '../sections/shared/shared.module';
import { MockBackendModule } from '../mock-backend/backend.module';
import { ExternalModule } from '../sections/external/external.module';
import { InternalModule } from '../sections/internal/internal.module';
import { MessagesModule } from '../sections/messages/messages.module';
import { InterceptorModule } from '../interceptors/interceptor.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ExternalModule,
    InternalModule,
    MessagesModule,
    InterceptorModule,
    AppRoutingModule,
    StoreModule.forRoot({}, { metaReducers: [metaReducer] }),
    EffectsModule.forRoot([]),
    HttpClientModule,
    MockBackendModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
