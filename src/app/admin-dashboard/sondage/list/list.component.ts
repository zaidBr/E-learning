import { Component, OnInit } from '@angular/core';
import { Sondage } from '../../interfaces/Sondage';
import { ManagerService } from '../../service/manager/manager.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  sondages !: Sondage[];

  constructor(private managerService : ManagerService) { }

  ngOnInit(): void {
    this.managerService.getSondage().subscribe(
      data => this.sondages =data,
      err=> console.log(err)
      
    )
  }

}
