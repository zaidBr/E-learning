import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Chapter } from 'src/app/interface/Chapter';
import { Observable } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inside-cours',
  templateUrl: './inside-cours.component.html',
  styleUrls: ['./inside-cours.component.scss']
})
export class InsideCoursComponent implements OnInit {
chapters !: Chapter[];
chapter$ !: Observable<Chapter>;
index!:number;
lastId !:number;
firsId !:number;
display :boolean =false;
noteDialog =false;
form !:FormGroup;
form2 !: FormGroup;
coursComment !:string;
coursStars !:number;
teacherComment !:string;
teacherStars !:number;
isOnline = false;
meetUrl = '';
selectedData:any
// myRate!:{cours:{stars:number,comment:string},teacher:{stars:number,comment:string}};

  constructor(private route:ActivatedRoute, private managerService : ManagerService,private formBuilder:FormBuilder) { 
  }
  
  getListChapters(){
  const id = this.route.snapshot.parent?.paramMap.get('id');
  const idChaper = this.route.snapshot.paramMap.get('chapter');
  console.log('id snapshot =  '+id+' idChapter = '+idChaper)
  this.managerService.getChapter(Number(id)).
  pipe(
    take(1),
    finalize(()=>{
      this.display =true;
    })
  
  ).subscribe(
    data=>{
      this.chapters = data;
      console.log(data,"dataaa");
      
      this.lastId = this.chapters[this.chapters.length-1].id;
      this.firsId = this.chapters[0].id;
      this.index = this.chapters.findIndex(chapter=>chapter.id === Number(idChaper));
      this.selectedData = this.chapters.find(chapter=>chapter.id === Number(idChaper));
    }
  )
  
}

scroll(el: HTMLElement) {
  el.scrollIntoView({behavior: 'smooth'});
}

getUrlMeeting(){
  const id = this.route.snapshot.parent?.paramMap.get('id');
  this.managerService.getMeeting(Number(id)).subscribe(
    (data:any)=> {
      this.meetUrl = data.url;
      // console.log('meeeeeet urlllllllllllllllllll : ',data);
    }
  );
}


evaluateCours(){
  const data = this.form.value;
  console.log(data.comment+'  formGroup '+data.stars)
  if(this.form.valid){
    const id = this.route.snapshot.parent?.paramMap.get('id');
    this.managerService.evaluateCours(Number(id),data.comment,data.stars).subscribe()
  }
  
}
myRates(){
  const id = this.route.snapshot.parent?.paramMap.get('id');
  this.managerService.myRate(Number(id)).subscribe(
    (resp:any)=>{
      let dataC = JSON.parse(resp.evaluationC);
      let dataT = JSON.parse(resp.evaluationT)
      this.coursComment = dataC.comment;
      this.teacherStars = dataT.stars;
      // console.log(this.coursComment+'commmmmmentttts')
      this.coursStars = dataC.satrs;
      this.teacherComment =dataT.comment;
      
    }
  )
}
evaluateTeacher(){
  const data = this.form2.value;
  console.log(this.form2.value.comment);
  console.log(this.form2.value.stars);

  if(this.form2.valid){
    const id = this.route.snapshot.parent?.paramMap.get('id');
    this.managerService.evaluateTeacher(Number(id),data.comment,data.stars).subscribe()
  }
}


getDataOneChapter(){
  this.chapter$ = this.route.paramMap.pipe(
    switchMap((params : ParamMap)=>{
       return this.managerService!.getDataChapter(Number(params.get('chapter')!))
       
    })
  )!;
  this.getUrlMeeting();
  
}
displayDialog(){
  this.noteDialog =true;
}
// getCurrentKeyChapter(){
//   if(this.chapters){
    
//   }
  
// }
  ngOnInit(): void {
    this.myRates()
    // this.getUrlMeeting()
    this.getListChapters()
    this.getDataOneChapter();
    this.form =this.formBuilder.group(
      {
        comment:['',Validators.required],
        stars:['',Validators.required]
      }
    )
    this.form2 = this.formBuilder.group({
      comment:['',Validators.required],
      stars:['',Validators.required]
    })
    // this.getCurrentKeyChapter();
  }

}
