import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleAttribute } from 'tc-core-lib';

@Component({
    selector: 'tcla-live-apps-role-switcher',
    templateUrl: './live-apps-role-switcher.component.html',
    styleUrls: ['./live-apps-role-switcher.component.css']
})
export class LiveAppsRoleSwitcherComponent implements OnInit {

    @Input() roles: RoleAttribute[];
    @Output() changeRoleEvent: EventEmitter<RoleAttribute> = new EventEmitter<RoleAttribute>();

    public selectedRole: RoleAttribute;
    constructor() { }

    ngOnInit() {
    }

    public selectRole = (role) => {
        this.changeRoleEvent.emit(role);
    }

}
