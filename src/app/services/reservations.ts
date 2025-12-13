import { Injectable } from '@angular/core';
import { Envs } from '../helpers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { DReservation, IReservation, IResponse, ISport } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Reservations {
  private url: string = `${Envs.URL_BACK}reservation/`;

  constructor( private readonly httpClient: HttpClient){}

  public find( token: string): Observable<IResponse<IReservation[]>>{
    const headers = new HttpHeaders().set("Authorization", token);
    return this.httpClient.get<IResponse<IReservation[]>>(`${this.url}`, { headers })
      .pipe( catchError( ({ error }) => of( error )) );
  }

  public findBySportsVenue( id: string, token: string ): Observable<IResponse<IReservation[]>>{
    const headers = new HttpHeaders().set("Authorization", token);
    return this.httpClient.get<IResponse<IReservation[]>>(`${this.url}sport-venues/${id}`, { headers })
      .pipe( catchError( ({ error }) => of(error)));
  }

  public findByUser( token: string ): Observable<IResponse<IReservation[]>>{
    const headers = new HttpHeaders().set("Authorization", token);
    return this.httpClient.get<IResponse<IReservation[]>>(`${this.url}user`, { headers })
      .pipe( catchError( ({ error }) => of(error )))
  }

  public create( token: string, data: DReservation ): Observable<IResponse<IReservation>>{
    const headers = new HttpHeaders().set("Authorization", token).set("Content-Type", "application/json");
    return this.httpClient.post<IResponse<IReservation>>(`${this.url}`, JSON.stringify(data), { headers })
      .pipe( catchError( ({ error }) => of( error )))
  }

  public update( token: string, id: string, data: DReservation ): Observable<IResponse<IReservation>>{
    const headers = new HttpHeaders().set("Authorization", token).set("Content-Type", "application/json");
    return this.httpClient.put<IResponse<IReservation>>(`${this.url}${id}`, JSON.stringify(data), { headers })
      .pipe( catchError( ({ error }) => of(error) ) );
  }

}
