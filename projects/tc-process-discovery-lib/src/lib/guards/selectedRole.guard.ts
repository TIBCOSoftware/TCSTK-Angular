// This guard will redirect to empty when no role has been selected.

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TcRolesService } from 'tc-liveapps-lib';

@Injectable()
export class SelectedRoleGuard implements CanActivate {

    constructor(private router: Router, private rolesServices: TcRolesService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentRole = this.rolesServices.getCurrentRole();
        if (currentRole.id != undefined) {
            // delegate handling login/auth to Tibco Cloud since WRP resources are protected anyway
            return true;
        } else {
            this.router.navigate(['/'], { });
        }
    }
}
