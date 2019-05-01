import { Injectable } from '@angular/core';
import {Roles, RouteAccessControlConfig} from '../models/tc-groups-data';
import { RoleAttribute } from '@tibco-tcstk/tc-core-lib';

@Injectable({
    providedIn: 'root'
})
export class TcRolesService {
    
    constructor() { }

    currentRole = new RoleAttribute();

    private hasRoleAccess = (roleReq: string, roles: Roles): boolean => {
        const reqRole = roles.roles.find(role => {
            return (role.id === roleReq);
        })
        return reqRole ? true : false;
    }

    private hasButtonAccess = (buttonId: string, roles: Roles, access: RouteAccessControlConfig): boolean => {
      // check which role required
      const reqRole = access.buttons.find(buttonRec => {
        return (buttonId === buttonRec.buttonId);
      });
      if (!reqRole) {
        // nothing defined so return true;
        return true;
      } else {
        const hasRole = roles.roles.find(role => {
          return (role.id === reqRole.requiredRoleId);
        });
        return hasRole ? true : false;
      }
    }

    checkRole(roleId: string, roles: Roles): boolean {
        return this.hasRoleAccess(roleId, roles);
    }

    checkButton(buttonId: string, roles: Roles, access: RouteAccessControlConfig): boolean {
        return this.hasButtonAccess(buttonId, roles, access);
    }

    amIConfigurator = (roles: Roles): boolean => {
        const reqRole = roles.roles.find(role => {
            return (role.configuration === true);
        })
        return reqRole ? true : false;
    }
    getCurrentRole = (): RoleAttribute => {
        return this.currentRole;
    }

    setCurrentRole = (role: RoleAttribute): void => {
        this.currentRole = role;
    }
}
