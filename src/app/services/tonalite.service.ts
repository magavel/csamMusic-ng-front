import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Tonalite} from "../models/tonalite";
import {config} from "../config";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TonaliteService {

  constructor(private httpClient: HttpClient) { }

  getTonalite(): Observable<Tonalite[]>{
    return this.httpClient.get<Tonalite[]>(`${config.URL}/tonalites`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
