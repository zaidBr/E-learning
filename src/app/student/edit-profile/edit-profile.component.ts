import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/admin-dashboard/interfaces/Teacher';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Governorate } from 'src/app/interface/Governorate';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  form !: FormGroup;
  submitted = false;
  message='';
  fileName ='';
  imgPath=``;
  governorates = Governorate;
  currentUser !: Teacher;
  formData: FormData = new FormData();
  constructor(
    private formBuilder : FormBuilder,
    private managerService:ManagerService,
    private router:Router
  ) { }

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
  onFileSelected(event :any) {
    const file:File = event.target.files![0];
        if (file) {

          this.form.patchValue({
            file : file
          })
            // this.fileName = file.name;
            console.log('file size : '+this.form.value.file.name+', fileName : '+this.fileName );
            this.formData.append('file', file,file.name);
        }
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.form = this.formBuilder.group(
      {
        name:['',Validators.required],
        age:['',Validators.required],
        lastName:['',Validators.required],
        location:['',Validators.required],
        phone:['',[Validators.required,Validators.minLength(8)]],
        cin:['',Validators.required],
        plainPassword:['',[Validators.minLength(6)]],
        confirmPlainPassword:[''],
        actulaPass:[''],
        file:['']
      }
    );
    
  }
  onSubmit(){
    this.submitted=true;
    const data = this.form.value;
  
    this.formData.append('name',data.name);
    this.formData.append('lastName',data.lastName);
    this.formData.append('location',data.location);
    this.formData.append('cin',data.cin);
    this.formData.append('age',data.age);
    this.formData.append('phone',data.phone);
    this.formData.append('plainPassword',data.plainPassword);
    this.formData.append('actulaPass',data.actulaPass);
    console.log('is valid ?'+this.form.valid);
 
    if(this.form.valid){
      this.managerService.editProfile(this.formData)
      .subscribe(
        resp=>{
          this.message='success'
        },
        err=>{
          this.message='error'
        }
      );
      this.form.reset()

    }
    

  }
  close(){
    this.message = '';
  }
  gotoProfile(){
    this.router.navigate(['student/profile' ]);
  }

}
