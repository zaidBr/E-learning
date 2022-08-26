import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
const TOKEN_KEY='auth-token';
const REFRESHTOKEN_KEY ='refresh_token';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public decodeToken(token:string){
    try{
      return jwt_decode(token);
    }catch(Error){
      return null;
    }
  }

  public saveRefreshToken(token: string): void {
    window.localStorage.removeItem(REFRESHTOKEN_KEY);
    window.localStorage.setItem(REFRESHTOKEN_KEY, token);
  }
  public getRefreshToken(): string | null
  {
    return window.localStorage.getItem(REFRESHTOKEN_KEY);
  }

 
}
