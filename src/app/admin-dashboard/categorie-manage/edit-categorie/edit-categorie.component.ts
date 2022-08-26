import {  ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../service/manager/manager.service';
import { Categorie } from '../../interfaces/Categorie';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/service/dialog/dialog.service';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.scss']
})
export class EditCategorieComponent implements OnInit {

  categorie !: Categorie;
  form !: FormGroup;
  submitted = false;
  message = '';


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
      placeholder: "",
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


  constructor(private managerData:ManagerService,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router : Router,
    private dialogService :DialogService) { }

  ngOnInit() {
    // const id= this.route.snapshot.paramMap.get('id');
    // this.managerData.editCategorie(Number(id)).subscribe(
    //   categorie => {
    //     this.categorie=categorie;
    //     console.log(this.categorie);
    //   }
      
    // )
    this.route.data.subscribe(data=>{
      this.categorie = data.categorie;
    })
    
    this.form = this.formBuilder.group(
      {
        name:['',Validators.required],
        description:['',Validators.required],
        shortDescription:['',Validators.required],

      }
    );
  }
  
  onUpdate(){
    const id = this.categorie.id;
    this.submitted=true;
    const data = this.form.value;
    if(this.form.valid){
      this.managerData.updateCategorie(data.name,data.description,data.shortDescription,id)?.subscribe(
        (resp)=>{
          this.message = 'success';
        },
        (err)=>{
          this.message = 'error';
        }
      );
    }
  }
  goToList(){
    this.router.navigate(['../../' ], { relativeTo: this.route });
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
