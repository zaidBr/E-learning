import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Teacher } from 'src/app/admin-dashboard/interfaces/Teacher';
export type Comment = {
  id:number,
  comment:string,
  createdAt:string,
  writer:{
    id:number,
    name:string,
    image:string
  }
}
@Component({
  selector: 'app-comment-manage',
  templateUrl: './comment-manage.component.html',
  styleUrls: ['./comment-manage.component.scss']
})
export class CommentManageComponent implements OnInit {
  form!:FormGroup;
  isSubmited = false;
  message ='';
  comments : Comment[]=[];
  myCommet : string ='' ;
  update : boolean = false;
  idUpdated!:number;
  currenUser !: Teacher
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '120px',
      minHeight: '90px',
      maxHeight: '1000px',
      width: '700px',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Entrer une commentaire ...',
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

  
  constructor(private managerService : ManagerService, private route:ActivatedRoute,private formBuilder : FormBuilder) { }

  
  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        comment : ['',Validators.required]
      }
    )
    this.getAllComment();
    this.managerService.currentUser().subscribe(
      data=>this.currenUser=data
    )
  }
  getAllComment(){
    // const id = this.route.snapshot.paramMap.get('chapter');
    this.route.paramMap.subscribe((params)=>{
      this.managerService.getComments(Number(params.get('chapter'))).subscribe(
        data=>{
          this.comments = data;
          console.log(data);
        }
      )
    }

    )
    

  }

  commentTomodify(id:number,el: HTMLElement){
    this.myCommet=this.comments.find(comment=>{
      return comment.id === id
    })?.comment!
    this.idUpdated = id;
    this.update = true;
    el.scrollIntoView({behavior: 'smooth'});
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
  
  

  addComment(){
    this.isSubmited=true;
    const id = this.route.snapshot.paramMap.get('chapter');

    const data = this.form.value;
    if(this.form.valid){
      this.managerService.addComment(data.comment,Number(id)).subscribe(
        resp=>{
          this.message = 'success'
        },
        err=>this.message = 'error'
      )
      // this.comments.push()
    }
    this.form.reset()
  }

  editComment(){
    this.isSubmited=true;
    const data = this.form.value;
    if(this.form.valid){
      this.managerService.editComment(data.comment,Number(this.idUpdated)).subscribe(
        resp=>{
          this.message = 'success'
        },
        err=>this.message = 'error'
      )
      // this.comments.push()
    }
    this.form.reset()

  }
  close(){
    this.message = ''; 
  }

}
