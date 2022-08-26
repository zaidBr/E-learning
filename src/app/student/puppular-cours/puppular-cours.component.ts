import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Cours } from 'src/app/interface/Cours';
import { ManageCartService } from 'src/app/service/manage-cart/manage-cart.service';

@Component({
  selector: 'app-puppular-cours',
  templateUrl: './puppular-cours.component.html',
  styleUrls: ['./puppular-cours.component.scss'],
})
export class PuppularCoursComponent implements OnInit {
popCours !: Cours[];
nomber  = 5;
message='';
responsiveOptions:any;
  constructor(private managerService : ManagerService,private managerCart : ManageCartService) { }
  
 getPoppular(){
   this.managerService.mostRaitingCours().subscribe(
     data=>{
       this.popCours=data;
      //  this.stars = (data[0].rate * 5)/100;
       console.log('this is data '+(data[0].rate*5)/100)
       this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 2,
            numScroll: 1
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
     }
   )
 }
 rate(evaluations:any){
  let totalRate = evaluations.map(
    (evaluation:any)=>{
      return evaluation.satrs
    }
  ).reduce((prev:number,curr:number)=>prev+curr,0);

   return totalRate  / evaluations.length;
}

 addToCart(id:number){
  this.managerCart.setCar(true)

  this.managerCart.addToCart(id).subscribe(
    resp=>{
      this.managerCart.setCar(true)
      this.message='success'
      console.log(resp,"resp");
      
    console.log(resp)},
    err=>{
      this.message = 'error'

    console.log(err)}
  )
 }
 
  ngOnInit(): void {
    this.getPoppular()
  }

}
