import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {
  form !: FormGroup;
  submitted =false;
  message ='';
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '500px',
      minHeight: '500px',
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
  constructor(private managerService : ManagerService,private route : ActivatedRoute, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        text:['',Validators.required],
      }
    );

  }
  addDoc(){
    this.submitted=true;
    const data = this.form.value;
    const id = this.route.snapshot.parent?.paramMap.get('chapter');
    if(this.form.valid){
      this.managerService.addDoc(Number(id),data.text).subscribe(
        (resp:any)=>{
          this.message = 'success';
          console.log("this is a message from the response : ",resp);
        },
        )
    }
    this.form.reset();

    
  }
  close(){
    this.message = ''; 
  }

}
