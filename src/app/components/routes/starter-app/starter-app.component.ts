import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { TibcoCloudNavbarComponent } from '../../tibco-cloud-components/tibco-cloud-navbar/tibco-cloud-navbar.component';

@Component({
  selector: 'app-starter-app',
  templateUrl: './starter-app.component.html',
  styleUrls: ['./starter-app.component.css']
})
export class StarterAppComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
