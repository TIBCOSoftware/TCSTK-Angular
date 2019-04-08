import { Injectable } from '@angular/core';
import { LiveAppsService } from '../services/live-apps.service';
import { Roles } from '../models/tc-groups-data';
import { RolesResolver } from '../resolvers/roles.resolver';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { TcGeneralConfigService, TcSharedStateService } from 'tc-core-lib';

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
            return (role.configuration == true);
        })
        return reqRole ? true : false;
    }
}
