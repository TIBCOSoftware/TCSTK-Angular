/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface NavBarConfig {
  container: string;
  textAfterLogo: string;
  idle: {
    disabled: boolean;
    [k: string]: unknown;
  };
  iconMenus: {
    search: {
      visible: boolean;
      [k: string]: unknown;
    };
    download: {
      visible: boolean;
      [k: string]: unknown;
    };
    help: {
      visible: boolean;
      publishEvent: boolean;
      [k: string]: unknown;
    };
    notifications: {
      visible: boolean;
      [k: string]: unknown;
    };
    products: {
      visible: boolean;
      [k: string]: unknown;
    };
    region: {
      visible: boolean;
      [k: string]: unknown;
    };
    accountswitcher: {
      visible: boolean;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  customProfilePanel: {
    account: {
      visible: boolean;
      disabled: boolean;
      [k: string]: unknown;
    };
    subscriptions: {
      visible: boolean;
      disabled: boolean;
      [k: string]: unknown;
    };
    organization: {
      visible: boolean;
      [k: string]: unknown;
    };
    tenants: {
      visible: boolean;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  customizedComponents:
    | []
    | [
    {
      name: string;
      template: string;
      [k: string]: unknown;
    }
  ];
  [k: string]: unknown;
}
