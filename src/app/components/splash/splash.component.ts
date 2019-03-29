import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'laapp-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  pointsJSON: string;

  constructor() {
    var myPoints = new Array();
    var pp = {
      pic : '/assets/images/ic-graph.svg',
      title: 'Streamline',
      subTitle: 'Reduce losses and avoid adverse risk events through business processes, controls, and analytics'
    }
    var pp2 = {
      pic : '/assets/images/ic-community.svg',
      title: 'Collaborate',
      subTitle: 'A simple yet refined user experience to foster collaboration via case management, interaction feeds, attached documents, etc.'
    }
    var pp3 = {
      pic : '/assets/images/ic-documentation.svg',
      title: 'Track',
      subTitle: 'Provide in-depth, real-time visibility into the risk investigation process - e.g. high priority cases; action audit trails, etc.'
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
