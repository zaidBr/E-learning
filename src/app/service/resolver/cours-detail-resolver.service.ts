import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ManagerService } from 'src/app/admin-dashboard/service/manager/manager.service';
import { Cours } from 'src/app/interface/Cours';


@Injectable({
  providedIn: 'root'
})
export class CoursDetailResolverService {
  constructor(private managerService : ManagerService, private router : Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cours> | Observable<never>| UrlTree {
    const id = route.paramMap.get('id')!;

    return this.managerService.showOneForFormateur(Number(id)).pipe(
      take(1),
      mergeMap(cours => {
        if (cours) {
          return of(cours);
        } else { // id not foun
          return EMPTY;
        }
      })
    );
  }
}

