import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { SubscribedCoursService } from 'src/app/service/subscribed-cours.service';

@Component({
  selector: 'app-cours-space',
  templateUrl: './cours-space.component.html',
  styleUrls: ['./cours-space.component.scss']
})
export class CoursSpaceComponent implements OnInit {
  // message
  constructor(private checkSubscribe : SubscribedCoursService){}
  ngOnInit(): void {
    
  }

}
