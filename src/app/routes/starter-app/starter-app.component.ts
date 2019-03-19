import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LiveAppsService} from 'tc-liveapps-lib';
import {GeneralConfig} from 'tc-core-lib';

@Component({
  selector: 'laapp-starter-app',
  templateUrl: './starter-app.component.html',
  styleUrls: ['./starter-app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StarterAppComponent implements OnInit {

  public config: GeneralConfig;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.config = this.route.snapshot.data.config;
    // this.router.navigate(['/starterApp/home'], {});
  }

}
