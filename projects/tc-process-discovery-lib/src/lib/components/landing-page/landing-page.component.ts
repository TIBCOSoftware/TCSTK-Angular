import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TcCoreCommonFunctions, TcGeneralLandingPageConfigService, LandingPageItemConfig } from 'tc-core-lib';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'tcpd-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

    public title: string;
    public subtitle: string;
    public backgroundImage: string;
    public pointsJSON: string;
    public highlights: LandingPageItemConfig[];

    constructor(
        private location: Location,
        private router: Router,
        private landingPageService: TcGeneralLandingPageConfigService
    ) { }

    ngOnInit() {
        this.landingPageService.getLandingPage('GENERAL', 'processdiscovery1').pipe(
            map(result => {
                this.title = result.title;
                this.subtitle = result.subtitle;
                this.backgroundImage = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, result.backgroundURL);

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
            })
        ).subscribe();

    }

    public moveHome = (): void => {
        this.router.navigate(['/starterApp/pd/case-view']);
    }

}
