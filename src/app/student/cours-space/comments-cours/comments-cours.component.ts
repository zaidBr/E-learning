import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { SomeData } from '../cours-content/cours-content.component';

@Component({
  selector: 'app-comments-cours',
  templateUrl: './comments-cours.component.html',
  styleUrls: ['./comments-cours.component.scss']
})
export class CommentsCoursComponent implements OnInit {

  comments !: SomeData;
  nbStars : number =0;

  constructor(private route : ActivatedRoute, private managerService : ManagerService ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.parent?.parent?.paramMap.get('id');
    this.managerService.showSomeDataCours(Number(id))
    .subscribe(
      data=>{
        this.comments = data;
        
      }
    )
  }

}
