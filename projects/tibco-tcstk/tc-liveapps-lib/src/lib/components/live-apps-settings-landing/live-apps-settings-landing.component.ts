import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RoleAttribute, TcGeneralLandingPageConfigService, TibcoCloudNewElementComponent, TibcoCloudUploadDialogComponent } from '@tibco-tcstk/tc-core-lib';
import { TcDocumentService } from '../../services/tc-document.service';
import { GeneralLandingPageConfig, LandingPageConfig, LandingPageItemConfig } from '../../models/tc-live-apps-landing-page-config';

/**
 * Configuration page home
 *
 *@example <tcla-live-apps-setting-landing></tcla-live-apps-setting-landing>
 */
@Component({
    selector: 'tcla-live-apps-settings-landing',
    templateUrl: './live-apps-settings-landing.component.html',
    styleUrls: ['./live-apps-settings-landing.component.css']
})
export class LiveAppsSettingsLandingComponent implements OnInit {

    private landingPagesConfig: GeneralLandingPageConfig;
    private sandboxId: number;
    private uiAppId: string;

    public landingPages: LandingPageConfig[];
    public selectedWelcomePage: LandingPageConfig;
    public allRoles: RoleAttribute[];
    public selectedRole: RoleAttribute[];

    constructor(
        private route: ActivatedRoute,
        private generalLandingPageConfigService: TcGeneralLandingPageConfigService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private documentsService: TcDocumentService
    ) { }

    /**
    * @ignore
    */
    ngOnInit() {      
        this.landingPagesConfig = this.route.snapshot.data.landingPagesConfigHolder;
        this.landingPages = this.landingPagesConfig.landingPage;
        this.allRoles = this.route.snapshot.data.allRolesHolder.roles.filter(element => !element.configuration);

        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        this.uiAppId = this.route.snapshot.data.landingPagesConfigHolder.uiAppId;

        // If there is only one landing page selects it automatically
        if (this.landingPages.length == 1) {
            this.selectedWelcomePage = this.landingPages[0];
        }
    }

    /**
     * Save Configuration
     */
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

    /**
     * Delete Configuration
     */
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

    /**
     * New Configuration
     */
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

    /**
     * Helper to Compare Objects
     */
    compareObjects = (o1: string, o2: string): boolean => {
        return o1 === o2;
    }

    public openDialog(imageFormat: string, location: string, index?: number): void {

        const dialogRef = this.dialog.open(TibcoCloudUploadDialogComponent, {
            width: '500px',
            data: { 
                title: 'Upload New ' + location + ' image',
                allowedExtensions: imageFormat,
                location: location,
                index: index
             }
        });

        dialogRef.componentInstance.fileevent.subscribe(($e) => {
            this.uploadFile($e.file, location, index);
        })

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    public uploadFile(file: File, location: string, index?: number) {
        if (file) {
            switch (location) {
                case 'background':
                    this.selectedWelcomePage.backgroundURL = file.name;
                    break;
                case 'hightlight':
                    this.selectedWelcomePage.highlights[index].iconURL = file.name;
                    break;
                default:
                    break;
            }
            
            this.documentsService.uploadDocument('orgFolders', this.uiAppId, this.sandboxId, file, location + '%2F' + file.name, '')
                .subscribe(
                    val => {
                        console.log("*********** DONE")
                    },
                    error => { console.log('error', error.errorMsg) }); //); this.errorMessage = 'Error uploading state icon: ' +
        }
    }


}
