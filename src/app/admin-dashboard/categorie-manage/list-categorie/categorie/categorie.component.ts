import { Component, EventEmitter, Input, OnInit, Output, OnDestroy, AfterViewChecked } from '@angular/core';
import { Categorie } from 'src/app/admin-dashboard/interfaces/Categorie';

@Component({
  selector: 'app-categorieee',
  templateUrl: './categorie.component.html',
  styleUrls: ['../../../course-manage/course-liste/course/course.component.scss']
})
export class CategorieComponent implements OnInit,AfterViewChecked {
  @Input() categorie !: Categorie;
  @Input() index !:number
  @Output() categorieDeleted = new EventEmitter<number>();
  status !: string;
  detailsStatus = false;
  imgPath = ``;
  constructor() { }

  // ngOnChanges(changes: SimpleChanges ): void {
  //   let change :SimpleChange = changes['categorie'];
    
  // }
  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    this.imgPath = `http://127.0.0.1:8000/file/filePdf/${this.categorie.image}`;
  }

  showDetails(){
    this.detailsStatus = !this.detailsStatus;

  }
  
  
  delete(id:number){
    this.categorieDeleted.emit(id);
  }

}
