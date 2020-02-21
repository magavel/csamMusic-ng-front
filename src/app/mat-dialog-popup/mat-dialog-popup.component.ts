import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-mat-dialog-popup',
  templateUrl: './mat-dialog-popup.component.html',
  styleUrls: ['./mat-dialog-popup.component.scss']
})
export class MatDialogPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.test();
  }

  test(){
    console.log(this.data)
  }
  
}
