import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import abcjs from "abcjs";


@Component({
  selector: 'app-abc-player',
  templateUrl: './abc-player.component.html',
  styleUrls: ['./abc-player.component.scss']
})
export class AbcPlayerComponent implements OnInit {
  @Input() abcFile;

  constructor() { }
  ngOnDestroy() {

  }
  ngOnInit() {
    // given that there are two elements in the DOM with the IDs "paper" and "audio"
    let cursorControl ; // see section on CursorControl
    let abcOptions = {
      add_classes: true,
      responsive:'resize',
      staffwidth:740,
      // wrap:{ minSpacing: 1.8, maxSpacing: 2.7, preferredMeasuresPerLine: 4 }
    };
    let audioParams = { chordsOff: true };

    if (abcjs.synth.supportsAudio()) {
      let synthControl = new abcjs.synth.SynthController();
      synthControl.load("#audio",
        cursorControl,
        {
          displayLoop: true,
          displayRestart: true,
          displayPlay: true,
          displayProgress: true,
          displayWarp: true
        }
      );
      let visualObj = abcjs.renderAbc("paper",
        this.abcFile, abcOptions);
      var createSynth = new abcjs.synth.CreateSynth();
      createSynth.init({ visualObj: visualObj[0] }).then(function () {
        synthControl.setTune(visualObj[0], false, audioParams).then(function () {
          console.log("Audio successfully loaded.")
        }).catch(function (error) {
          console.warn("Audio problem:", error);
        });
      }).catch(function (error) {
        console.warn("Audio problem:", error);
      });
    } else {
      document.querySelector("#audio").innerHTML =
        "Audio is not supported in this browser.";
    }



}
}
