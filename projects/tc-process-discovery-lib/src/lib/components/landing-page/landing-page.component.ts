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
      this.title = 'Welcome to Project Discover';
      this.subtitle = 'Process Intelligence as a Service';
      this.backgroundImage = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, '/assets/images/background_clouds.png');
      
      let myPoints = new Array();
      const pp = {
          pic: TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, '/assets/images/pd_trans.png'),
          title: 'Transparency',
          subTitle: 'Discover Your Business Processes from Operational Systems'
      }
      const pp2 = {
          pic: TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, '/assets/images/pd_comp.png'),
          title: 'Compliance',
          subTitle: 'Apply Process Mining Analysis using Data Science & Visual Analytics'
      }
      const pp3 = {
          pic: TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, '/assets/images/pd_ease.png'),
          title: 'Ease of Use',
          subTitle: 'Deliver use case specific Cloud Applications to Business Users'
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
