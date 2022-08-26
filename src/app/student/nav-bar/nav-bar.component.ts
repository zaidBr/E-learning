import { Teacher } from 'src/app/admin-dashboard/interfaces/Teacher';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { ManageCartService } from 'src/app/service/manage-cart/manage-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;
  student!:Teacher;
  imgPath='';
  loginDialog : boolean = false;
  registerDialog : boolean  = false;
  nbItemsCart !: Observable<any>;
  constructor(private authService : AuthService, private managerService : ManagerService,
    private router:Router,
    private managerCart : ManageCartService,
    private route : Router) { }
  getCurrentUser(){
    this.managerService.currentUser().subscribe(
      data =>{
        this.student = data
        this.imgPath = `http://127.0.0.1:8000/file/imageUser/${this.student.image}`;
      } 
    );
  }
  userLoggedIn(){
    if(this.authService.isLogedIn()){
      this.isLoggedIn=true;
    }else
    this.isLoggedIn=false
  }
  scroll(){
    window.location.href = 'http://127.0.0.1:4200/student#best';
  }

  ngOnInit(): void {
    this.getNbItems();
    this.userLoggedIn();
    this.getCurrentUser();
    this.managerCart.getCar().subscribe((res)=>{if(res)this.getNbItems()})

  }
  logOut(){
    this.authService.loggout();
    this.router.navigate(['/student']);
    this.isLoggedIn=false;

  }
  showDialogLogin(){
    this.loginDialog = true;
  }
  showDialogRegister(){
    this.registerDialog = true;
  }
  getNbItems(){
    console.log('rrrrrrr');
    
    this.nbItemsCart = this.managerCart.getNbItems()
  }
  goToCart(){
    this.router.navigate(['/student/cart'])
  }
  goToHome(){
    this.router.navigate(['/student'])
  }


}
