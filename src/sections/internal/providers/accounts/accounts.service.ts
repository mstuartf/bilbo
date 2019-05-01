import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { AccountsQuery } from './accounts.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(public http: HttpClient) { }

  public list() {
  	return this.http.get<AccountsQuery>('user/accounts');
  }

}
