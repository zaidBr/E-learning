import { AuthService } from 'src/app/service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Teacher } from '../interfaces/Teacher';
import { ManagerService } from '../service/manager/manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  currentUser !: Teacher;
  imgPath =``;
  constructor(private managerService : ManagerService, private authService : AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  getCurrentUser(){
    this.managerService.currentUser().subscribe(
      resp => {
        this.currentUser = resp;
        console.log(this.currentUser.image);
        this.imgPath = `http://127.0.0.1:8000/file/imageUser/${this.currentUser.image}`;

      },
      err=>console.log(err)
    )
  }
  logOut(){
    this.authService.loggout();
    this.router.navigate(['/student']);

  }

}
