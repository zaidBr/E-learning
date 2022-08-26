import { DialogService } from 'src/app/service/dialog/dialog.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import {FormsModule,FormGroup,FormControl} from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.scss']
})
export class LoginComponent implements OnInit {
  failedMessage = false;
  message : string;
  desactiveAccount=false;
  isVerifierMsg=false;
  emailVerified = false;
  shouldAuthenticated = false;

  msgToVerifyEmail = false;
  form: any = {
    email: null,
    password: null
  };
  


  constructor(
     private authService : AuthService,
     private storage : TokenStorageService,
     private router : Router,
     private route: ActivatedRoute,
     

     ) {
       this.message = this.getMessage();
      }
      getMessage(){
        return  (this.authService.isLoggedIn ? 'Connecter' : 'Deconnecter');
      }
      // displayVerificationMsg(){
      //   this.
      // }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.has('verified') ){
      this.isVerifierMsg=true;
    }
    if(this.route.snapshot.paramMap.has('msg') ){
      this.shouldAuthenticated=true;
    }

  }

  login(){
    this.message = "en cours de connecter"
    // this.authService.hisEmailIsVerified(this.form.email).subscribe(
    //   res=>{this.notVerified=false;
    //   console.log('his mail is verified ');
    //   },
    //   err=>{this.notVerified=true;
    //     console.log('his mail is not verified ');}
    // )
    this.authService.hisEmailIsVerified(this.form.email).subscribe(
      (res:any)=>{
        if(res.result=='verif'){
          this.emailVerified = true;
          console.log('succes')
        }

      }
    )
    this.authService.login(this.form.email,this.form.password).subscribe(
      data =>{
        let token = data.token;
        let infoToken :any  = this.storage.decodeToken(token);
        

        
          console.log('etat email '+this.emailVerified);
        if(this.emailVerified){
          console.log('email verifier');
          this.storage.saveToken(token);
          this.storage.saveRefreshToken(data.refresh_token);
          console.log(infoToken);
          let role = infoToken.roles[0];
          console.log('roleee',role);
          
          if(this.authService.redirectUrl !== ''){
            if((this.authService.redirectUrl.includes('/admin-dashboard') && role !== 'ROLE_ADMIN') || 
            (this.authService.redirectUrl.includes('/teacher-dashboard') && role !== ('ROLE_FORMATEUR'|| 'ROLE_ADMIN' ) ) ){
              this.storage.signOut();
              this.router.navigate(['/not-authorized']);
            }else{
              const url = this.authService.redirectUrl;
              console.log(url);
              this.router.navigateByUrl(url);
            }
          }else {
            switch(role){
                case 'ROLE_ADMIN':
                  this.router.navigate(['/admin-dashboard']);
                  break;
                case 'ROLE_FORMATEUR':
                  this.router.navigate(['/teacher-dashboard']);
                  break;
                case 'ROLE_USER':
                  window.location.href = 'http://127.0.0.1:4200/student';
                  // this.router.navigateByUrl();
                  break;
              }
          }
        }else{
          this.storage.signOut;
          console.log('email is not verified ');
          this.msgToVerifyEmail=true;
          
        }
        
      },
      (err)=>{
        this.failedMessage = true
         
      }
    )
  }

}
