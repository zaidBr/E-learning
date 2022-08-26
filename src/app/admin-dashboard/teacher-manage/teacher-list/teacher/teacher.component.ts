import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Teacher } from 'src/app/admin-dashboard/interfaces/Teacher';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
 @Input() teacher !: Teacher;
 imgPath = ``;
 @Output() deleteTeacher = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.imgPath = `http://127.0.0.1:8000/file/imageUser/${this.teacher.image}`;
  }
  delete(id:number){
    this.deleteTeacher.emit(id);
  }


}
