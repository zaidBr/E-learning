import { NavMenu } from './NavMenu';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
   sideBarStatus : boolean = false;
   @Output() contentOutlet = new EventEmitter();
  dashboardStatus : boolean = false;
  currentStyles: Record<string, string> = {};
  constructor() { }
   navBars = NavMenu;
  ngOnInit(): void {
    this.setCurrentStyles();
  }
  toggle(){
    this.sideBarStatus = !this.sideBarStatus
    this.contentOutlet.emit(this.sideBarStatus)
  }
  sub1(){
    this.dashboardStatus = !this.dashboardStatus;
    console.log(this.dashboardStatus);
  }
  
  setCurrentStyles() {
    // CSS styles: set per current state of component properties
    this.currentStyles = {
      'display':  this.dashboardStatus ? 'block' : 'none',
    };
  }


}
