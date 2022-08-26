import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SubscribedCoursService } from './subscribed-cours.service';

@Injectable({
  providedIn: 'root'
})
export class SubscribtionCoursGuard implements CanActivate {
  constructor(private checkSubscribe:SubscribedCoursService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = route.url[1].path;
    return this.checkStudent(url);
  }
 
  checkStudent(url: any): boolean | UrlTree {
    console.log('chapter guarddddd',url);
    if(this.checkSubscribe.guardd(url)){
      return true
    }
    this.checkSubscribe.msgNotAuthorized=true;
    return false;
  }

  
}
