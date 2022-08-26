import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Cours } from 'src/app/interface/Cours';
import { ManagerService } from '../manager/manager.service';
@Injectable({
  providedIn: 'root'
})
export class  CoursEditResolverService {
  constructor(private managerService : ManagerService, private router : Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cours> | Observable<never>| UrlTree {
    const id = route.paramMap.get('id')!;

    return this.managerService.editCours(Number(id)).pipe(
      take(1),
      mergeMap(cours => {
        if (cours) {
          return of(cours);
        } else { // id not found
          this.router.navigate(['/cours/add']);
          return EMPTY;
        }
      })
    );
  }
}


