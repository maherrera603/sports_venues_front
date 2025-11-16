import { Injectable } from '@angular/core';
import { Envs } from '../helpers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { IResponse, ISport } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Sport {
  private url: string = `${Envs.URL_BACK}sport-venue/`;

  constructor( private readonly httpClient: HttpClient){}

  public findSportVenues( token: string ): Observable<IResponse<ISport[]>>{
    const headers = new HttpHeaders().set("Authorization", token);
    return this.httpClient.get<IResponse<ISport[]>>(`${this.url}`, {headers})
      .pipe(catchError(({ error }) => of(error)));
  }

  public findSportVenuesByAvailable( token: string ): Observable<IResponse<ISport[]>>{
    const headers = new HttpHeaders().set("Authorization", token);
    return this.httpClient.get<IResponse<ISport[]>>(`${this.url}available/true`, {headers})
      .pipe(catchError(({ error }) => of(error)));
  }
}
