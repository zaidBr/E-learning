import { Component, Input, OnInit } from '@angular/core';
import { Sondage } from '../../interfaces/Sondage';

@Component({
  selector: 'app-one-sondage',
  templateUrl: './one-sondage.component.html',
  styleUrls: ['./one-sondage.component.scss']
})
export class OneSondageComponent implements OnInit {

  @Input() sondage !: Sondage;
  reacts = 0;
  listExist = false;
  constructor() { }
  countReacts(){
    for(let react of this.sondage.reacts){
      if(react.is_intersted){
        this.reacts++;
      }
    }
  }
  showList(){
    if(this.reacts != 0){
      this.listExist = true;
    }
  }
  ngOnInit(): void {
    this.countReacts();
    this.showList();
  }

}
