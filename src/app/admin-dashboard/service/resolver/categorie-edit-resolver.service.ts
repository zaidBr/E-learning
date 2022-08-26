import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Categorie } from '../../interfaces/Categorie';
import { ManagerService } from '../manager/manager.service';
@Injectable({
  providedIn: 'root'
})
export class CategorieEditResolverService {

  constructor(private managerService : ManagerService, private router : Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Categorie> | Observable<never> {
    const id = route.paramMap.get('id')!;

    return this.managerService.editCategorie(Number(id)).pipe(
      take(1),
      mergeMap(categorie => {
        if (categorie) {
          return of(categorie);
        } else { // id not found
          this.router.navigate(['/categorie']);
          return EMPTY;
        }
      })
    );
  }

}
