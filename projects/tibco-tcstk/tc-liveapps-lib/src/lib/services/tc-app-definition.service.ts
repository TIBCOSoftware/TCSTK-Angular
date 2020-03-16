import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LiveAppsService} from '../services/live-apps.service';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Claim} from '@tibco-tcstk/tc-core-lib';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {CaseType, CaseTypesList, CaseTypeState, Process} from '../models/liveappsdata';

@Injectable({
  providedIn: 'root'
})
export class TcAppDefinitionService {

  // This service provides access to common Live Apps definitions such as claims and types data

  private maxCaseTypes = 1000;
  // claims
  private _claims = new ReplaySubject<Claim>(1);
  private currentClaim: Claim = undefined;
  readonly _claims$ = this._claims.asObservable();

  // types
  private _caseTypes = new ReplaySubject<CaseType[]>(1);
  private currentCaseTypes: CaseType[] = undefined;
  readonly _caseTypes$ = this._caseTypes.asObservable();

  constructor(private http: HttpClient, private liveAppsService: LiveAppsService) {
  }

  private getCaseTypeData(sandboxId: number): Observable<CaseTypesList> {
    return this.liveAppsService.getCaseTypes(sandboxId, undefined, this.maxCaseTypes, true).pipe(
      tap(resTypes => {
        // add formTags
        // Format of tag is <applicationName>.<applicationInternalName>.<processType>.<processName>
        resTypes.casetypes.map((type: CaseType) => {
          if (type.creators) {
            type.creators.map((process: Process) => {
              process.formTag = type.applicationName + '.' + type.applicationInternalName + '.creator.' + process.name;
            });
          }
          if (type.actions) {
            type.actions.map((process: Process) => {
              process.formTag = type.applicationName + '.' + type.applicationInternalName + '.action.' + process.name;
            });
          }
        });
      })
    );
  }

  public loadFormResources = () => {

    const frameworkJS = document.createElement('script');
    frameworkJS.src = '/apps/app-cdn/tibco/framework_ext/1.0.0/framework_ext.nocache.js';
    frameworkJS.type = 'text/javascript';
    frameworkJS.async = true;
    frameworkJS.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(frameworkJS);

    const elementsEs5JS = document.createElement('script');
    elementsEs5JS.src = '/apps/app-cdn/tibco/elements/elements-es5.js';
    // elementsEs5JS.type = 'modul';
    elementsEs5JS.async = true;
    elementsEs5JS.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(elementsEs5JS);

    const elementsEs2015JS = document.createElement('script');
    elementsEs2015JS.src = '/apps/app-cdn/tibco/elements/elements-es2015.js';
    elementsEs2015JS.type = 'module';
    elementsEs2015JS.async = true;
    elementsEs2015JS.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(elementsEs5JS);

    const elementsCSS = document.createElement('link');
    elementsCSS.href = '/apps/app-cdn/tibco/elements/elements.css';
    elementsCSS.rel = 'stylesheet';
    elementsCSS.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(elementsCSS);

    const fontCSS = document.createElement('link');
    fontCSS.href = '/apps/app-cdn/tibco/fonts/Source_Sans_Pro/font.css';
    fontCSS.rel = 'stylesheet';
    fontCSS.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(fontCSS);

    const TfMaterial = document.createElement('link');
    TfMaterial.href = '/apps/app-cdn/tibco/framework_ext/1.0.0/TfMaterial.min.css';
    TfMaterial.rel = 'stylesheet';
    TfMaterial.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(TfMaterial);
  }

  public refresh(): Observable<any> {
    this.loadFormResources();
    const claims$ = this.liveAppsService.getClaims().pipe(
      map(claimVal => {
        claimVal.sandboxes.forEach(sandbox => {
          if (sandbox.type === 'Production') {
            claimVal.primaryProductionSandbox = sandbox;
          }
        });
        return claimVal;
      })
    );

    // initialize all data
    return claims$.pipe(
      tap((response: Claim) => {
        this.currentClaim = response;
        this._claims.next(response);
      }),
      switchMap((response: Claim) => {
        return this.getCaseTypeData(Number(response.primaryProductionSandbox.id)).pipe(
          map(resTypes => {
            this.currentCaseTypes = resTypes.casetypes;
            this._caseTypes.next(resTypes.casetypes);
            return response;
          })
        );
      }),
      catchError(err => {
        // todo: currently on error - I am allowing the page to continue to load page so that login can be displayed
        // this could cause an issue with other resolvers failing.
        return of(undefined);
      })
    );
  }

  // public getters

  // claims
  public get claims$() {
    return this._claims.asObservable();
  }

  public get claims() {
      return this.currentClaim;
  }

  public get sandboxId() {
    return Number(this.currentClaim.primaryProductionSandbox.id);
  }

  public get userId() {
    return this.currentClaim.username;
  }

  public get email() {
    return this.currentClaim.email;
  }

  public get firstName() {
    return this.currentClaim.firstName;
  }

  public get lastName() {
    return this.currentClaim.lastName;
  }

  public get subscriptionId() {
    return this.currentClaim.subscriptionId;
  }

  // caseTypes
  public get caseTypes$() {
    return this._caseTypes.asObservable();
  }

  public get caseTypes(): CaseType[] {
    return this.currentCaseTypes;
  }

  public getCaseTypeByAppId(appId: string): CaseType {
    return this.currentCaseTypes.find((ctype: CaseType) => {
      return ctype.applicationId === appId;
    });
  }

  public getCaseTypeByName(name: string): CaseType {
    return this.currentCaseTypes.find((ctype: CaseType) => {
      return ctype.name === name;
    });
  }

  public getCaseTypeByApplicationName(applicationName: string): CaseType {
    return this.currentCaseTypes.find((ctype: CaseType) => {
      return ctype.applicationName === applicationName;
    });
  }

  public getCaseTypeByInternalName(applicationInternalName: string): CaseType {
    return this.currentCaseTypes.find((ctype: CaseType) => {
      return ctype.applicationInternalName === applicationInternalName;
    });
  }

  public getStateByName(appId: string, name: string): CaseTypeState {
    return this.getCaseTypeByAppId(appId).states.find((state: CaseTypeState) => {
      return state.value === name;
    });
  }

  public getStateById(appId: string, id: string): CaseTypeState {
    return this.getCaseTypeByAppId(appId).states.find((state: CaseTypeState) => {
      return state.id === id;
    });
  }

  public getCreatorById(appId: string, id: string): Process {
    return this.getCaseTypeByAppId(appId).creators.find((creator: Process) => {
      return creator.id === id;
    });
  }

  public getCreatorByName(appId: string, name: string): Process {
    return this.getCaseTypeByAppId(appId).creators.find((creator: Process) => {
      return creator.name === name;
    });
  }

  public getCreatorByFormTag(appId: string, formTag: string): Process {
    return this.getCaseTypeByAppId(appId).creators.find((creator: Process) => {
      return creator.formTag === formTag;
    });
  }

  public getActionById(appId: string, id: string): Process {
    return this.getCaseTypeByAppId(appId).actions.find((action: Process) => {
      return action.id === id;
    });
  }

  public getActionByName(appId: string, name: string): Process {
    return this.getCaseTypeByAppId(appId).actions.find((action: Process) => {
      return action.name === name;
    });
  }

  public getActionByFormTag(appId: string, formTag: string): Process {
    return this.getCaseTypeByAppId(appId).actions.find((action: Process) => {
      return action.formTag === formTag;
    });
  }

}

