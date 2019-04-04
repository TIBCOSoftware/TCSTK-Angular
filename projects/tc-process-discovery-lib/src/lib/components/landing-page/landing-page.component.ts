import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TcCoreCommonFunctions } from 'tc-core-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'tcpd-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

    public title: string;
    public subtitle: string;
    public backgroundImage: string;
    public pointsJSON: string;

  constructor(
      private location: Location,
      private router: Router
    ) { }

  ngOnInit() {
      this.title = 'Welcome to your Discover App';
      this.subtitle = 'Discover, Understand, and Improve Your Business Processes Based on Operational Systems Logs';
      this.backgroundImage = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/images/background_clouds.png');
      
      let myPoints = new Array();
      const pp = {
          pic: TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/images/pd_comp.png'),
          title: 'Learn',
          subTitle: 'Discover processes and drive actionable insights from your data - e.g. tackle performance hotspots, compliance outliers, and capture best practices.'
      }
      const pp2 = {
          pic: TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/images/pd_trans.png'),
          title: 'Improve',
          subTitle: 'Raise out-of-compliance cases or process improvement requests. Collaborate with other teams to swiftly improve processes.'
      }
      const pp3 = {
          pic: TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/images/pd_ease.png'),
          title: 'Predict',
          subTitle: 'Analyze performance with visual analytics and anticipate process bottlenecks with predictive analytics.'
      }
      myPoints.push(pp); 
      myPoints.push(pp2);
      myPoints.push(pp3);

      this.pointsJSON = JSON.stringify(myPoints);
  }

    public moveHome = ():void =>{
        this.router.navigate(['/starterApp/pd/case-view']);
    }

}
