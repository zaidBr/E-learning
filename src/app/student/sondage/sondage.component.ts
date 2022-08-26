import { Teacher } from './../../admin-dashboard/interfaces/Teacher';
import { Component, OnInit } from '@angular/core';
import { Sondage } from 'src/app/admin-dashboard/interfaces/Sondage';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sondage',
  templateUrl: './sondage.component.html',
  styleUrls: ['./sondage.component.scss']
})
export class SondageComponent implements OnInit {
  sondages !: Sondage[];
  reacts = 0;
  listExist = false;
  currrentUser !:Teacher
  isLoaded = false;
  userLoaded = false;
  constructor(private managerService :ManagerService, private authService : AuthService, private router:Router) { }

  addReact(id:number){
    if(this.authService.IsLogedInUser('ROLE_USER')){
      this.managerService.addReact(id).subscribe()
    }else{
      this.authService.redirectUrl='/student/sondage';
      this.router.navigate(['/auth/login',{'msg':'authh'}]);
    }
    
  }

  isMyReact(taab:any){
    if(this.isLoaded && this.userLoaded){
      console.log('she workkkkkkkk');
      
      return taab.map((react:any)=>{
        return react.candidat.id
      }).includes(this.currrentUser.id)
    }
    return false;
  }
  
  ngOnInit(): void {
    this.managerService.getSondage().subscribe(
      data =>{
        this.sondages =data,
        this.isLoaded = true;
      } ,
      err=> console.log(err)
      
    );
    this.managerService.currentUser().subscribe(
      data=> {
        this.userLoaded = true;
        this.currrentUser=data
      } 
    )
  }

}
