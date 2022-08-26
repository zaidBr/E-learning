import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Chapter } from 'src/app/interface/Chapter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quiz } from 'src/app/interface/Quiz';

@Component({
  selector: 'app-display-content',
  templateUrl: './display-content.component.html',
  styleUrls: ['./display-content.component.scss']
})
export class DisplayContentComponent implements OnInit {
 chapters !: Chapter[];
 display: boolean = false;
 displayQuiz : boolean = false;
 isSubmited: boolean  =false;
 form !: FormGroup;
 form2 !: FormGroup;
 idQuestion !: number
 message='';
 listQuestion : boolean  =false;
 questions !: Quiz[];
 indice = 0;
 isDisplay = false;

    
  constructor(private managerService : ManagerService, private route : ActivatedRoute,private formBuilder : FormBuilder) { }
getChapters(){
  const id = this.route.snapshot.paramMap.get('id');
  this.managerService.getChapter(Number(id)).subscribe(
    (data)=>{
      this.chapters = data

    }
  )
}
addChapter(){
  this.isSubmited=true;
  const data = this.form.value;
  const id = this.route.snapshot.paramMap.get('id');
  if(this.form.valid){
  this.managerService.addChapter(data.name,Number(id)).subscribe(
    resp=>{
      this.message='success';
      setTimeout(() => {
        this.message='';
      }, 3000);
  },
    err=>this.message='error'
  )
  }
  this.form.reset()
  
}
  ngOnInit(): void {
    this.getChapters();
    this.getQuestions();
    this.form = this.formBuilder.group(
      {
        name:['',Validators.required],
      }
    );
    this.form2 = this.formBuilder.group(
      {
        question : ["",Validators.required],
        correctAnswer : ["",Validators.required],
        timePerQuestion : ["",Validators.required],
        choiseOne : ["",Validators.required],
        choiseTwo : ["", Validators.required],
        choiseThree : [""],
        choiseFor : [""],
        choiseFive : [""],
      }
    );
   
  }

  addQuestion(){
    this.isSubmited = true;
    const data = this.form2.value;
    const id = this.route.snapshot.paramMap.get('id');

    this.managerService.addQuestion(Number(id),data.question,data.correctAnswer, data.timePerQuestion,data.choiseOne,data.choiseTwo,data.choiseThree,data.choiseFor,data.choiseFive).subscribe(
      (resp:any)=>{
        this.message='success';
      setTimeout(() => {
        this.message='';
      }, 3000);
      }
    );
    this.form2.reset();
  }
  getQuestions(){
    const id = this.route.snapshot.paramMap.get('id');
    this.managerService.getQuiz(Number(id)).subscribe(
      (data)=>{
        this.questions = data;
      }
    )
  }
  displayChoise(i:number){
    if(this.indice == i){
      this.indice++;
    }else{
      this.indice = i;
    }
    
    
  }
  deleteQuiz(id:number, i:number){
    this.managerService.deleteQuiz(id).subscribe(
      resp=>console.log("deleted")
    )
    this.questions.splice(i,0);
  }

  // addAnswer(){
  //   const data = this.form.value;
  //   this.managerService.addChoiseAnswer(Number(this.idQuestion),data.answer).subscribe(
  //     (resp:any)=>{
        
  //     }
  //   )

  // }
  goToQuiz(){
    this.displayQuiz = false;
    this.listQuestion = true;
  }

  showModalDialog() {
    this.display = true;
}
showModalDialogQuiz(){
  this.displayQuiz=true;
}
close(){
  this.message = ''; 
}

}
