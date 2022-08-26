import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cours } from 'src/app/interface/Cours';
const apiUrl = "http://127.0.0.1:8000/api/";
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Credentials': 'true',
    'Content-type':'application/json'
      }),
      withCredentials : true
   
};

@Injectable({
  providedIn: 'root'
})
export class ManageCartService {
  updateCart:BehaviorSubject<any>=new BehaviorSubject(false)
  constructor(private httpClient : HttpClient) { } 
  
  addToCart(id:number){
    const url = `${apiUrl}public/cart/${id}`;
    return this.httpClient.get(url,httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
setCar(value:boolean){
  this.updateCart.next(value)
}
getCar():Observable<boolean>{
 return this.updateCart.asObservable()
}
  removeOne(id:number){
    const url = `${apiUrl}public/cart/remove/${id}`;
    return this.httpClient.delete(url,httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
 
  getContent():Observable<Cours[][]>{
  const url = `${apiUrl}public/cart/fetch/data`;
    return this.httpClient.get<Cours[][]>(url,httpOptions).pipe(
      catchError(this.errorHandler)
  )

  }
  emptyCart(){
    const url = `${apiUrl}public/cart/empty`;
    return this.httpClient.delete(url,httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
getNbItems():Observable<any>{
const url = `${apiUrl}public/cart/nb/data`;
return this.httpClient.get<any>(url,httpOptions).pipe(
  catchError(this.errorHandler)
)
}
createOrder(){
  const url = `${apiUrl}my/cart/validate`;
  return this.httpClient.get(url,httpOptions).pipe(
    catchError(this.errorHandler)
  )
  }
  validateCart(receiverWalletId:string,amount:number,type:string,
    lifespan:number,token:string,firstName:string,lastName:string,
    orderId:string,link:string,webhook:string,acceptedPaymentMethods:string[]){
      const httpOptionss = {
        headers: new HttpHeaders({
          'x-api-key':'629eb022f6be05035faa3304:iNOvHHf6g5VC089fGM9ofU7',
            }),

         
      };
    const url = `https://api.konnect.network/api/v2/payments/init-payment`;
    return this.httpClient.post(url,{receiverWalletId,amount,type,lifespan,token,firstName,lastName,orderId,link,webhook,acceptedPaymentMethods},httpOptionss)
  }
  getPaymentsDetails(paymentId:any){
    const htpOpions ={
      headers : new HttpHeaders({
        'Content-type':'application/json'
      })
    };
    const url = `https://api.konnect.network/api/v2/payments/${paymentId}`;
    return this.httpClient.get(url,htpOpions)
  }

  purchase(id:any,status:string){
    const url = `${apiUrl}add/to/my/cours/${id}/${status}`;
    return this.httpClient.put(url,{})
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }



}


  // addToCart(cours:Cours){
  //   window.localStorage.setItem(ITEM_CART,JSON.stringify(cours));
  // }
  // removeFromCart(){
  //   window.localStorage.re
  // }


