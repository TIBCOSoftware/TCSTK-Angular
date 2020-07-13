/**
 * @ngdoc component
 * @name tcEventsService
 *
 * @description
 *
 * tcEventsService provides services for using Tibco Cloud Events.
 *
 * These services allow operations such as checkout/update rules and building artifacts as typically performed by Cloud Events Web Studio
 *
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EventsResponse, EventsResponseMessage, EventsRequestMessage } from '../models/tc-events';
// import {error} from 'ng-packagr/lib/util/log';

@Injectable({
  providedIn: 'root'
})

export class TcEventsService {
  constructor(private http: HttpClient) {
  }

  /**
   * Retrieve the globalToken that other Cloud Events calls require
   */
  public getToken(): Observable<EventsResponse> {
    const url = '/ws/api/checkToken.json';
    const headers = new HttpHeaders()
      .set('Target-Tenant', 'tce');
    return this.eventsApiCall('GET', url, headers);
  }

  /**
   * Perform checkout on a Cloud Events artifact
   */
  public checkout(globalToken: string, projectName: string, rulePath: string): Observable<EventsResponse> {
    const url = '/ws/api/' + globalToken + '/projects/' + projectName + '/checkout.json';
    const headers = new HttpHeaders()
      .set('Target-Tenant', 'tce');
    const body = new EventsRequestMessage().deserialize({
      request: {
        data: {
          project: [{
            name: projectName,
            artifactItem: [{
              artifactPath: rulePath,
              artifactType: 'ruletemplateinstance',
              fileExtension: 'ruletemplateinstance',
              baseArtifactPath: ''
            }]
          }]
        }
      }
    })
    return this.eventsApiCall('POST', url, headers, body);
  }

  /**
   * Save changes to a Cloud Events artifact
   */
  public save(globalToken: string, projectName: string, rulePath: string, implementsPath, artifactInput, rulePriority: number, description: string): Observable<EventsResponse> {
    const url = '/ws/api/' + globalToken + '/artifact/save.json';
    const headers = new HttpHeaders()
      .set('Target-Tenant', 'tce');
    const body = new EventsRequestMessage().deserialize({
      request: {
        data: {
          project: [{
            name: projectName,
            artifactItem: [{
              artifactPath: rulePath,
              artifactType: 'ruletemplateinstance',
              fileExtension: 'ruletemplateinstance',
              implementsPath: implementsPath,
              isSyncMerge: 'false',
              artifactContent: artifactInput,
              description: description,
              rulePriority: rulePriority
            }]
          }]
        }
      }
    });
    return this.eventsApiCall('POST', url, headers, body);
  }

  /**
   * Commit a Cloud Events artifact
   */
  public commit(globalToken: string, projectName: string, rulePath: string, commitMessage: string): Observable<EventsResponse> {
    const url = '/ws/api/' + globalToken + '/projects/' + projectName + '/commit.json';
    const headers = new HttpHeaders()
      .set('Target-Tenant', 'tce');
    const body = new EventsRequestMessage().deserialize({
      request: {
        data: {
          commitComments: commitMessage,
          project: [{
            name: projectName,
            artifactItem: [{
              artifactPath: rulePath,
              artifactType: 'ruletemplateinstance',
              fileExtension: 'ruletemplateinstance',
              baseArtifactPath: ''
            }]
          }]
        }
      }
    });
    return this.eventsApiCall('POST', url, headers, body);
  }

  /**
   * Perform approval on a Cloud Events artifact
   */
  public approveBusinessRule(globalToken: string, globalRevisionID: string, rulePath: string, projectName: string, newStatus): Observable<EventsResponse> {
    const url = '/ws/api/' + globalToken + '/worklist/statusChange.json';
    const headers = new HttpHeaders()
      .set('Target-Tenant', 'tce');
    const body = new EventsRequestMessage().deserialize({
      request: {
        data: {
          worklist: [{
            revisionId: globalRevisionID,
            worklistItem: [{
              artifactPath: rulePath,
              artifactType: 'ruletemplateinstance',
              managedProjectName: projectName,
              reviewStatus: newStatus
            }]
          }]
        }
      }
    });
    return this.eventsApiCall('POST', url, headers, body);
  }

  /**
   * Generate a deployable for a Cloud Events artifact
   */
  public generateDeployable(globalToken: string, projectName: string): Observable<EventsResponse> {
    const url = '/ws/api/' + globalToken + '/projects/' + projectName + '/generateDeployable.json?buildClassesOnly=false';
    const headers = new HttpHeaders()
      .set('Target-Tenant', 'tce');
    return this.eventsApiCall('GET', url, headers);
  }

  /**
   * Publish the generated deployable for a Cloud Events artifact
   */
  public publish(globalToken: string, globalRevisionId: string, rulePath: string, projectName: string): Observable<EventsResponse> {
    const url = '/ws/api/' + globalToken + '/worklist/statusChange.json';
    const headers = new HttpHeaders()
      .set('Target-Tenant', 'tce');
    const body = new EventsRequestMessage().deserialize({
      request: {
        data: {
          worklist: [{
            revisionId: globalRevisionId,
            worklistItem: [{
              artifactPath: rulePath,
              artifactType: 'ruletemplateinstance',
              managedProjectName: projectName,
              reviewStatus: 'BuildAndDeploy',
              deployEnvironments: '',
              reviewComments: 'Deployed'
            }]
          }]
        }
      }
    });
    return this.eventsApiCall('POST', url, headers, body);
  }

  /**
   * Shared method that handles the standard Events Response message format when calling Cloud Events API
   */
  public eventsApiCall(method: string, url: string, headers?: HttpHeaders, body?: any): Observable<EventsResponse> {
    return this.http.request(method, url, { body: body, headers: headers }).pipe(
      map((result: EventsResponseMessage) => {
          if (result.response.status !== '-1') {
            return new EventsResponse().deserialize(result.response);
          } else {
            const errorCode = (result && result.response && result.response.errorCode) ? result.response.errorCode : result;
            console.error('Cloud Events API call failed, ', errorCode);
            throw new Error(result.response.errorCode);
          }
        }
      )
    );
  }

}
