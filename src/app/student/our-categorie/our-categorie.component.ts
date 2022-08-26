import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/admin-dashboard/interfaces/Categorie';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';

@Component({
  selector: 'app-our-categorie',
  templateUrl: './our-categorie.component.html',
  styleUrls: ['./our-categorie.component.scss']
})
export class OurCategorieComponent implements OnInit {
  categories !:Categorie[];
  constructor(private managerService : ManagerService, private router:Router) { }

  ngOnInit(): void {
    this.managerService.showCategorie().subscribe(
      data => this.categories = data
    )
  }
//   goToList(){
// this.router.navigate(['all-courses',{'categorie':categorie.name}])
//   }

}
