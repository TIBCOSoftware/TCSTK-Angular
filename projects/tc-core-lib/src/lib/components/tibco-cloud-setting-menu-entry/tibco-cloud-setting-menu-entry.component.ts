import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tc-tibco-cloud-setting-menu-entry',
    templateUrl: './tibco-cloud-setting-menu-entry.component.html',
    styleUrls: ['./tibco-cloud-setting-menu-entry.component.css']
})
export class TibcoCloudSettingMenuEntryComponent implements OnInit {

    @Input() icon: string;
    @Input() title: string;
    @Input() options: string[];
    @Output() configureOption: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    viewButtonClick(id) {
        this.configureOption.emit(id);
    }

    ngOnInit() {

    }

}
