import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import {Observable, Subject, throwError} from 'rxjs';
import { Partition } from '../models/partition';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PartitionService {
  // baseUrl = 'http://localhost:3000/api/v1/partitions';
  baseUrl = 'http://localhost:1337/partitions';
  baseUrlUpload = 'http://localhost:1337';
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // 'Authorization': 'my-auth-token'
    })
  };
  private partitionCreated= new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  createPartition(partition:Partition){
    return this.httpClient.post<Partition>(`${this.baseUrlUpload}/partitions`, partition)
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadPartition(formData:FormData){
    return this.httpClient.post<any>(`${this.baseUrlUpload}/upload`, formData, this.httpOptions);
    // return this.httpClient.post<any>(`${this.baseUrl}/files`, formData);
  }

  dispatchPartitionCreated(id:string){
    this.partitionCreated.next(id);
  }
  handlePartitionCreated(){
    return this.partitionCreated.asObservable();
  }

  getPartitions(): Observable<Partition[]>{
    return this.httpClient.get<Partition[]>(this.baseUrl)
  }

  getPartitionById(id:string):Observable<Partition>{
    return this.httpClient.get<Partition>(`${this.baseUrl}/${id}`);
  }

  updatePartition(id:string, partition:Partition){
    return this.httpClient.put(`${this.baseUrl}/${id}`, partition);
  }

  deleteSinglePartition(id:string){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  deleteAllPartitions(ids:string[]){
    //requete de la forme htt://localhost/partitions?ids=5555567,77777777,7777777777
    const allIds = ids.join(','); //556777,88777,997765
    return this.httpClient.delete(`${this.baseUrl}/?ids=${allIds}`);
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
