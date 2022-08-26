import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Cours } from 'src/app/interface/Cours';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
courses !:Cours[]
responsiveOptions:any;
imgPath = '';
isLoaded = false;
  constructor(private managerService:ManagerService) { }
  showForFormateur(){
    this.managerService.showForFormateur().subscribe(
      data =>{
        this.courses=data;
        this.imgPath = `http://127.0.0.1:8000/file/fileformation/`
        console.log(this.courses)
        this.responsiveOptions = [
          {
              breakpoint: '1024px',
              numVisible: 3,
              numScroll: 3
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 2
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
      ];
      this.isLoaded=true;
      }
    )
  }
  ngOnInit(): void {
    this.showForFormateur();
    
  }

}
