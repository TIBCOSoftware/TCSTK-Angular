import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LandingPageConfig } from '../models/tc-general-landing-page-config';
import { TcGeneralLandingPageConfigService } from './tc-general-landing-page-config.service';

@Injectable({
  providedIn: 'root'
})

export class TcGeneralLandingPageService {

    constructor(
        private generalLandingPageConfigService: TcGeneralLandingPageConfigService
    ) {
    }

    public getLandingPage = (key: string, uiAppId: string): Observable<LandingPageConfig> => {
        const landingPage = this.generalLandingPageConfigService.getGeneralLandingPageConfig(uiAppId, true, true).pipe(
            map(landingPages => {
                const page = landingPages.landingPage.filter(element => element.key === key )[0];
                return page;
            })            
        )   
        return landingPage;
    }

    public getLandingPageForRole = (roleId: string, uiAppId: string): Observable<LandingPageConfig> => {
        return this.generalLandingPageConfigService.getGeneralLandingPageConfig(uiAppId, true, true).pipe(
            map(landingPages => {
                const candidatePages = landingPages.landingPage.filter(element => element.roles.indexOf(roleId) != -1);
                switch (candidatePages.length) {
                    case 0:
                        return undefined;
                    case 1:
                        return candidatePages[0];
                    default:
                        return candidatePages[0];
                }
            })
        );
    } 
}

