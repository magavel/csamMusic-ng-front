import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartitionsComponent } from './partitions/partitions.component';
import { PartitionComponent } from './partition/partition.component';
import { CreatePartitionComponent } from './admin/create-partition/create-partition.component';
import { AdminComponent } from './admin/admin/admin.component';
import { EditPartitionComponent } from './admin/edit-partition/edit-partition.component';
import { PlayListComponent } from './play-list/play-list.component';


const routes: Routes = [
  {path:'partitions', component:PartitionsComponent},
  {path:'partitions/playlists', component:PlayListComponent},
  {path:'partitions/:id', component:PartitionComponent},
  {path:'admin', component:AdminComponent},
  {path:'admin/partitions/:id', component:EditPartitionComponent},
  {path:'admin/creationPartition', component:CreatePartitionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
