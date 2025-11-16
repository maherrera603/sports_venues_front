import { Injectable } from '@angular/core';
import { Envs } from '../helpers';
import { catchError, Observable, of } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth';
import { IResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class User {
  private url: string = `${Envs.URL_BACK}user/`;

  constructor( private readonly authService: Auth, private readonly httpClient: HttpClient){}

  public update( user: IUser):Observable<IResponse<IUser>>{
    const headers = new HttpHeaders().set("content-type", "application/json").set("authorization", this.authService.getTokenLS!);
    return this.httpClient.put<IResponse<IUser>>(`${this.url}profile`, JSON.stringify(user), { headers })
      .pipe(catchError(({ error }) => of(error)));
  }
}
