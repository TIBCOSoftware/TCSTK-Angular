import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LiveAppsService} from '../services/live-apps.service';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Claim, TcCoreCommonFunctions, TcCoreConfigService} from '@tibco-tcstk/tc-core-lib';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {CaseType, CaseTypesList, CaseTypeState, Process, UserInfo} from '../models/liveappsdata';
import {Location} from '@angular/common';
import {Group, Groups} from '../models/tc-groups-data';
import {AppConfig} from '../models/appConfig';

export const maxGroups = 1000;
export const maxUsers = 1000;

@Injectable({
  providedIn: 'root'
})
export class TcAppDefinitionService {

  // This service provides access to common Live Apps definitions such as claims and types data

  // application config
  private _appConfig = new ReplaySubject<AppConfig>(1);
  private currentAppConfig: AppConfig = undefined;

  private maxCaseTypes = 1000;
  // claims
  private _claims = new ReplaySubject<Claim>(1);
  private currentClaim: Claim = undefined;
  private isAdminUser: boolean;
  readonly _claims$ = this._claims.asObservable();

  // types
  private _caseTypes = new ReplaySubject<CaseType[]>(1);
  private currentCaseTypes: CaseType[] = undefined;
  readonly _caseTypes$ = this._caseTypes.asObservable();

  // users
  private _users = new ReplaySubject<UserInfo[]>();
  private currentUsers: UserInfo[] = undefined;

  // groups
  private _groups = new ReplaySubject<Group[]>(1);
  private currentGroups: Group[] = undefined;
  private currentUsersGroups: Group[] = undefined;
  readonly _groups$ = this._groups.asObservable();

  constructor(private http: HttpClient, private liveAppsService: LiveAppsService, private location: Location, private tcConfig: TcCoreConfigService) {
  }

  private getConfig(): Observable<AppConfig> {
    return this.http.get('assets/config/appConfig.json').pipe(
      map((config: AppConfig) => config)
    );
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

  private getUsersData(sandboxId: number): Observable<UserInfo[]> {
    return this.liveAppsService.getUsers(sandboxId, maxUsers).pipe(
      map((users: UserInfo[]) => {
        return users;
      })
    );
  }

  private getGroupsData(sandboxId: number): Observable<Group[]> {
    return this.liveAppsService.getGroups(sandboxId, maxGroups, false).pipe(
      map((groups: Groups) => {
        return groups.groups;
      })
    );
  }

  public loadFormResources = () => {
    if (!this.tcConfig.getConfig().disableFormLibs) {
      const frameworkJS = document.createElement('script');
      frameworkJS.id = 'frameworkJS';
      frameworkJS.src = '/apps/app-cdn/tibco/framework_ext/1.0.0/framework_ext.nocache.js';
      frameworkJS.type = 'text/javascript';
      frameworkJS.async = true;
      frameworkJS.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(frameworkJS);

      const elementsEs5JS = document.createElement('script');
      elementsEs5JS.id = 'elementsEs5JS';
      elementsEs5JS.src = '/apps/app-cdn/tibco/elements/elements-es5.js';
      // elementsEs5JS.src = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/forms/elements-es5.js');
      elementsEs5JS.noModule = true;
      elementsEs5JS.defer = true;
      elementsEs5JS.async = true;
      elementsEs5JS.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(elementsEs5JS);

      const elementsEs2015JS = document.createElement('script');
      elementsEs2015JS.id = 'elementsEs2015JS';
      elementsEs2015JS.src = '/apps/app-cdn/tibco/elements/elements-es2015.js';
      // elementsEs2015JS.src = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/forms/elements-es2015.js');
      elementsEs2015JS.type = 'module';
      elementsEs2015JS.async = true;
      elementsEs2015JS.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(elementsEs2015JS);

      const elementsCSS = document.createElement('link');
      elementsCSS.id = 'elementsCSS';
      elementsCSS.href = '/apps/app-cdn/tibco/elements/elements.css';
      // elementsCSS.href = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/forms/elements.css');
      elementsCSS.rel = 'stylesheet';
      elementsCSS.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(elementsCSS);

      const fontCSS = document.createElement('link');
      fontCSS.id = 'fontCSS';
      fontCSS.href = '/apps/app-cdn/tibco/fonts/Source_Sans_Pro/font.css';
      fontCSS.rel = 'stylesheet';
      fontCSS.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(fontCSS);

      const TfMaterial = document.createElement('link');
      TfMaterial.id = 'tfMaterial'
      TfMaterial.href = '/apps/app-cdn/tibco/framework_ext/1.0.0/TfMaterial.min.css';
      TfMaterial.rel = 'stylesheet';
      TfMaterial.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(TfMaterial);
    }
  }

  public refresh(): Observable<any> {
    const claims$ = this.liveAppsService.getClaims().pipe(
      map(claimVal => {
        claimVal.sandboxes.forEach(sandbox => {
          if (sandbox.type === 'Production') {
            claimVal.primaryProductionSandbox = sandbox;
          }
        });
        const adminGrp = claimVal.primaryProductionSandbox.groups.find(grp => grp.type === 'Administrator');
        this.isAdminUser = adminGrp ? true : false;
        this.loadFormResources();
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
        return this.getConfig().pipe(
          map(config => {
            this.currentAppConfig = config;
            this._appConfig.next(config);
            return response;
          }),
          catchError(error => {
            // continue if no config file
            return of(this.currentClaim);
          })
        );
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
      switchMap((response: Claim) => {
        return this.getUsersData(Number(response.primaryProductionSandbox.id)).pipe(
          map(users => {
              this.currentUsers = users;
              this._users.next(users);
              return response;
            }
          )
        );
      }),
      switchMap((response: Claim) => {
        return this.getGroupsData(Number(response.primaryProductionSandbox.id)).pipe(
          map(resGroups => {
            this.currentGroups = resGroups;
            this._groups.next(resGroups);
            // calculate users groups
            this.currentUsersGroups = [];
            this.currentGroups.forEach((group: Group) => {
              // look to see if we are a member
              const idx = this.claims.primaryProductionSandbox.groups.findIndex(grp => {
                return grp.id === group.id;
              });
              if (idx !== -1) {
                // add it as we are a member
                this.currentUsersGroups.push(group);
              }
            })
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

  // config
  public get appConfig() {
    return this.currentAppConfig;
  }

  // claims
  public get claims$() {
    return this._claims.asObservable();
  }

  public get isAdmin() {
    return this.isAdminUser;
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

  // users
  public get users() {
    return this.currentUsers;
  }

  public getUserById(id: string) {
    return this.currentUsers.find((user: UserInfo) => {
      return user.id === id;
    });
  }

  public getUserByUserName(username: string) {
    return this.currentUsers.find((user: UserInfo) => {
      return user.username === username;
    });
  }

  public getUserByEmail(email: string) {
    return this.currentUsers.find((user: UserInfo) => {
      return user.email === email;
    });
  }

  // groups
  public get groups() {
    return this.currentGroups;
  }

  public get usersGroups() {
    return this.currentUsersGroups;
  }

  public isMemberOfByName(name: string): boolean {
    // note: names of system groups are prefixed with 'System: '
    const idx = this.currentUsersGroups.findIndex((grp: Group) => {
      return grp.name.toLowerCase() === name.toLowerCase();
    });
    return (idx !== -1);
  }

  public isMemberOfById(id: string): boolean {
    const idx = this.currentUsersGroups.findIndex((grp: Group) => {
      return grp.id === id;
    });
    return (idx !== -1);
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
      return ctype.applicationId === appId && ctype.id === '1';
    });
  }

  public getCaseTypeByName(name: string): CaseType {
    return this.currentCaseTypes.find((ctype: CaseType) => {
      return ctype.name === name && ctype.id === '1';
    });
  }

  public getCaseTypeByApplicationName(applicationName: string): CaseType {
    return this.currentCaseTypes.find((ctype: CaseType) => {
      return ctype.applicationName === applicationName && ctype.id === '1';
    });
  }

  public getCaseTypeByInternalName(applicationInternalName: string): CaseType {
    return this.currentCaseTypes.find((ctype: CaseType) => {
      return ctype.applicationInternalName === applicationInternalName && ctype.id === '1';
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

