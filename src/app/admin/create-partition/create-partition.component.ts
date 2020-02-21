import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, FormControl } from '@angular/forms';
import { PartitionService } from 'src/app/partition.service';

@Component({
  selector: 'app-create-partition',
  templateUrl: './create-partition.component.html',
  styleUrls: ['./create-partition.component.scss']
})
export class CreatePartitionComponent implements OnInit {

  creationForm:FormGroup;
  listIntruments:string[]= ["pibs", "violon", "bombarde", "percu", "whistle en D"];
  instru:FormControl;

  constructor(private fb: FormBuilder, private ps:PartitionService, private el: ElementRef) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
   this.creationForm = this.fb.group({
      title:'',
      subTitle:'',
      instruments: '',
      composeur: '',
      pays: '',
      images: '',
      genre: '',
      tonalite: '',
      partitionFile: '',
      abc: '',
      midi: '',
      description: ''
    });
  }

  createPartition(formDirective:FormGroupDirective){
    if(this.creationForm){
      console.log(this.creationForm);
      this.ps
        .createPartition(this.creationForm.value)
        .subscribe(data => this.handleSuccess(data, formDirective), error =>this.handleError(error));
    }
  }

  handleSuccess(data: any, formDirective:FormGroupDirective){
    console.log('partition créée', data);
    //pour remettre le formulaire à 0  ==>> !!! dans le formulaire il y a une variable
    this.creationForm.reset();
    formDirective.resetForm();
  }
  handleError(error: any){
    console.error('erreur sur la création de la partition', error);
  }

  uploadFilePartition(){
    //on recupere l'element file uploadde type file
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#partitionFile');
    let fileCount: number = inputEl.files.length;
    if(fileCount > 0) {
      let formData = new FormData();
      formData.append('partitionFile', inputEl.files.item(0));
      this.ps.uploadPartition(formData).subscribe(data=>console.log(data), err=>this.handleError(err))
    }
  }

  uploadFileAbc(){}

  uploadFileImage(){}

  handleFile(file){
    console.log(file)
  }
}
