import { ManageCartService } from 'src/app/service/manage-cart/manage-cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.scss']
})
export class PaymentResultComponent implements OnInit {
resultPayments :any;
statusPayment !:string;
payementRef :any

  constructor(private manageCartService : ManageCartService, private route : ActivatedRoute) { 
    this.getPaymentDetails();
  }

  getPaymentDetails(){
    this.route.queryParams.subscribe(params=>{
      this.payementRef = params.payment_ref
      // console.log('payyyyyyment_ref',params.payment_ref);
    })
    console.log(this.payementRef);
    this.manageCartService.getPaymentsDetails(this.payementRef).subscribe(
      (resp:any) => {
        const statusPay = resp.payment.status;
        const id =resp.payment.orderId;
        console.log('ordeeeeer ',resp.payment.status);
       this.manageCartService.purchase(id,'completed').subscribe(
        resp=> console.log(resp)
      )
        switch (statusPay) {
          case "pending":
            this.statusPayment="pending";
            break;
          case "failed":
            this.statusPayment="failed";
            break;
          case "completed":
            this.statusPayment="completed"
            break;    
          default:
            this.statusPayment="failed"
            break;
        }
        
      }

    )
  }
  // dasipPaymentRef(){
  //   const paymetnId = this.route.queryParams.subscribe(params=>{
  //     console.log('payyyyyyment_ref',params.payment_ref);
  //   })
  // }

  ngOnInit(): void {
    // if(this.statusPayment && this.resultPayments){
    //   console.log('//////////////////////////////// aaaaaaa')
    //   const id =this.resultPayments.orderId;
    //   this.manageCartService.purchase(Number(id),this.statusPayment).subscribe(
    //     resp=> console.log(resp)
    //   )
    // }
  }

}
