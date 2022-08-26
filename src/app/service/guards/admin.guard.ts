import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild,CanLoad{
  constructor(private authService :AuthService,private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if(this.authService.isLogedIn() && this.authService.getRoleCurrentUser() === 'ROLE_ADMIN'){
      //   return true
      //   }else
      // return this.router.navigate(['/login']);
      const url = state.url;
      return this.checkLoginAdmin(url)
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const url = state.url;
    return this.checkLoginAdmin(url)
  }
  canLoad(route: Route): boolean | UrlTree {
    const url = `/${route.path}`;
  
    return this.checkLoginAdmin(url);
  }


  checkLoginAdmin(url: string): boolean | UrlTree {
    if (this.authService.IsLogedInUser('ROLE_ADMIN')) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.authService.theLogedUserIsNotAllowed('ROLE_ADMIN');
  }


  
}
