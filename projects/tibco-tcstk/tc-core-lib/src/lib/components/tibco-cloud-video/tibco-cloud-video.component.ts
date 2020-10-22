import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'tc-tibco-cloud-video',
  templateUrl: './tibco-cloud-video.component.html',
  styleUrls: ['./tibco-cloud-video.component.css']
})
export class TibcoCloudVideoComponent implements OnInit {

  @Input() visible: boolean;
  @Input() title: string;
  @Input() label: string;
  @Input() url: string;

  public playing = false;

  constructor(public location: Location) { }

  ngOnInit(): void {
  }

  togglePlaying(status: boolean) {
    this.playing = status;
  }



}
