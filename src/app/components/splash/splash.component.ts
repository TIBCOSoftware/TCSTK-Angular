import { Component, OnInit } from '@angular/core';
import {LandingPageConfig, LandingPageItemConfig} from '@tibco-tcstk/tc-core-lib';

@Component({
  selector: 'laapp-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  points: LandingPageItemConfig[] = [];

  constructor() {
    const pp = new LandingPageItemConfig().deserialize({
      iconURL : 'ic-graph',
      title: 'Streamline',
      content: 'Reduce losses and avoid adverse risk events through business processes, controls, and analytics'
    })
    const pp2 = new LandingPageItemConfig().deserialize({
      iconURL : 'ic-community',
      title: 'Collaborate',
      content: 'A simple yet refined user experience to foster collaboration via case management, interaction feeds, attached documents, etc.'
    })
    const pp3 = new LandingPageItemConfig().deserialize({
      iconURL : 'ic-documentation',
      title: 'Track',
      content: 'Provide in-depth, real-time visibility into the risk investigation process - e.g. high priority cases; action audit trails, etc.'
    })

    this.points.push(pp);
    this.points.push(pp2);
    this.points.push(pp3);

  }

  ngOnInit() {
  }

}
