import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Crypto, Envs } from '../helpers';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResponse } from '../interfaces';
import { ISignIn, ISignUp, IUser } from '../interfaces/IUser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private url = `${Envs.URL_BACK}auth/`;
  private platformId = inject(PLATFORM_ID);

  constructor( private readonly httpClient:HttpClient ){}

  public signUp( signUp: ISignUp ):Observable<IResponse<IUser>>{
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.post<IResponse<IUser>>(`${this.url}register`, JSON.stringify(signUp), { headers })
      .pipe( catchError(({ error }) => of(error)) );
  }

  public signIn( signIn: ISignIn ):Observable<IResponse<{user:IUser, token: string}>>{
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.httpClient.post<IResponse<{user:IUser, token: string}>>(`${this.url}signin`, JSON.stringify(signIn), { headers })
      .pipe( catchError(({ error }) => of(error)) );
  }

  public saveUserLS(user: IUser){
    const key = Crypto.hashKey(Envs.KEY_USER_LS);
    const value = Crypto.hashContent( JSON.stringify(user ));
    sessionStorage.setItem(key, value);
  }


  public saveTokenLS(token: string ){
    const key = Crypto.hashKey(Envs.KEY_TOKEN_LS);
    const value = Crypto.hashContent( JSON.stringify(token) );
    sessionStorage.setItem(key, value);
  }

  public get getUserLS(): IUser | null{
    if(!isPlatformBrowser(this.platformId)) return null;

    const key = Crypto.hashKey(Envs.KEY_USER_LS);
    const data = sessionStorage.getItem(key);
    return data ? Crypto.decryptContent<IUser>(data): null;
  }

  public get getTokenLS(): string | null{
    if(!isPlatformBrowser(this.platformId)) return null;

    const key = Crypto.hashKey(Envs.KEY_TOKEN_LS);
    const data = sessionStorage.getItem(key);
    return data ? "Bearer "+ Crypto.decryptContent<string>(data): null;
  }

  public resetLS(){
    if(!isPlatformBrowser(this.platformId)) return;
    sessionStorage.clear();
  }

  public get isAdmin(): boolean {
    return this.getUserLS!.role === "ADMIN_ROLE";
  }

  public get isUser(): boolean {
    return this.getUserLS!.role === "USER_ROLE";
  }


}
