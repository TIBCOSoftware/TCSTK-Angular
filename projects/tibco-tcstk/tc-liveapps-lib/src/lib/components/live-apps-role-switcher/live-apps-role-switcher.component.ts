import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleAttribute } from '@tibco-tcstk/tc-core-lib';

@Component({
    selector: 'tcla-live-apps-role-switcher',
    templateUrl: './live-apps-role-switcher.component.html',
    styleUrls: ['./live-apps-role-switcher.component.css']
})
export class LiveAppsRoleSwitcherComponent implements OnInit {

    @Input() roles: RoleAttribute[];
    @Input() selectedRole: RoleAttribute;
    @Output() changeRoleEvent: EventEmitter<RoleAttribute> = new EventEmitter<RoleAttribute>();

    constructor() { }

    ngOnInit() {
    }

    public selectRole = (role: RoleAttribute) => {
        this.changeRoleEvent.emit(role);
    }

    compareObjects = (o1: RoleAttribute, o2: RoleAttribute): boolean => {
        return o1.id === o2.id;
    }
}
