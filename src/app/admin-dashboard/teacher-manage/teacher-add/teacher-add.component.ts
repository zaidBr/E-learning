import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { ManagerService } from '../../service/manager/manager.service';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.scss']
})
export class TeacherAddComponent implements OnInit {

  form !: FormGroup;
  submitted = false;
  message : string = ''
  fileName ='';


  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '120px',
      minHeight: '100px',
      maxHeight: '1000px',
      width: '896px',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Entrer text...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
    sanitize: false,
    toolbarPosition: 'top',
    
};
  constructor(private manageService : ManagerService,
    private formBuilder:FormBuilder,
    private router:Router,
    private route : ActivatedRoute,
    private dialogService:DialogService) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name:['',Validators.required],
        lastName:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        plainPassword:['',[Validators.required,Validators.minLength(6)]],
        confirmPlainPassword:['',Validators.required],
        description:['',Validators.required],
        phone:['',[Validators.required,Validators.maxLength(8)]],
        file:['']
        }
    );
  }
  onFileSelected(event :any) {
    const file:File = event.target.files![0];
        if (file) {

          this.form.patchValue({
            file : file
          })
            this.fileName = file.name;
            console.log('file size : '+this.form.value.file+', fileName : '+this.fileName );
        }
  }

  onSubmit(){
    var formData: FormData = new FormData();
    this.submitted=true;
    const data = this.form.value;
    console.log(data.name+', '+data.file);
    formData.append('file', data.file,data.file.name);
    formData.append('name',data.name);
    formData.append('lastName',data.lastName);
    formData.append('email',data.email);
    formData.append('plainPassword',data.plainPassword);
    formData.append('confirmPlainPassword',data.confirmPlainPassword);
    formData.append('description',data.description);
    formData.append('phone',data.phone);


    console.log( formData);
    if(this.form.valid){
      this.manageService.addTeacher(formData)
      .subscribe(
        resp => {
          console.log(resp);
          this.message='success';
        },
        err => {
          this.message='error';
        }
      );
    }
    this.fileName=''
    // this.form.value.file = null;
    this.form.reset()
  }
  goToList(){
    this.router.navigate(['../' ], { relativeTo: this.route });
  }


  canDeactivate(): Observable<boolean> | boolean {
    if (!this.form.dirty) {
      return true;
    }
    return this.dialogService.confirm('Discard changes?');
  }
  close(){
    this.message = '';
  }

}

