import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TcSharedStateService } from './tc-shared-state.service';
import { GeneralLandingPageConfig, LandingPageConfig } from '../models/tc-general-landing-page-config';
import { SharedStateContent, SharedStateEntry, SharedStateList } from '../models/tc-shared-state';
import { TcCoreCommonFunctions } from '../common/tc-core-common-functions';

@Injectable({
  providedIn: 'root'
})

export class TcGeneralLandingPageConfigService {

    constructor(
        private sharedStateService: TcSharedStateService
    ) {
    }

    public createGeneralLandingPageConfig(sandboxId: number, uiAppId: string, generalLandingPageConfig: GeneralLandingPageConfig) {
        const ssName = uiAppId + '.general.landing.page.config.tibcolabs.client.context.PUBLIC';
        const content: SharedStateContent = new SharedStateContent();
        content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(generalLandingPageConfig));

        return this.sharedStateService.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
            .pipe(
                map(value => value)
            );
    }

    public getGeneralLandingPageConfig(uiAppId: string, useCache: boolean, flushCache: boolean): Observable<GeneralLandingPageConfig> {
        // if useCache is false this will trigger the service to update the cached version with latest
        const ssName = uiAppId + '.general.landing.page.config.tibcolabs.client.context.PUBLIC';

        return this.sharedStateService.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
            .pipe(
                map(value => {
                    if (value.sharedStateEntries.length > 0) {
                        const ssresult = new GeneralLandingPageConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
                        ssresult.id = value.sharedStateEntries[0].id;
                        return ssresult;
                    } else {
                        return undefined;
                    }
                }
                )
            );
    }

    public updateGeneralLandingPageConfig(sandboxId: number, uiAppId: string, generalLandingPageConfig: GeneralLandingPageConfig, id: string) {
        const ssName = uiAppId + '.general.landing.page.config.tibcolabs.client.context.PUBLIC';
        const content: SharedStateContent = new SharedStateContent();
        content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(generalLandingPageConfig));
        const entry: SharedStateEntry = new SharedStateEntry();
        entry.content = content;
        entry.sandboxId = sandboxId;
        entry.name = ssName;
        entry.type = 'PUBLIC';
        entry.id = id;
        const ssList: SharedStateList = new SharedStateList();
        ssList.sharedStateEntries = [];
        ssList.sharedStateEntries.push(entry);

        return this.sharedStateService.updateSharedState(ssList.sharedStateEntries)
            .pipe(
                map(value => {
                    // flush the cache
                    this.getGeneralLandingPageConfig(uiAppId, true, true).subscribe();
                    return new GeneralLandingPageConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
                })
            );
    }
}

