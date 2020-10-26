import {AfterContentInit, Component, ContentChildren, ViewChild, OnInit, QueryList, ViewContainerRef} from '@angular/core';
import {TibcoCloudVideoComponent} from '../tibco-cloud-video/tibco-cloud-video.component';


@Component({
  selector: 'tc-tibco-cloud-video-carousel',
  templateUrl: './tibco-cloud-video-carousel.component.html',
  styleUrls: ['./tibco-cloud-video-carousel.component.css']
})
export class TibcoCloudVideoCarouselComponent implements OnInit, AfterContentInit {

  constructor() { }
  @ContentChildren(TibcoCloudVideoComponent) carouselItems: QueryList<TibcoCloudVideoComponent>;
  @ViewChild('customTemplateContainer', { read: ViewContainerRef }) container;

  currentVideo: TibcoCloudVideoComponent;
  videos: TibcoCloudVideoComponent[];
  idx: number = 0;

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if (this.carouselItems && this.carouselItems.length > 0) {
      this.videos = this.carouselItems.toArray();
      this.videos[this.idx].visible = true;
    }
  }

  get last() {
    if (this.idx === (this.videos.length - 1)) {
      return true;
    } else {
      return false;
    }
  }

  get first() {
    return this.idx === 0;
  }

  next() {
    if (this.idx < (this.videos.length - 1)) {
      this.videos[this.idx].visible = false;
      this.videos[this.idx].playing = false;
      this.idx++;
      this.videos[this.idx].visible = true;
    }
  }

  previous() {
    if (this.idx !== 0) {
      this.videos[this.idx].visible = false;
      this.videos[this.idx].playing = false;
      this.idx--;
      this.videos[this.idx].visible = true;
    }
  }

  setSelectedIdx(idx: number) {
    if (idx !== this.idx) {
      this.videos[this.idx].visible = false;
      this.videos[this.idx].playing = false;
      this.idx = idx;
      this.videos[this.idx].visible = true;
    }
  }

}
