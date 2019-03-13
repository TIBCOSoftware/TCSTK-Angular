import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tcpd-setting-menu-entry',
    templateUrl: './setting-menu-entry.component.html',
    styleUrls: ['./setting-menu-entry.component.css']
})
export class SettingMenuEntryComponent implements OnInit {

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
