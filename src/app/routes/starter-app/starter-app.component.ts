import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LiveAppsService} from '@tibco-tcstk/tc-liveapps-lib';
import {GeneralConfig} from '@tibco-tcstk/tc-core-lib';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'laapp-starter-app',
  templateUrl: './starter-app.component.html',
  styleUrls: ['./starter-app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StarterAppComponent implements OnInit {

  public config: GeneralConfig;

  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.config = this.route.snapshot.data.config;
    this.titleService.setTitle(this.config.browserTitle ? this.config.browserTitle : 'Tibco Cloud Starters');
    // this.router.navigate(['/starterApp/home'], {});
  }

}
