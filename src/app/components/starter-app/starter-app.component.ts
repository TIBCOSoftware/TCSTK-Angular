import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'laapp-starter-app',
  templateUrl: './starter-app.component.html',
  styleUrls: ['./starter-app.component.css']
})
export class StarterAppComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
