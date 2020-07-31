import {Component, Input, OnInit} from '@angular/core';
import abcjs from "abcjs";

@Component({
  selector: 'app-multi-abc-player',
  templateUrl: './multi-abc-player.component.html',
  styleUrls: ['./multi-abc-player.component.scss']
})
export class MultiAbcPlayerComponent implements OnInit {

  @Input() abcTunes;
  abcTunesConcat;
  private visualObj: any;

  constructor() { }

  ngOnInit() {
    this.abcPlayer();
  }

  private abcPlayer() {
    let abcOptions = {
      add_classes: true,
      // responsive: 'resize',
      staffwidth: 740,
      print: true,
      // wrap:{ minSpacing: 1.8, maxSpacing: 2.7, preferredMeasuresPerLine: 4 }
    };
    this.abcTunes.map(data => {
      console.log('data', data.abc)
      this.abcTunesConcat+= data.abc;
      this.abcTunesConcat+= ' \n \n ';
    })
    this.abcTunesConcat = this.abcTunesConcat.substring(9);
    console.log('concat', this.abcTunesConcat)

    this.visualObj = abcjs.renderAbc(["target1","target2"], this.abcTunesConcat, abcOptions);

  }

}
