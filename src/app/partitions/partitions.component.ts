import { Component, OnInit , Inject} from '@angular/core';
import { Observable } from 'rxjs';
import { Partition } from '../models/partition';
import { PartitionService } from '../partition.service';
import { environment } from '../../environments/environment'
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogPopupComponent } from '../mat-dialog-popup/mat-dialog-popup.component';


export interface DialogData {
  playlists: 'defile' | 'danse' | 'pub';
}


@Component({
  selector: 'app-partitions',
  templateUrl: './partitions.component.html',
  styleUrls: ['./partitions.component.scss']
})
export class PartitionsComponent implements OnInit {
  partitions:Partition[];
  partitionFilePath = environment.partitionFilePath;
  playlists: string[] = ["defile", "danse"];

  constructor(
    private partitionService: PartitionService, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer  ,
    public dialog: MatDialog
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



    openDialog() {
      this.dialog.open(MatDialogPopupComponent, {
        data: {
          playlist:this.playlists
        }
      });
    }


  ngOnInit() {
    this.partitionService.getPartitions()
      .subscribe(data=>{
        this.partitions = data
      });
  }

}