import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Partition } from './models/partition';

@Injectable({
  providedIn: 'root'
})
export class PartitionService {
  baseUrl = 'http://localhost:3000/api/v1/partitions';
  private partitionCreated= new Subject<string>();

  constructor(private httpClient: HttpClient) { }

  createPartition(partition:Partition){
    return this.httpClient.post<Partition>(this.baseUrl, partition)
  }

  uploadPartition(formData:FormData){
    return this.httpClient.post<any>(`${this.baseUrl}/files`, formData);
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

}
