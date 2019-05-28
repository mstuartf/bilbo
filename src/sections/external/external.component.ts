import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.less']
})
export class ExternalComponent implements OnInit {

	activeUrl: string;

  constructor() {}

  ngOnInit() {
  }

}
