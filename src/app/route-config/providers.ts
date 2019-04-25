import {LoginComponent} from '../components/login/login.component';
import {HomeComponent} from '../routes/home/home.component';
import {
  AllGroupsResolver,
  AllRolesResolver,
  ClaimsResolver,
  GroupsResolver,
  LaConfigResolver,
  LiveAppsConfigResolver,
  RolesResolver
} from 'tc-liveapps-lib';
import {ConfigurationMenuConfigResolver, GeneralConfigResolver, LoginPrefillResolver} from 'tc-core-lib';
import {ServiceDetailsConfigResolver} from 'tc-check-workflow-monitor-lib';
import {SpotfireConfigResolver} from 'tc-spotfire-lib';

export const PROVIDERS = [
  LoginComponent,
  HomeComponent,
  ClaimsResolver,
  LiveAppsConfigResolver,
  LaConfigResolver,
  GeneralConfigResolver,
  ServiceDetailsConfigResolver,
  ConfigurationMenuConfigResolver,
  SpotfireConfigResolver,
  RolesResolver,
  AllRolesResolver,
  GroupsResolver,
  AllGroupsResolver,
  LoginPrefillResolver
];

