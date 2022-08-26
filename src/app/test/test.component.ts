import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  sideBarStatus : boolean = false;

  @ViewChild("sidebarCollapse") toogleBTn !: ElementRef;
  constructor() { }

  ngOnInit(): void {
    
  }
  toggle(){
    this.sideBarStatus = !this.sideBarStatus
  }

}
