import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, FormControl } from '@angular/forms';
import { PartitionService } from 'src/app/services/partition.service';
import {PaysService} from "../../services/pays.service";
import {InstrumentService} from "../../services/instrument.service";
import {TonaliteService} from "../../services/tonalite.service";
import {GenreService} from "../../services/genre.service";
import {Router} from "@angular/router";
import {Tonalite} from "../../models/tonalite";
import {Instrument} from "../../models/instrument";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-partition',
  templateUrl: './create-partition.component.html',
  styleUrls: ['./create-partition.component.scss']
})
export class CreatePartitionComponent implements OnInit {
  pays;
  instruments;
  tonalite;
  genre;
  creationForm:FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private partitionService:PartitionService,
    private el: ElementRef,
    private paysService: PaysService,
    private instrumentService: InstrumentService,
    private tonaliteService: TonaliteService,
    private genreService: GenreService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.createForm();
    this.getPays();
    this.getInstrument();
    this.getTonalite();
    this.getGenre();
  }
  getGenre() {
    this.genreService.getGenres()
      .subscribe(data => {
        this.genre = data;
        console.log('this.genre', this.genre)
      })
  }
  getTonalite() {
    this.tonaliteService.getTonalite()
      .subscribe(data => {
        this.tonalite = data;
      })
  }
  getInstrument() {
    this.instrumentService.getInstruments()
      .subscribe(data => {
        this.instruments = data;
      })
  }

  getPays() {
    this.paysService.getPays()
      .subscribe(data => {
        this.pays = data;
      });
  }

  createForm(){
   this.creationForm = this.fb.group({
      title: ['test titre'],
      subTitle:['test subTitle'],
      instruments: [''],
      composeur: ['test composeur'],
      pays: '',
      //images: ['test images'],
      genre: [''],
      tonalite: ['test tonalite'],
      partitionFile: '',
      abc: ['test abc'],
      midi: '',
      description: ['test description']
    });
  }

  createPartition(formDirective:FormGroupDirective){
    if(this.creationForm){
      console.log(this.creationForm);
      this.partitionService
        .createPartition(this.creationForm.value)
        .subscribe(data => this.handleSuccess(data, formDirective), error =>this.handleError(error));
    }
  }

  uploadFilePartition(){
    //on recupere l'element file upload de type file
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#partitionFile');
    let fileCount: number = inputEl.files.length;
    if(fileCount > 0) {
      let formData = new FormData();
      formData.append('partitionFile', inputEl.files.item(0));
      this.partitionService.uploadPartition(formData).subscribe(data=>console.log(data), err=>this.handleError(err))
    }
  }

  uploadFileAbc(){}

  uploadFileImage(){}

  handleFile(file){
    console.log(file)
  }

  handleSuccess(data: any, formDirective:FormGroupDirective){
    console.log('partition créée', data);
    //pour remettre le formulaire à 0  ==>> !!! dans le formulaire il y a une variable
    this.creationForm.reset();
    formDirective.resetForm();
    this.router.navigate(['partitions'])
    this.openSnackBar('Partition créée');
  }
  handleError(error: any){
    this.openSnackBar('Création de la partition en échec');
    console.error('erreur sur la création de la partition', error);
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'Fermer', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
