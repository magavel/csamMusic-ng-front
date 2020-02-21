import { Component, OnInit , Inject} from '@angular/core';
import { PartitionService } from 'src/app/partition.service';
import { Partition } from 'src/app/models/partition';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';


export interface DialogData {
  playlists: 'Fête de la musique' | 'danse' | 'défilé';
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  allPartitions:Partition[];

  constructor(
    private partitionService: PartitionService, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer, 
  
    ) {
    iconRegistry.addSvgIcon(
        'add',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/add-24px.svg'));
    iconRegistry.addSvgIcon(
        'delete',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete_forever-24px.svg'));
    iconRegistry.addSvgIcon(
        'create',
        sanitizer.bypassSecurityTrustResourceUrl('assets/icons/create-24px.svg'));
  }




  

  ngOnInit() {
    this.partitionService.getPartitions()
    .subscribe(data=>this.refresh(data));
  }

  deletePartitions(selectedOptions: { value: any; }[]){
    const ids = selectedOptions.map((so: { value: any; })=>so.value);
    if(ids.length === 1){
      this.partitionService
        .deleteSinglePartition(ids[0])
        .subscribe(data=>this.refresh(data), err=>this.handleError(err));
    } else {
      return this.partitionService.deleteAllPartitions(ids).subscribe(data=>this.refresh(data), err=>this.handleError(err))
    }
  }

  refresh(data){
    this.partitionService.getPartitions()
    .subscribe(data=>{
      this.allPartitions = data
    });
  }

  handleError(err){
    console.log(err);
  }

  addPlayListPartitions(selectedOptions: { value: any; }[]){
    console.log(selectedOptions.length);
  }
}