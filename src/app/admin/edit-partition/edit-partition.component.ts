import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { PartitionService } from 'src/app/partition.service';
import { ActivatedRoute } from '@angular/router';
import { Partition } from 'src/app/models/partition';

@Component({
  selector: 'app-edit-partition',
  templateUrl: './edit-partition.component.html',
  styleUrls: ['./edit-partition.component.scss']
})
export class EditPartitionComponent implements OnInit {
  editForm: FormGroup;
  partitionId: string;
  partition: Partition;

  constructor( 
    private fb:FormBuilder, 
    private partitionService:PartitionService, 
    private element: ElementRef, 
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.partitionId = this.activatedRoute.snapshot.paramMap.get('id');
    this.partitionService.getPartitionById(this.partitionId)
      .subscribe(data=>{
        this.partition = data;
      }, 
      error=>console.error(error)
      );
      this.createForm();
  }


  createForm(){
    this.editForm = this.fb.group({
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
    })
  }
  updatePartition(formDirective: FormGroupDirective){
    if(this.editForm.valid){
      console.log(this.editForm.value);
      this.partitionService
        .updatePartition(this.partitionId, this.editForm.value)
        .subscribe(data=>this.handleSuccess(data, formDirective), err=>this.handleError(err)
        )

    }
  }

  uploadFilePartition(){
    //on recupere l'element file uploadde type partitionFile
    let inputEl: HTMLInputElement = this.element.nativeElement.querySelector('#partitionFile');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if(fileCount > 0) {
      formData.append('partitionFile', inputEl.files.item(0));
      this.partitionService.uploadPartition(formData).subscribe(data=>console.log(data), err=>this.handleError(err))
    }
  }

  handleSuccess(data: any ,formDirective:FormGroupDirective){
    console.log(data);
    this.editForm.reset();
    formDirective.resetForm();
    this.partitionService.dispatchPartitionCreated(data._id);
  }
  handleError(err){
    console.error(err)
  }
}
