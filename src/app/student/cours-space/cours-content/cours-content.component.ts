import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
export type SomeData={
  id: number,
  name:string ,
  description:string ,
  image: string,
  evaluations: [
    {
      id:number,
      comment:string,
      satrs:number,
      candidat:{
        id:number,
        name:string,
        last_name:string,
        image:string
      }
    }
  ],
  specification: string,
  createdAt:Date
}
@Component({
  selector: 'app-cours-content',
  templateUrl: './cours-content.component.html',
  styleUrls: ['./cours-content.component.scss']
})
export class CoursContentComponent implements OnInit {
  specification !: SomeData;
  constructor(private route : ActivatedRoute, private managerService : ManagerService ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.parent?.parent?.paramMap.get('id');
    this.managerService.showSomeDataCours(Number(id))
    .subscribe(
      data=>{
        this.specification = data;
        
      }
    )
  }

}
