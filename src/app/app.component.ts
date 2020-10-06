import {Component, OnInit} from '@angular/core';
import {LiveAppsService, LoginContext, TcAppDefinitionService} from '@tibco-tcstk/tc-liveapps-lib';
import {LogLevel, LogService} from '@tibco-tcstk/tc-core-lib';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {CustomConfig1} from '../models/customConfig1';

@Component({
  selector: 'laapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tc-liveapps';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private location: Location, private liveapps: LiveAppsService, private logger: LogService ) {
    logger.level = LogLevel.Debug;
    logger.info('My Cloud Starter Online...');
}

  ngOnInit(): void {
  }
}
