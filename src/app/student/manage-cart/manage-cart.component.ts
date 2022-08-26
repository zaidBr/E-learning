import { ManagerService } from './../../admin-dashboard/service/manager/manager.service';
import { Component, OnInit } from '@angular/core';
import { Cours } from 'src/app/interface/Cours';
import { ManageCartService } from 'src/app/service/manage-cart/manage-cart.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';


@Component({
  selector: 'app-manage-cart',
  templateUrl: './manage-cart.component.html',
  styleUrls: ['./manage-cart.component.scss']
})
export class ManageCartComponent implements OnInit {
coursCart:Cours[][] = [];
message='';
loaded= false;
totale!:number
stars:number =0;
displayVal = false;
idOrder !: number;
firstName !: string;
lastName !: string;
  constructor(private managerCart : ManageCartService,private router : Router,
     private authService : AuthService) { }
  getItemsCart(){
    this.managerCart.getContent().subscribe(
      (data)=>{
        this.coursCart = data;
        this.totale=this.coursCart.map((cours)=>{
            return cours[0].price
        }).reduce((prev,curr)=>prev+curr,0);

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

  confirmatePayment(){
    this.managerCart.validateCart("629eb022f6be05035faa3305",100,"immediate",10,"TND",this.firstName,this.lastName,String(this.idOrder),"https://api.dev.konnect.network/WSlQUtBF8","http://127.0.0.1:4200/student/payment-result",["bank_card","wallet","e-DINAR"])
    .subscribe(
      (resp:any) =>{
        window.location.href = resp.payUrl
      }
    )

  }  
  // rate(id:number){
  //   let raate=2;
  //   var subject = new Subject<number>()
  //    this.managerService.rateOneCours(id).subscribe(
  //     (data:any)=>{
  //        raate = data[0].rate;
  //        subject.next(raate)
  //     } 
  //   )
  //   return subject.asObservable();
  // }
  removeItem(id:number,i:number){
    this.managerCart.removeOne(id).subscribe(
      success=>{
        this.message = "success"
        
        this.coursCart.splice(i,1)
      },
      err=>this.message='error'
    )
  }

  validateCart(){
    if(this.authService.IsLogedInUser('ROLE_USER')){
      let id = '';
      this.managerCart.createOrder().pipe(
        take(1)
      ).subscribe(
        (data:any)=>{
          id =data.id;
          this.idOrder = data.id;
          this.firstName = data.firstName,
          this.lastName = data.lastName
          console.log(data.firstName)
        }
      )
      this.displayVal =true
    }else{
      this.authService.redirectUrl = '/student/cart';
      this.router.navigate(['/auth/login',{'msg':'authh'}]);
    }
    
    
  }

  
  emptyCart(){
    this.managerCart.emptyCart().subscribe();
    this.coursCart = [];
  }

  ngOnInit(): void {
    console.log('fiest name : '+this.firstName);  
    this.getItemsCart()

    
  }

}
