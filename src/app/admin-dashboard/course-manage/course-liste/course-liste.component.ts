import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cours } from 'src/app/interface/Cours';
import { ManagerService } from '../../service/manager/manager.service';

@Component({
  selector: 'app-course-liste',
  templateUrl: './course-liste.component.html',
  styleUrls: ['./course-liste.component.scss']
})
export class CourseListeComponent implements OnInit,AfterViewInit {
  courses !: Cours[];
  selectedId !: number;
  page: number = 1;
  count: number = 0;
  tableSize: number = 9;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private managerService:ManagerService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCourses();
    this.selectedId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.selectedId)
  }
  getCourses():void{
    this.managerService.showPublicCours().subscribe(
      course=> {
        this.courses = course;
      },
      // (err)=>console.log(err)
    );
  }
  ngAfterViewInit(): void {
  }

  
  deleteCours(id:number,i:number){
    this.managerService.deleteCours(id).subscribe(
      data=>{
        // console.log(data);
      },
      (err)=>{
        // console.log(err);
      }
    );
    this.courses.splice(i,1);
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getCourses();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCourses();
  }
  

}
