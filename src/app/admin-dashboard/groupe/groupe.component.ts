import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../service/manager/manager.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit {

  constructor(private maangerService :ManagerService) { }

  

  ngOnInit(): void {
  }

}
