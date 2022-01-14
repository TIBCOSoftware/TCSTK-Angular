import { Injectable } from '@angular/core';
import {Roles, RouteAccessControlConfigurationElement} from '../models/tc-groups-data';
import { RoleAttribute } from '@tibcosoftware/tc-core-lib';

@Injectable({
    providedIn: 'root'
})
export class TcRolesService {

    constructor() { }

    private currentRole = undefined;

    private hasRoleAccess = (roleReq: string, roles: Roles): boolean => {
        const reqRole = roles.roles.find(role => {
            return (role.id === roleReq);
        })
        return reqRole ? true : false;
    }

    private hasButtonAccess = (buttonId: string, access: RouteAccessControlConfigurationElement): boolean => {
      return access.buttonIds.indexOf(buttonId) > -1;
    }

    checkRole(roleId: string, roles: Roles): boolean {
        return this.hasRoleAccess(roleId, roles);
    }

    checkButton(buttonId: string, access: RouteAccessControlConfigurationElement): boolean {
        return this.hasButtonAccess(buttonId, access);
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
