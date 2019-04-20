import { NgModule } from '@angular/core';

import { MockBackendProvider } from './backend.interceptor';

@NgModule({
  providers: [
    MockBackendProvider
  ]
})
export class MockBackendModule { }
