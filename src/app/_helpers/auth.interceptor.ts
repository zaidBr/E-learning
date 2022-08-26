import { AuthService } from 'src/app/service/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../service/token-storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { LoadingService } from '../admin-dashboard/service/loading.service';
const TOKEN_HEADER_KEY = 'Authorization';       
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private storage : TokenStorageService, private authService: AuthService,private loader : LoadingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loader.show();
        const token = this.storage.getToken();
        let authReq = req;
        if(token && !authReq.url.includes('api/public') && !authReq.url.includes('api/login_check')){
              authReq = this.addTokenHeader(req, token);
        }
        return next.handle(authReq).pipe(
            finalize(()=>{
                this.loader.hide();
            }),
            catchError((error ) => {
                if(error instanceof HttpErrorResponse && !authReq.url.includes('api/login_check') && error.status === 401 ){
                    return this.handle401Error(authReq,next);
                }
                return throwError(error);
            })
        );


    }
    private handle401Error(request : HttpRequest<any>, next : HttpHandler){
        if(!this.isRefreshing){
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            const refreshToken = this.storage.getRefreshToken();
            if(refreshToken){
                this.authService.refreshToken(refreshToken).pipe(
                    switchMap((data : any)=>{
                        this.isRefreshing = false;
                        const token = data.token
                        this.storage.saveToken(token);
                        this.refreshTokenSubject.next(token);
                        return next.handle(this.addTokenHeader(request, token)); 
                    }),
                    catchError((err)=>{
                        this.isRefreshing = false;
                        this.storage.signOut();
                        return throwError(err);
                    })
                );
            }
           
           
        }
        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap((token) => next.handle(this.addTokenHeader(request, token)))
          );
    }
    private addTokenHeader(request : HttpRequest<any>, token:string){
       return  request.clone(
            { headers: request.headers.set(TOKEN_HEADER_KEY,'Bearer '+token) }
        )
    }

}
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];