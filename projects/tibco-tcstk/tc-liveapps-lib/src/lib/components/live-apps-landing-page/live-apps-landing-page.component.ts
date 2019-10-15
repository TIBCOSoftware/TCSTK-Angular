import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TcCoreCommonFunctions, LandingPageItemConfig, TcGeneralLandingPageService } from '@tibco-tcstk/tc-core-lib';
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
    public topMargin: string;
    public highlights: LandingPageItemConfig[];

    private navigateURL: string;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private landingPageService: TcGeneralLandingPageService,
        private rolesService: TcRolesService
    ) { }

    ngOnInit() {
        const uiAppId = this.route.snapshot.data.generalConfigHolder.uiAppId;
        const roleId = this.route.snapshot.data.activeRoleHolder.id;

        this.landingPageService.getLandingPageForRole(roleId, uiAppId).subscribe(
            landingPage => {
                if (landingPage !== undefined) {
                    this.title = landingPage.title;
                    this.subtitle = landingPage.subtitle;
                    this.backgroundImage = (landingPage.backgroundURL !== '' ? '/webresource/orgFolders/' + this.route.snapshot.data.landingPagesConfigHolder.uiAppId + '/background/' + landingPage.backgroundURL : '');
                    this.topMargin = landingPage.topMargin ? landingPage.topMargin + 'px' : '0px';
                    this.highlights = new Array();
                    this.highlights.push(new LandingPageItemConfig().deserialize({
                        title: landingPage.highlights[0].title,
                        content: landingPage.highlights[0].content,
                        iconURL: landingPage.highlights[0].iconURL
                    }));

                    this.highlights.push(new LandingPageItemConfig().deserialize({
                        title: landingPage.highlights[1].title,
                        content: landingPage.highlights[1].content,
                        iconURL: landingPage.highlights[1].iconURL
                    }));

                    this.highlights.push(new LandingPageItemConfig().deserialize({
                        title: landingPage.highlights[2].title,
                        content: landingPage.highlights[2].content,
                        iconURL: landingPage.highlights[2].iconURL
                    }));

                    this.navigateURL = landingPage.homeRoute;
                } else {
                    this.router.navigate(['errorHandler/NO_ROLE/NO_ROLE']);
                }
            }
        );
    }

    public moveHome = (): void => {
        this.router.navigate([this.navigateURL]);
    }

}
