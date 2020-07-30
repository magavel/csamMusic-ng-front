import {ElementRef, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Observable, Subject, throwError} from 'rxjs';
import { Partition } from '../models/partition';
import { Playlist } from '../models/playlist';
import {catchError, retry} from "rxjs/operators";
import abcjs from "abcjs";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  baseUrl = 'http://localhost:1337/playlists';
  private playlistCreated= new Subject<string>();
  constructor(private httpClient: HttpClient) { }

  getPlaylist(): Observable<Playlist[]>{
    return this.httpClient.get<Playlist[]>(this.baseUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  public createSheet(partitions, el: ElementRef<HTMLElement>) {
    for (let partition of partitions) {
      console.log('partition', partition)
      return abcjs.renderAbc(el.nativeElement, partition, {});
    }
  }

  getPlaylistById(id:string):Observable<Playlist>{
    return this.httpClient.get<Playlist>(`${this.baseUrl}/${id}`)
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
