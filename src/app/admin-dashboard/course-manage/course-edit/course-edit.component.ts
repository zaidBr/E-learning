import { filter, isEmpty } from 'rxjs/operators';
import { Categorie } from 'src/app/admin-dashboard/interfaces/Categorie';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Cours } from 'src/app/interface/Cours';
import { ManagerService } from '../../service/manager/manager.service';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { Teacher } from '../../interfaces/Teacher';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  cours !: Cours;
  categories !:Categorie[];
  teachers !: Teacher[];
  form !: FormGroup;
  submitted = false;
  select:boolean=false;
  message =""; 
  // fileName ='';


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
      placeholder: "Entrer text ...",
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
    private dialogService: DialogService) { 
    
  }
  

  ngOnInit() {
    this.getCategories();
    this.route.data.subscribe(data=>{
      this.cours = data.cours;
    })
    this.managerData.showTeacher().subscribe(
      data => this.teachers = data
    );
    console.log('this is the nameof the categorie field in data base but the proble is when i try o fetch data for the selectin tag in the html page :     '+this.cours.categorie.name)
    
    this.form = this.formBuilder.group(
      {
        name:['',Validators.required],
        description:['',Validators.required],
        shortDescription:['',Validators.required],
        type:['',Validators.required],
        dateStart:['',Validators.required],
        price:['',Validators.required],
        periode:['',Validators.required],
        categorieId:['',Validators.required],
        formateurId:['',Validators.required],
      }
    );
    this.isExist(this.cours)
    
  }
  // onFileSelected(event :any) {
  //   // const file = (event.target as HTMLInputElement)!.files![0];
  //   // this.form.patchValue({
  //   //   file: file,
  //   // });
  //   // this.fileName=this.form.get('file')!.value.name;
  //   // console.log('file : '+file,'  , fileName :'+this.fileName);
  //   // this.form.get('file')!.updateValueAndValidity();
  //   const file:File = event.target.files![0];
  //       if (file) {

  //         this.form.patchValue({
  //           file : file
  //         })
  //           this.fileName = file.name;
  //           console.log('file size : '+this.form.value.file+', fileName : '+this.fileName );
  //       }
  // }


  isExist(cours : Cours)
  {
    if(this.categories.filter(c => c.id === cours.categorie.id)){
        this.select=true;
    }else this.select=false;

  }


  getCategories():void{
    this.managerData.showCategorie().subscribe(
      categories=> {
        this.categories = categories;
      },
      (err)=>console.log(err)
    );
  }

  testForm(){

    const data = this.form.value;
 
      console.log(data.periode);
      console.log(data.categorieId);
      console.log(data.formateurId);
  }

  onUpdate(){

    const id = this.cours.id;
    this.submitted=true;
    const data = this.form.value;
    

    if(this.form.valid){
      this.managerData.updateCours(data.name,data.description,data.shortDescription,data.periode,data.dateStart,data.type,data.price,data.formateurId,data.categorieId,id).subscribe(
        (resp)=>{
          this.message='success';
        },
        (err)=>{
          this.message='error';
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
    console.log(this.message);
  }

}
