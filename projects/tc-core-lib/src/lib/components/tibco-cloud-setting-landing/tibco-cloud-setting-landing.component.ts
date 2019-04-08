import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandingPageConfig, LandingPageItemConfig, GeneralLandingPageConfig } from '../../models/tc-general-landing-page-config';
import { TcGeneralLandingPageConfigService } from '../../services/tc-general-landing-page-config.service';
import { Claim } from '../../models/tc-login';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TibcoCloudNewElementComponent } from '../tibco-cloud-new-element/tibco-cloud-new-element.component';

@Component({
  selector: 'tc-tibco-cloud-setting-landing',
  templateUrl: './tibco-cloud-setting-landing.component.html',
  styleUrls: ['./tibco-cloud-setting-landing.component.css']
})
export class TibcoCloudSettingLandingComponent implements OnInit {

    private claims: Claim;
    private landingPagesConfig: GeneralLandingPageConfig;
    private sandboxId: number;
    private uiAppId: string;

    public landingPages: LandingPageConfig[];
    public selectedWelcomePage: LandingPageConfig;

    constructor(
        private route: ActivatedRoute,
        private generalLandingPageConfigService: TcGeneralLandingPageConfigService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.landingPagesConfig = this.route.snapshot.data.landingPagesConfigHolder;
        this.landingPages = this.landingPagesConfig.landingPage;

        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        this.uiAppId = 'processdiscovery1';
    }

    runSaveFunction(){
        this.generalLandingPageConfigService.updateGeneralLandingPageConfig(this.sandboxId, this.uiAppId, this.landingPagesConfig, this.landingPagesConfig.id).subscribe(
            result => {
                this.snackBar.open('Landing Pages configuration saved', 'OK', {
                    duration: 3000
                });
            },
            err => {
                this.snackBar.open('Error saving Landing Pages configuration', 'OK', {
                    duration: 3000
                });
            }
        );
    }

    runDeleteConfiguration(){
        const pages = this.landingPages;
        pages.forEach(element => {
            if (element == this.selectedWelcomePage){
                const index = pages.indexOf(element, 0);
                pages.splice(index, 1);
                this.selectedWelcomePage = undefined;
            }
        });
    }

    runNewConfiguration = ():void => {

        const dialogRef = this.dialog.open(TibcoCloudNewElementComponent, {
            width: '50%',
            height: '30%',
            maxWidth: '100vw',
            maxHeight: '100vh',
            panelClass: 'tcs-style-dialog',
            data: { resourceType: 'Landing Page' }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const newElement = new LandingPageConfig().deserialize({
                    key: result.id,
                    description: result.name,
                    highlights: [new LandingPageItemConfig(), new LandingPageItemConfig(), new LandingPageItemConfig()]
                });

                this.landingPages.push(newElement);
                this.selectedWelcomePage = newElement;
            }
        });


    }

}
