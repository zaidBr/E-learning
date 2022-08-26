import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  form !: FormGroup;
  submitted = false;
  message=""
  fileName ='';
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '120px',
      minHeight: '100px',
      maxHeight: '1000px',
      width: '860px',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Entrer text ...',
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
  constructor(
    private formBuilder : FormBuilder,
    private managerService:ManagerService,
    private route : ActivatedRoute
  ) { }
 
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        title:['',Validators.required],
        description:['',Validators.required],
        file:['',Validators.required],

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
    const id = this.route.snapshot.parent?.paramMap.get('chapter')
    formData.append('file', data.file,data.file.name);
    formData.append('title',data.title);
    formData.append('description',data.description);
    if(this.form.valid){
      this.managerService.addFile(formData,Number(id))
        .subscribe(
        (resp)=>{
          this.message = 'success';
        },
        (err)=>{
          this.message ='error';
        }

      );

      }
      this.fileName=''
      this.form.reset()

  }
  close(){
    this.message = ''; 
  }

}
