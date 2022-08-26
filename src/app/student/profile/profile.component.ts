import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/admin-dashboard/interfaces/Teacher';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser !: Teacher;
  imgPath='';
  constructor(private managerService:ManagerService) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }
  getCurrentUser(){
    this.managerService.currentUser().subscribe(
      resp => {
        this.currentUser = resp;
        this.imgPath = `http://127.0.0.1:8000/file/imageUser/${this.currentUser.image}`;
      },
      err=>console.log(err)
    )
  }

}
