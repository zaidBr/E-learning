import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Cours } from 'src/app/interface/Cours';
import { ManageCartService } from 'src/app/service/manage-cart/manage-cart.service';
export type Categorie = {
  id : number;
  name : string
}

@Component({
  selector: 'app-all-cours',
  templateUrl: './all-cours.component.html',
  styleUrls: ['./all-cours.component.scss']
})

export class AllCoursComponent implements OnInit {
  // searshTerms = new Subject<string>();
  online =false;
  recorded =false;
  coursByID !: Cours;
  cat='';
  popular='';
  textSearch ='';
  courses !:Cours[] ;
  categories : Categorie[] | any   = []   ;
  categoriess !: Categorie [];
  searchWith ='';
  nameCategorie='';
  message='';
  nbChapters !:number
  detailsDialog=false;
  nbPlaceFree!:number;
  nbAllPlace !: number;
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private mangerService : ManagerService,private route : ActivatedRoute,private managerCart: ManageCartService) { }
  getCategories(){
    
  }

  // search(item:string){
  //   this.searshTerms.next(item)
  // }

  // getAllCourses(){
  //   if(!this.online || !this.recorded){
  //     this.courses$ = this.mangerService.showPublicCours().pipe(
        
  //       debounceTime(1000),
  //       distinctUntilChanged()
        
  //     )
      
  //   }else{
  //     this.courses$ = this.mangerService.showPublicCours()
  //   } 
  //   this.courses$.subscribe(
  //     data=>{
  //       this.course=data;
  //       console.log("this is data "+this.course)
  //     }
      
  //   )
  // }
  someTest(){
    if(this.online){
      return'online';
    }else if (this.recorded){
      return 'enregistre';
    }else{
      return ''
    }
    
  }
  
  getAllCourses(){
    this.route.data.subscribe(
      data=>{
        this.courses = data.courses;
        this.categories = this.courses.map(cours=>{
          return cours.categorie
        });
        this.categoriess = Array.from(new Set(this.categories.map((c:Categorie)=>c.id)))
        .map(id=>{
          return this.categories.find((cat:Categorie)=>cat.id === id)
        })

        this.nbChapters = this.courses.map((cours : Cours)=>cours.nbChapter).reduce((prev, curr) => prev + curr, 0);
        
      }
    )
  }
  DisplaydetailsDialog(id:number){
    this.coursByID = this.courses.find(cours=>{
      return cours.id === id
    })!;
    this.nbPlaceFree = this.coursByID.groups.map((group : any)=> group.users.length ).reduce((prev,curr)=>prev + curr,0);
    this.nbAllPlace = this.coursByID.groups.map((group:any)=> group.max_size).reduce((prev,curr)=>prev + curr,0);
    this.detailsDialog=true;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllCourses();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllCourses();
  }
  addToCart(id:number){
    this.managerCart.addToCart(id).subscribe(
      resp=>{
        this.message='success'
      console.log(resp)},
      err=>{
        this.message = 'error'
      console.log(err)}
    )
   }
  
  ngOnInit(): void {
    if(this.route.snapshot.paramMap.has('type')){
      this.online=true;
    }

    if(this.route.snapshot.paramMap.has('categorie')){
      this.cat=this.route.snapshot.paramMap.get('categorie')!;
    }
    this.getAllCourses();
    
  }

}
