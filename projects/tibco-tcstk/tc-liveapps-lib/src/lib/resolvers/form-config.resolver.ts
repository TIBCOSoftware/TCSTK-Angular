import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {TcCoreCommonFunctions, UiAppConfig, UiAppIdConfig} from '@TIBCOSoftware/tc-core-lib';
import {catchError, flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {TcSharedStateService} from '@TIBCOSoftware/tc-core-lib';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormConfig} from '../models/tc-liveapps-config';
import {TcFormConfigService} from '../services/tc-form-config.service';
import {Location} from '@angular/common';

@Injectable()
export class FormConfigResolver implements Resolve<Observable<FormConfig>> {

  DEFAULT_CONFIG_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/formConfig.json');
  APP_ID_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/uiAppId.json');

  private sandboxId: number;
  public defaultFormConfig: FormConfig;
  private uiAppId: string;

  constructor(private tcSharedState: TcSharedStateService, private formConfigService: TcFormConfigService, private http: HttpClient, private location: Location) {}

  // can be used to load defaultAppConfig from a JSON config
  private getDefaultFormConfig = () => {
    return this.http.get(this.DEFAULT_CONFIG_URL, { withCredentials: true }).pipe(
      catchError(error => {
        if (error) {
          // use an empty config
          return of(new FormConfig());
        } else {
          throwError(error);
        }
      }
    ));
  }

  // loads uiAppId from json file in assets (appId.json)
  private getAppId = (): Observable<UiAppIdConfig> => {
    const headers = new HttpHeaders().set('cacheResponse', 'true');
    return this.http.get(this.APP_ID_URL, { headers: headers, withCredentials: true }).pipe(
      map(uiAppId => {
          const uiAppIdConfig = new UiAppIdConfig().deserialize(uiAppId);
          this.uiAppId = uiAppIdConfig.uiAppId;
          return uiAppIdConfig;
        }
      )
    );
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<FormConfig> {
    const formConf$ = this.getAppId().pipe(
      switchMap(uiAppId => this.formConfigService.getFormConfig(uiAppId.uiAppId, true, false)
        .pipe(
          mergeMap(
            (formConfig: FormConfig) => {
              if (formConfig === undefined) {
                return this.getDefaultFormConfig().pipe(
                  flatMap((config: FormConfig) => {
                    this.defaultFormConfig = config;
                    return this.formConfigService.createFormConfig(
                      this.sandboxId,
                      uiAppId.uiAppId,
                      config)
                      .pipe(
                        map(
                          (result: string) => {
                            const newFormConfig = this.defaultFormConfig;
                            newFormConfig.id = result;
                            this.formConfigService.updateFormConfig(
                              this.sandboxId,
                              uiAppId.uiAppId,
                              newFormConfig,
                              result).subscribe(
                              // trigger a read to flush the cache since we changed it
                              updatedConf => {
                                this.formConfigService.getFormConfig(this.uiAppId, true, true).subscribe();
                              }
                            );
                            return newFormConfig;
                          })
                      );
                  })
                );
              } else {
                return of(formConfig);
              }
            }
          )
        )
      )
    )
    return formConf$;
  }

}
