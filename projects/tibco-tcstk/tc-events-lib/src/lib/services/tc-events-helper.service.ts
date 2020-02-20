import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {TcEventsService} from '../services/tc-events.service';
import {EventsResponse} from '../models/tc-events';
import {RuleDeployment} from '../models/tc-events-helper';
import {TcCoreCommonFunctions} from '@tibco-tcstk/tc-core-lib';

@Injectable({
  providedIn: 'root'
})

export class TcEventsHelperService {
  constructor(private tcEventsService: TcEventsService) {
  }

  public deployRule(ruleDeploymentConfig: RuleDeployment): Observable<EventsResponse> {
    let globalToken: string;
    ruleDeploymentConfig.artifactInput = TcCoreCommonFunctions.escapeString(JSON.stringify(ruleDeploymentConfig.artifactInput));
    let globalRevisionId: string;
    return this.tcEventsService.getToken().pipe(
      catchError(err => throwError(err)),
      switchMap((response: EventsResponse) => {
        globalToken = response.data.record[0].apiToken;
        return this.tcEventsService.checkout(globalToken, ruleDeploymentConfig.projectName, ruleDeploymentConfig.rulePath).pipe(catchError(err => throwError(err)));
      }),
      switchMap((response: EventsResponse) =>
        this.tcEventsService.save(
          globalToken,
          ruleDeploymentConfig.projectName,
          ruleDeploymentConfig.rulePath,
          ruleDeploymentConfig.implementsPath,
          ruleDeploymentConfig.artifactInput,
          ruleDeploymentConfig.rulePriority,
          ruleDeploymentConfig.description
        ).pipe(catchError(err => throwError(err)))
      ),
      switchMap((response: EventsResponse) =>
        this.tcEventsService.commit(
          globalToken,
          ruleDeploymentConfig.projectName,
          ruleDeploymentConfig.rulePath,
          ruleDeploymentConfig.commitMessage
        ).pipe(catchError(err => throwError(err)))
      ),
      switchMap((response: EventsResponse) => {
          if (response && response.status === '0') {
            globalRevisionId = response.responseMessage.substring(
              response.responseMessage.lastIndexOf('[') + 1,
              response.responseMessage.lastIndexOf(']')
            );
            return this.tcEventsService.approveBusinessRule(
              globalToken,
              globalRevisionId,
              ruleDeploymentConfig.rulePath,
              ruleDeploymentConfig.projectName,
              ruleDeploymentConfig.newStatus
            ).pipe(catchError(err => throwError(err)));
          }
        }
      ),
      switchMap((response: EventsResponse) => this.tcEventsService.generateDeployable(
        globalToken,
        ruleDeploymentConfig.projectName
        )
        .pipe(catchError(err => throwError(err)))
      ),
      switchMap((response: EventsResponse) => this.tcEventsService.publish(
        globalToken,
        globalRevisionId,
        ruleDeploymentConfig.rulePath,
        ruleDeploymentConfig.projectName)
        .pipe(catchError(err => throwError(err)))
      ),
      catchError(errtop => throwError(errtop))
    );
  }
}
