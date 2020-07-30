import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Pays} from "../models/pays";
import {catchError, retry} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(private httpClient: HttpClient) { }

  getPays(): Observable<Pays[]>{
    return this.httpClient.get<Pays[]>(`${config.URL}/pays`)
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
