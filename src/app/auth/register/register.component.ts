import { AuthService } from '../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/service/alert.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myForm !: FormGroup ;
  name !: FormControl;
  lastName !: FormControl;
  email !: FormControl;
  plainPassword !: FormControl;
  confirmPlainPassword !: FormControl;
  submitted :boolean = false;
  loading : boolean = false;


  createFormControls(){
    this.name = new FormControl('',[Validators.required,Validators.minLength(3)] );
    this.lastName = new FormControl('',[Validators.required,Validators.minLength(2)]);
    this.email = new FormControl('',[Validators.required,Validators.email]);
    this.plainPassword = new FormControl('',[Validators.required,Validators.minLength(6)]);
    this.confirmPlainPassword = new FormControl('',Validators.required);
  }

  createForm(){
    this.myForm = new FormGroup({
      name : this.name,
      lastName : this.lastName,
      email : this.email,
      plainPassword : this.plainPassword,
      confirmPlainPassword : this.confirmPlainPassword
    });
  }


  constructor( 
    private authService : AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router : Router 
  ) { }


  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  onSubmit(){

    this.submitted = true;
    
    this.alertService.clear();

    const val = this.myForm.value
    if(this.myForm.valid){
      this.loading = true;
      this.authService.register(val.name, val.lastName, val.email, val.plainPassword, val.confirmPlainPassword)
      .subscribe(
       data =>{
        this.alertService.success('inscription réussi',{ keepAfterRouteChange: true });
        this.router.navigate(['/auth/login']);
       },
       (err)=>{
         this.alertService.error(err);
         this.loading = false;
       }
      );
    }
    this.myForm.reset();
  }

}
