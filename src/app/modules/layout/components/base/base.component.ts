import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  openCloseSideBar: boolean = !true;

  constructor() { }

  ngOnInit(): void {
  }

  changeWidth(change: boolean): void {
    this.openCloseSideBar = change;
  }

}
