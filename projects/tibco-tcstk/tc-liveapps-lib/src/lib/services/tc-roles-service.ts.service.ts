import { Injectable } from '@angular/core';
import { Roles } from '../models/tc-groups-data';
import { RoleAttribute } from '@tibco-tcstk/tc-core-lib';

@Injectable({
    providedIn: 'root'
})
export class TcRolesService {
    
    constructor() { }

    private hasAccess = (roleReq: string, roles: Roles): boolean => {
        const reqRole = roles.roles.find(role => {
            return (role.id === roleReq);
        })
        return reqRole ? true : false;
    }

    checkRole(roleId: string, roles: Roles): boolean {
        return this.hasAccess(roleId, roles);
    }

    amIConfigurator = (roles: Roles): boolean => {
        const reqRole = roles.roles.find(role => {
            return (role.configuration === true);
        })
        return reqRole ? true : false;
    }

    currentRole = new RoleAttribute();
    getCurrentRole = (): RoleAttribute => {
        return this.currentRole;
    }

    setCurrentRole = (role: RoleAttribute): void => {
        this.currentRole = role;
    }
}
