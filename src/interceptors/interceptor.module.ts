import { NgModule } from '@angular/core';

import { TokenProvider } from './auth.interceptor';
import { UrlProvider } from './url.interceptor';


@NgModule({
  providers: [TokenProvider, UrlProvider]
})
export class InterceptorModule { }
