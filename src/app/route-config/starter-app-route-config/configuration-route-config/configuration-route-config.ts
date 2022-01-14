import {
  GeneralConfigResolver,
  GeneralLandingPageConfigResolver,
  TibcoCloudSettingLandingComponent,
  TibcoCloudSettingsGeneralComponent
} from '@TIBCOSoftware/tc-core-lib';
import {
  AllGroupsResolver,
  AllRolesResolver,
  ClaimsResolver,
  LaConfigResolver,
  LiveAppsSettingsComponent,
  LiveAppsSettingsRecentCasesComponent,
  LiveAppsSettingsRolesComponent,
  LiveAppsSettingsSummaryCardsComponent,
  LiveAppsSettingsAccessControlComponent,
  AccessControlConfigurationResolver,
  LiveAppsSettingsFormsComponent,
  LiveAppsSettingsLandingComponent, LiveAppsSettingsFormLayoutComponent, FormConfigResolver,
  LiveAppsSettingsCustomFormsComponent
} from '@TIBCOSoftware/tc-liveapps-lib';
import {EftlMessagingSettingsComponent, MessagingConfigResolver} from '@TIBCOSoftware/tc-messaging-lib';
import { SettingsLandingComponent } from 'src/app/routes/settings-landing/settings-landing.component';
import { SettingsSpotfireComponent } from 'src/app/routes/settings-spotfire/settings-spotfire.component';
import { SpotfireConfigResolver } from '@TIBCOSoftware/tc-spotfire-lib';

export const CONFIGURATION_ROUTE_CONFIG = [
  {
    path: 'general-application-settings',
    component: TibcoCloudSettingsGeneralComponent,
    resolve: {
      generalConfigHolder: GeneralConfigResolver,
      claims: ClaimsResolver
    }
  },
  {
    path: 'general-application-roles',
    component: LiveAppsSettingsRolesComponent,
    resolve: {
      generalConfigHolder: GeneralConfigResolver,
      claims: ClaimsResolver,
      allRoles: AllRolesResolver,
      allGroups: AllGroupsResolver
    }
  },
  {
    path: 'general-application-landing-page',
    component: SettingsLandingComponent,
    resolve: {
      landingPagesConfigHolder: GeneralLandingPageConfigResolver,
      claims: ClaimsResolver,
      allRolesHolder: AllRolesResolver
    }
  },
  {
    path: 'general-application-access-control',
    component: LiveAppsSettingsAccessControlComponent,
    resolve: {
      claims: ClaimsResolver,
      accessControlConfigHolder: AccessControlConfigurationResolver,
      allRoles: AllRolesResolver
    }
  },
  {
    path: 'live-apps-app-selection',
    component: LiveAppsSettingsComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-recent-cases',
    component: LiveAppsSettingsRecentCasesComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-summary-cards',
    component: LiveAppsSettingsSummaryCardsComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-forms',
    component: LiveAppsSettingsFormsComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver
    }
  },
  {
    path: 'live-apps-custom-form-registry',
    component: LiveAppsSettingsCustomFormsComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver,
      formConfig: FormConfigResolver
    }
  },
  {
    path: 'live-apps-form-layout',
    component: LiveAppsSettingsFormLayoutComponent,
    resolve: {
      claims: ClaimsResolver,
      laConfigHolder: LaConfigResolver,
      generalConfigHolder: GeneralConfigResolver,
      formConfig: FormConfigResolver
    }
  },
  {
    path: 'spotfire-settings',
    component: SettingsSpotfireComponent,
    resolve: {
      claimsHolder: ClaimsResolver,
      spotfireConfigHolder: SpotfireConfigResolver
    }
  },
  {
    path: 'messaging-connections',
    component: EftlMessagingSettingsComponent,
    resolve: {
      claims: ClaimsResolver,
      generalConfigHolder: GeneralConfigResolver,
      messagingConfig: MessagingConfigResolver,
    }
  },
  {
    path: '**', redirectTo: '/starterApp/configuration/general-application-settings'
  }
];

export const CONFIGURATION_ROUTE_PROVIDERS = [
  GeneralConfigResolver,
  ClaimsResolver,
  AllRolesResolver,
  AllGroupsResolver,
  GeneralLandingPageConfigResolver,
  AccessControlConfigurationResolver,
  MessagingConfigResolver,
  FormConfigResolver,
  SpotfireConfigResolver
];
