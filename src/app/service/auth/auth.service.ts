import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';
import { Router } from '@angular/router';
const httOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : '*'
  }) 
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl : string = "http://127.0.0.1:8000/api/";
  isLoggedIn : boolean = false;
  redirectUrl : string = '';

  constructor(private http : HttpClient,private storage : TokenStorageService, private router:Router) { }
  
  
  
  
  register(name:string , lastName:string , email:string , plainPassword:string, confirmPlainPassword:string) { 
    return this.http.post(`${this.apiUrl}register`,{name, lastName, email, plainPassword, confirmPlainPassword},httOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  

  login(email:string, password:string):Observable<any>
  {
    return this.http.post(`${this.apiUrl}login_check`,{email,password},httOptions).pipe(
      tap(()=>this.isLoggedIn=true),
      catchError(this.errorHandler)
    )

  }
  loggout(){
    this.storage.signOut()
  }

  public isLogedIn():boolean
  {
    const token = this.storage.getToken();
    if(token){
      const infoToken : any = this.storage.decodeToken(token);
      return infoToken.exp > Date.now() / 1000;
  }
  return false;
}

// teacherIsLogedIn(){
//   const token = this.storage.getToken();
//     if(token && this.getRoleCurrentUser(token) === 'ROLE_FORMATEUR' )
//     {
//       const infoToken : any = this.storage.decodeToken(token);
//       return infoToken.exp > Date.now() / 1000;
//     }
//   return false;

// }
public IsLogedInUser(role:string):boolean
  {
    const token = this.storage.getToken();
    if(token && this.getRoleCurrentUser(token) === role)
    {
      const infoToken : any = this.storage.decodeToken(token);
      return infoToken.exp > Date.now() / 1000;
    }
    this.storage.signOut()
    return false;
}
accountIsActive(token:any){
  const infoToken : any = this.storage.decodeToken(token);
  const status = infoToken.isVerified;
  return status == false ? true : false;
}

theLogedUserIsNotAllowed(role:string){
  const token = this.storage.getToken();
  if(token && this.getRoleCurrentUser(token) !== role){
    this.storage.signOut();
    return this.router.parseUrl('/not-authorized');
   
  }else{
    return this.router.parseUrl('/auth/login');
  }
}

hisEmailIsVerified(email:string){
 const apiUrl = `${this.apiUrl}public/is-verified/${email}`;
  return this.http.get(apiUrl,httOptions)
}

public getRoleCurrentUser(token:any) {
  const infoToken : any = this.storage.decodeToken(token);
  const role = infoToken.roles[0];
        switch(role){
          case 'ROLE_ADMIN':
            'ROLE_ADMIN';
            break;
          case 'ROLE_FORMATEUR':
            'ROLE_FORMATEUR';
            break;
          case 'ROLE_USER':
            'ROLE_USER';
            break;
          default:
             'ROLE_USER';
              break;
        }
        return role;

}

refreshToken(refreshToken:string){
 return this.http.post(this.apiUrl+'token/refresh',refreshToken,httOptions).pipe(
   catchError(this.errorHandler)
 );
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
