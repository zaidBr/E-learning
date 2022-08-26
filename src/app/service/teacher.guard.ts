import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(private authService :AuthService,private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    const url = state.url;
    return this.checkLoginTeacher(url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const url = state.url;
    return this.checkLoginTeacher(url)
  }

  canLoad(route: Route): boolean | UrlTree {
    const url = `/${route.path}`;
  
    return this.checkLoginTeacher(url); 
  }

  checkLoginTeacher(url: string): boolean | UrlTree {
    if(this.authService.IsLogedInUser('ROLE_FORMATEUR')){return true}
    this.authService.redirectUrl = url;
    return this.authService.theLogedUserIsNotAllowed('ROLE_FORMATEUR');
}
}
