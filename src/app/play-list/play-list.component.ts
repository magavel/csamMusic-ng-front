import { Component, OnInit } from '@angular/core';
import {PlaylistService} from "../services/playlist.service";
import {Partition} from "../models/partition";
import {Playlist} from "../models/playlist";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {
  playlists:Playlist[];
  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistService.getPlaylist()
      .subscribe(data=>{
        this.playlists = data
      });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.playlists, event.previousIndex, event.currentIndex);
  }

}
