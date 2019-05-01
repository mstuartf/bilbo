import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { PotsQuery } from './pots.interface';

@Injectable({
  providedIn: 'root'
})
export class PotsService {

  constructor(public http: HttpClient) { }

  public list() {
  	return this.http.get<PotsQuery>('user/pots');
  }

}
