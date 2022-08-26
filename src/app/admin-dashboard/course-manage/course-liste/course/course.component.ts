import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output, DoCheck, KeyValueDiffers, KeyValueDiffer, KeyValueChangeRecord, AfterViewChecked } from '@angular/core';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Cours } from 'src/app/interface/Cours';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit,DoCheck,AfterViewChecked {
  @Input() index !:number
  @Input() cours !:  Cours; 
  @Output() coursDeleted = new EventEmitter<number>();
  oldCours = {} as Cours;
  changeDetected : boolean = false;
  coursDifferMap = new Map<number,any>();
  coursMap = new Map<number, Cours>();
  coursDiffer!:any;
  changelog: string[] = [];
  status !: string;
  alert!:string;
  detailsStatus : boolean = false;
  imgPath = ``
  displayModal = false;
  form!:FormGroup;
  form2!:FormGroup;
  isSubmitted = false;
  message = ''
  displayModalMeeting =false;


  constructor(private serviceManager : ManagerService,private differs:KeyValueDiffers, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        name:['',Validators.required],
        maxSize:['',Validators.required]
      }
      
    );
    this.form2 = this.formBuilder.group(
      {
        title:['',Validators.required],
        meetingUrl:['',Validators.required]
      }
    )
    
  }
  ngDoCheck(): void {
    // console.log(this.coursDifferMap)
    // const changes = this.coursDifferMap.get(this.index).diff(this.coursMap.get(this.index))
    // console.log(changes);
    }
    ngAfterViewChecked(): void {
      this.imgPath = `http://127.0.0.1:8000/file/filePdf/${this.cours.image}`
    }
    showDetails(){
      this.detailsStatus = !this.detailsStatus;
    }

  delete(id:number){
    this.coursDeleted.emit(id);
  }
  // sessionControle(id:number){
  //   this.statusSession.emit(id)
  // }
  controleSession(id:number){
    this.serviceManager.controleSessionCours(id)
    .subscribe(
      resp => {console.log(resp)},
      err => console.log(err)
    );
  }
  showModal(){
    if(this.cours.type == 'online')
    this.displayModal =true;
  }

  addGroup(id:number){
    this.isSubmitted = true;
    const data = this.form.value;
    if(this.form.valid){
      this.serviceManager.addGroup(data.name,data.maxSize,id).subscribe(
        resp=>{
          this.message = 'success'
        },
        err=>this.message = 'error'
      )
      this.form.reset();
    }

  }

  addMeeting(id:number){
    this.isSubmitted = true;
    const data = this.form2.value;
    if(this.form2.valid){
    this.serviceManager.addMeeting(data.title,data.meetingUrl,id).subscribe(
      resp=>{
        this.message = 'success'
      },
      err=>this.message = 'error'
    )
    }
  }
  displayModalMett(){
    this.displayModalMeeting=true;
  }

}
