import { AfterViewInit, Component, ComponentRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Categorie } from '../../interfaces/Categorie';
import { ManagerService } from '../../service/manager/manager.service';
import { CategorieComponent } from './categorie/categorie.component';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit,AfterViewInit {
  categories !: Categorie[]
  @ViewChildren(CategorieComponent) categoriesChildren !: QueryList<CategorieComponent>;
  courses !: Categorie[];
  selectedId !: number;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private managerService:ManagerService) { }

  ngOnInit(): void {
    this.getCategories();

  }

  ngAfterViewInit(): void {
  }
  
  getCategories():void{
    this.managerService.showCategorie().subscribe(
      categories=> {
        this.categories = categories;
      },
      (err)=>console.log(err)
    );
  }
  
  deleteCategorie(id:number,i:number){
    this.managerService.deleteCategorie(id).subscribe(
      data=>{
        console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    );
    this.categories.splice(i,1);
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getCategories();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCategories();
  }

}
