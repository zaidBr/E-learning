import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Teacher } from 'src/app/admin-dashboard/interfaces/Teacher';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  teacher!:string;
  actualCours !: number
  nbFormation !: number
randomarray = [
  "never give up",
  "you can do it",
  "yes you can"
];
randomstring ="";
  constructor(private managerService : ManagerService) { }

  ngOnInit(): void {
    this.managerService.cuurrentTeacherRating().subscribe(
      (data:any) =>{
        this.teacher = data[2][0].name;
        this.actualCours = data[2][0].nbCourses
        
      }
    )
    this.randomstring = this.randomarray[Math.floor(Math.random() * this.randomarray.length)];
  }

}
