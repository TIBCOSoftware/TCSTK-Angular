import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'laapp-splash-pd',
  templateUrl: './splash-pd.component.html',
  styleUrls: ['./splash-pd.component.css']
})
export class SplashPDComponent implements OnInit {

  pointsJSON: string;

  constructor() {
    var myPoints = new Array();
    var pp = {
      pic : '/assets/images/pd_trans.png',
      title: 'Transparency',
      subTitle: 'Discover Your Business Processes from Operational Systems'
    }
    var pp2 = {
      pic : '/assets/images/pd_comp.png',
      title: 'Compliance',
      subTitle: 'Apply Process Mining Analysis using Data Science & Visual Analytics'
    }
    var pp3 = {
      pic : '/assets/images/pd_ease.png',
      title: 'Ease of Use',
      subTitle: 'Deliver use case specific Cloud Applications to Business Users'
    }
    myPoints.push(pp);
    myPoints.push(pp2);
    myPoints.push(pp3);

    this.pointsJSON = JSON.stringify(myPoints);
    console.log('Points JSON: ' + this.pointsJSON);



  }

  ngOnInit() {
  }

}
