import {Deserializable} from '@tibco-tcstk/tc-core-lib';

/*
  type can be action/creator or workitem
 */
export class LiveAppsFormConfig implements Deserializable {
  type: string;
  id: string;
  user: string;
  sandbox: string;
  formDivId: string;
  useCustomForm: string;
  name: string;
  label: string;
  version: string;
  applicationId: string;
  applicationName: string;
  activityId: string;
  activityName: string;
  caseRef: string;
  noData: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
