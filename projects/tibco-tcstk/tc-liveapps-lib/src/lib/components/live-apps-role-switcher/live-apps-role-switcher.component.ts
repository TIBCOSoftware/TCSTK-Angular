import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleAttribute } from '@tibcosoftware/tc-core-lib';

/**
 * Switch roles
 *
 *@example <tcla-live-apps-role-switcher></tcla-live-apps-role-switcher>
 */

@Component({
    selector: 'tcla-live-apps-role-switcher',
    templateUrl: './live-apps-role-switcher.component.html',
    styleUrls: ['./live-apps-role-switcher.component.css']
})
export class LiveAppsRoleSwitcherComponent implements OnInit {

  /**
   * Roles - The users current roles
   */
  @Input() roles: RoleAttribute[];

  /**
   * RoleAttribute - selected Role - check with MC
   */
  @Input() selectedRole: RoleAttribute;

  /**
   * ~event changeRoleEvent : Role selected
   * ~payload RoleAttribute : RoleAttribute object emitted when role is c hanged by switcher
   */
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
