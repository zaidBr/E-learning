import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { DialogService } from 'src/app/service/dialog/dialog.service';

@Component({
  selector: 'app-categorie-manage',
  templateUrl: './categorie-manage.component.html',
  styleUrls: ['./categorie-manage.component.scss']
})
export class CategorieManageComponent implements OnInit {
  form !: FormGroup;
  submitted = false;
  message='';
  fileName='';

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '120px',
      minHeight: '100px',
      maxHeight: '1000px',
      width: '700px',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: false,
    toolbarPosition: 'top',
    
};

  constructor(private formBuilder : FormBuilder,
    private managerService:ManagerService,
    private router : Router,
    private route : ActivatedRoute,
    private dialogService : DialogService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name:['',Validators.required],
        description:['',Validators.required],
        shortDescription:['',Validators.required],
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
            // console.log('file size : '+this.form.value.file+', fileName : '+this.fileName );
        }
}
  onSubmit(){
    var formData: FormData = new FormData();
    this.submitted=true;
    const data = this.form.value;
    formData.append('file', data.file,data.file.name);
    formData.append('name',data.name);
    formData.append('description',data.description);
    formData.append('shortDescription',data.shortDescription);

    if(this.form.valid){
      this.managerService.addCategorie(formData)?.subscribe(
        (resp)=>{
          this.message = 'success';
        },
        (err)=>{
          this.message = 'error';
        }
      );
    }
    this.fileName=''
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
