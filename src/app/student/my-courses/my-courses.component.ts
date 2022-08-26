import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Cours } from 'src/app/interface/Cours';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['../manage-cart/manage-cart.component.scss']
})
export class MyCoursesComponent implements OnInit {
myCourses : Cours[] = [];
  constructor(private managerService : ManagerService,private router:Router ) { }
  getMyCourses(){
    this.managerService.myCourses().subscribe(
      data=>{
        this.myCourses = data;
      }
    )
  }
  goInsideCours(id:number){
    this.router.navigate(['../student/cours-space',id])
  }
  ngOnInit(): void {
    this.getMyCourses();
  }

}
