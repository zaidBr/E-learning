import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  form!: FormGroup;
  uploadProgress=false;
  uploadSub!: Subscription;
  fileName ='';
  submitted=false;
  message ='';

  constructor(private formBuilder : FormBuilder,
    private managerService:ManagerService,
    private route : ActivatedRoute) { }
    onFileSelected(event :any) {
    
      const file:File = event.target.files![0];
          if (file) {
  
            this.form.patchValue({
              video : file
            })
              this.fileName = file.name;
              console.log('file size : '+this.form.value.video+', fileName : '+this.fileName );
          }
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        title:['',Validators.required],
        video:['',Validators.required],

      }
    );
  }
  onSubmit(){
    var formData: FormData = new FormData();
  this.submitted=true;
  const data = this.form.value;
  const id = this.route.snapshot.parent?.paramMap.get('chapter')
  console.log("this is id :"+id);
  formData.append('video', data.video,data.video.name);
  formData.append('title',data.title);
  console.log('ouuuups this form is '+this.form.valid)
  if(this.form.valid){
    this.managerService.addVideo(formData,Number(id)).pipe(
      tap(()=>{
        this.uploadProgress=true
      }),
      finalize(()=>{
        this.uploadProgress=false
      })
    ).subscribe();
      console.log('this is progresbar dataaaa'+this.uploadProgress)

  }
  this.form.reset();
  this.fileName='';

  }
  close(){
    this.message = ''; 
  }
  

}
