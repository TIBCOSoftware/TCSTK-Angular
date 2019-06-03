import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TcCoreCommonFunctions, TcGeneralLandingPageConfigService, LandingPageItemConfig } from '@tibco-tcstk/tc-core-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TcRolesService } from '../../services/tc-roles-service.ts.service';


/**
 * Landing page
 *
 * This component allows a configurable landing page on a per role basis
 *
 * @example <tcla-live-apps-landing-page></tcla-live-apps-landing-page>
 */
@Component({
    selector: 'tcla-live-apps-landing-page',
    templateUrl: './live-apps-landing-page.component.html',
    styleUrls: ['./live-apps-landing-page.component.css']
})
export class LiveAppsLandingPageComponent implements OnInit {

    public title: string;
    public subtitle: string;
    public backgroundImage: string;
    public highlights: LandingPageItemConfig[];
    
    private navigateURL: string;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private landingPageService: TcGeneralLandingPageConfigService,
        private rolesService: TcRolesService
    ) { }

    ngOnInit() {
        const uiAppId = this.route.snapshot.data.generalConfigHolder.uiAppId;
        const rolesIds = this.route.snapshot.data.rolesHolder.roles.filter(element => !element.configuration).map(a => a.id);

        if (rolesIds.length === 0) {
            this.router.navigate(['errorHandler/NO_ROLE/NO_ROLE']);
        } else {
            this.landingPageService.getLandingPageForRoles(rolesIds, uiAppId).pipe(
                map(result => {
                    this.title = result.title;
                    this.subtitle = result.subtitle;
                    this.backgroundImage = (result.backgroundURL != '' ? TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, result.backgroundURL) : '');

                    this.highlights = new Array();
                    this.highlights.push(new LandingPageItemConfig().deserialize({
                        title: result.highlights[0].title,
                        content: result.highlights[0].content,
                        iconURL: TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, result.highlights[0].iconURL)
                    }));

                    this.highlights.push(new LandingPageItemConfig().deserialize({
                        title: result.highlights[1].title,
                        content: result.highlights[1].content,
                        iconURL: TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, result.highlights[1].iconURL)
                    }));

                    this.highlights.push(new LandingPageItemConfig().deserialize({
                        title: result.highlights[2].title,
                        content: result.highlights[2].content,
                        iconURL: TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, result.highlights[2].iconURL)
                    }));

                    this.navigateURL = result.homeRoute;

                    // Set the role
                    const workingRoleId = result.roles.filter(element => rolesIds.some(r => element.indexOf(r) >= 0));
                    const workingRole = this.route.snapshot.data.generalConfigHolder.roles.filter(element => element.id === workingRoleId[0])[0];
                    this.rolesService.setCurrentRole(workingRole);

                })
            ).subscribe();
        }
    }

    public moveHome = (): void => {
        this.router.navigate([this.navigateURL]);
    }

}
