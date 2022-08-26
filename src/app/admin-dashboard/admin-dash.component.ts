import { Component } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss']

})
export class AdminDash {

  contentStatus !: boolean

  changeStatus(etat : boolean ){
    this.contentStatus = etat;
  }
  
}
