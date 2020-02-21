import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from'@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxEditorModule } from 'ngx-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { PartitionsComponent } from './partitions/partitions.component';
import { PartitionComponent } from './partition/partition.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin/admin.component';
import { CreatePartitionComponent } from './admin/create-partition/create-partition.component';
import { EditPartitionComponent } from './admin/edit-partition/edit-partition.component';
import { PlayListComponent } from './play-list/play-list.component';
import { MatDialogPopupComponent } from './mat-dialog-popup/mat-dialog-popup.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    PartitionsComponent,
    PartitionComponent,
    AdminComponent,
    CreatePartitionComponent,
    EditPartitionComponent,
    PlayListComponent,
    MatDialogPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEditorModule
  ],
  entryComponents: [
    MatDialogPopupComponent
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
