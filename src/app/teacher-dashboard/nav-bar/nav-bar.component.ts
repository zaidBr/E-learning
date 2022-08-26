import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/admin-dashboard/interfaces/Teacher';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  teacher !: Teacher;
  imgPath =``;
  @Output() nameTeacher= new EventEmitter();


  constructor(private managerService : ManagerService, private authService :AuthService, private router : Router) { }
  getCurrentTeacher(){
    this.managerService.currentUser().subscribe(
      data =>{
        this.teacher = data
        this.imgPath = `http://127.0.0.1:8000/file/imageUser/${this.teacher.image}`;
      } 
    );
  }

  logOut(){
    this.authService.loggout();
    console.log('is logged out')
    this.router.navigate(['student']);
    

  }


  ngOnInit(): void {
    this.getCurrentTeacher();
    
    }

}
