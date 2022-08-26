import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../interfaces/Teacher';
import { ManagerService } from '../../service/manager/manager.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
teachers : Teacher[] = [];
  selectedId !: number;
  page: number = 1;
  count: number = 0;
  tableSize: number = 9;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private managerService : ManagerService) { }

  ngOnInit(): void {
    this.getTeachers()
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

  deleteCours(id:number,i:number){
    this.managerService.deleteTeacher(id).subscribe(
    );
    this.teachers.splice(i,1);
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getTeachers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getTeachers();
  }
}
