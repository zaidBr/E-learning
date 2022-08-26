import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ManagerService } from '../service/manager/manager.service';

@Component({
  selector: 'app-sondage',
  templateUrl: './sondage.component.html',
  styleUrls: ['./sondage.component.scss']
})
export class SondageComponent implements OnInit {

  form !: FormGroup;
  submitted = false;
  message = '';
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
      placeholder: 'Ecrire Le Sondage ...',
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
  constructor(private formBuilder : FormBuilder,
    private managerService:ManagerService,private router : Router,
    private route : ActivatedRoute) { }
    

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        title:['',Validators.required],
        text:['',Validators.required],
      });

  }
  
  addSondage():void{

    this.submitted=true;
    const data = this.form.value;
    this.managerService.addSondage(data.title,data.text).subscribe(
      (resp)=>{
        this.message = 'success';
      },
      (err)=>{
        this.message ='error';
      }
    );
    this.form.reset()
  }
  close(){
    this.message = ''; 
  }
  goToList(){

    this.router.navigate(['../' ], { relativeTo: this.route });

  }
}
