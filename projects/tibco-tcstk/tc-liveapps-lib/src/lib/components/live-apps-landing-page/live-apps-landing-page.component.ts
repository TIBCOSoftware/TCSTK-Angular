import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LandingPageItemConfig, TcGeneralLandingPageService, ActionButtonConfig, RouteAction } from '@TIBCOSoftware/tc-core-lib';
import { Router } from '@angular/router';

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

    @Input() uiAppId: string;
    @Input() roleId: string;
    @Output() getStartedEvent: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();

    public title: string;
    public subtitle: string;
    public backgroundImage: string;
    public topMargin: string;
    public highlights: LandingPageItemConfig[];
    public actionButtons: ActionButtonConfig[];

    public navigateURL: string;

    constructor(
        private router: Router,
        private landingPageService: TcGeneralLandingPageService
    ) { }

    ngOnInit() {

        this.landingPageService.getLandingPageForRole(this.roleId, this.uiAppId).subscribe(
            landingPage => {
                if (landingPage !== undefined) {
                    this.title = landingPage.title;
                    this.subtitle = landingPage.subtitle;
                    this.backgroundImage = (landingPage.backgroundURL !== '' ? '/webresource/orgFolders/' + this.uiAppId + '/background/' + landingPage.backgroundURL : '');
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

                    this.actionButtons = new Array();
                    this.actionButtons.push(new ActionButtonConfig().deserialize({text: 'Get started', route: landingPage.homeRoute}));

                    this.navigateURL = landingPage.homeRoute;
                } else {
                    this.router.navigate(['errorHandler/NO_LANDING/NO_LANDING']);
                }
            }
        );
    }

    public getStartedClick = (route: RouteAction): void => {
        this.getStartedEvent.emit(route);
    }

}
