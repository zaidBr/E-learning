import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
allStudent !: number;
allCours!:number;
  constructor(private managerService : ManagerService, private router:Router) { }
   
  goToCourses(){
    this.router.navigate(['/student/all-courses'])
  }

  ngOnInit(): void {
    this.managerService.allStudent().subscribe(
      (data:any)=>{
        this.allStudent=data.countAll;
        this.allCours=data.allCours;
        // console.log(data.countAll);
      }
    )
  }

}
