import { ManagerService } from './../../../../admin-dashboard/service/manager/manager.service';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/interface/Quiz';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  questions !: Quiz[];
  currentQuestion !: number;
  constructor(private managerService : ManagerService,  private route : ActivatedRoute ) { }
  getQuestions(){
    const id = this.route.snapshot.parent?.paramMap.get('id');
    console.log('the id of route is', id);
    
    this.managerService.getQuiz(Number(id)).subscribe(
      (data)=>{
        this.questions = data;
        console.log('data questions',this.questions);
        
      }
    )
  }

  nextQuestion(){
    this.currentQuestion ++ ;
  }

  previousQuestion(){
    this.currentQuestion -- ;
  }
  

  ngOnInit(): void {
    this.getQuestions();
  }


}
