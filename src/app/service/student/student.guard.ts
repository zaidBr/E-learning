import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  constructor(private authService :AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // const url = route.url[1].path;
      // if(state.url.includes('cart')){
      //   const url = state.url;
      // }
      const url = route.url[1].path;
      return this.checkLoginStudent(url); 
  }
  checkLoginStudent(url: any): boolean | UrlTree {
    console.log('url guardddddd',url);
    if(this.authService.IsLogedInUser('ROLE_USER')){return true}

    this.authService.redirectUrl = `/student/cours-space/${url}`;
    // if(url.includes('cart')){
    //   this.authService.redirectUrl=url;
    // }
    return this.authService.theLogedUserIsNotAllowed('ROLE_USER');
}
}
