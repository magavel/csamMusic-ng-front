import {Component, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistService} from "../services/playlist.service";
import {Playlist} from "../models/playlist";

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  playlist: Playlist;
  playlistSub;

  constructor(
    private activatedRoute:ActivatedRoute,
    private playlistService: PlaylistService,
    private el: ElementRef<HTMLElement>) {
  }

  ngOnInit() {
    const id =  this.activatedRoute.snapshot.paramMap.get('id');
    this.playlistSub = this.playlistService
      .getPlaylistById(id)
      .subscribe((data: Playlist) => {
        this.playlist = {...data}
        //this.playlistService.createSheet(this.playlist.partitions, this.el);
      });

  }
  ngOnDestroy(): void {
    this.playlistSub.unsubscribe();
  }

}
