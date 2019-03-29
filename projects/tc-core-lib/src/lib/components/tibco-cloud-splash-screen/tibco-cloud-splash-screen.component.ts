import {Component, Input, OnInit} from '@angular/core';
import {TcCoreCommonFunctions} from '../../common/tc-core-common-functions';
import {Location} from '@angular/common';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'tc-tibco-cloud-splash-screen',
  templateUrl: 'tibco-cloud-splash-screen.component.html',
  styleUrls: ['tibco-cloud-splash-screen.component.css'],
})
export class TibcoCloudSplashScreenComponent implements OnInit {

  @Input() title: string;
  @Input() subTitle: string;
  @Input() backGroundImage: string;
  @Input() pagePointsJSON: string;
  public pagePoints = new Array();

  public pic_urls = new Array();
  public loc;

  public backGroundImageURL: string;

  constructor(private location: Location) {
    this.loc = location;
  }

  onStartedClick(): void {
    // this.dialogRef.close();
    console.log('Redirect to the home page.. ');
  }


  ngOnInit(): void {


    console.log('JSON to Parse: ' + this.pagePointsJSON);
    this.backGroundImageURL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.loc, this.backGroundImage);
    this.pagePoints = JSON.parse(this.pagePointsJSON);
    for(var page of this.pagePoints){
      console.log('URL ' + page.pic);
      this.pic_urls.push(TcCoreCommonFunctions.prepareUrlForStaticResource(this.loc, page.pic));
    }



    console.log('Opening Splash Screen...');

  }

}
