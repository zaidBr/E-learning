import { Teacher } from './../../interfaces/Teacher';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/service/dialog/dialog.service';
import { Categorie } from '../../interfaces/Categorie';
import { ManagerService } from '../../service/manager/manager.service';
import { formatDate } from '@angular/common' 

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

  form !: FormGroup;
  submitted = false;
  categories !: Categorie[];
  fileName ='';
  message = '';
  msgDate = false;
  teachers !: Teacher[];
   


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

  constructor(private formBuilder : FormBuilder,
    private managerService:ManagerService, private dialogService : DialogService,
    private router : Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
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
        nbChapter:['',[Validators.required,
          Validators.required,
          Validators.pattern("^[0-9]*$"),
        ]],
        specification:['',Validators.required],
        file:[''],
      }
    );
    this.getCategories()
    this.getTeachers();
  }

  getCategories():void{
    this.managerService.showCategorie().subscribe(
      categories=> {
        this.categories = categories;
      },
      (err)=>console.log(err)
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
  getTeachers(){
    this.managerService.showTeacher().subscribe(
      teachers => {
        console.log(teachers);
        this.teachers = teachers
      }
      ,
      err=>console.log(err)
    );
  }


  onSubmit(){
    var formData: FormData = new FormData();
    this.submitted=true;
    const data = this.form.value;
   const date = this.form.value.dateStart;
    const date1:any = formatDate(new Date(),'yyyy-MM-dd','en_US');
    
    // const test = (new Date).getDay
    
    // const date2= date.setValue(formatDate(date,'yyyy-MM-dd','en'))
    // console.log('dateeeeeeeeeee  
    
    console.log(data);
    // console.log('date form', );
    
    formData.append('file', data.file,data.file.name); 
 
    formData.append('name',data.name);
    formData.append('nbChapter',data.nbChapter);
    formData.append('description',data.description);
    formData.append('shortDescription',data.shortDescription);
    formData.append('type',data.type);
    formData.append('dateStart',data.dateStart);
    formData.append('specification',data.specification);
    formData.append('price',data.price);
    formData.append('periode',data.periode);
    console.log( this.form.valid);
    
    if(date < date1){
      this.msgDate = true
      console.log('is corrrreeeeect ');
      
      
    }

    if(this.form.valid && !this.msgDate){
      this.managerService.addCours(formData,data.categorieId,data.formateurId)
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
