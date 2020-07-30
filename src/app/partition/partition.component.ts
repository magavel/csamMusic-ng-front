import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PartitionService } from '../services/partition.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Partition } from '../models/partition';
import { environment } from '../../environments/environment'
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';



@Component({
  selector: 'app-partition',
  templateUrl: './partition.component.html',
  styleUrls: ['./partition.component.scss']
})
export class PartitionComponent implements OnInit {

  partition: Partition;
  partitionFilePath = environment.partitionFilePath;
  musicXml=``;

  constructor(
    private activatedRoute:ActivatedRoute ,
    private partitionService: PartitionService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
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
    const id =  this.activatedRoute.snapshot.paramMap.get('id');
    this.partitionService
      .getPartitionById(id)
      .subscribe(data => {
        this.partition = data
      });


  }


}
