export enum Environment {
  PRODUCTION = 'PRODUCTION',
  STAGING = 'STAGING',
  LOCAL = 'LOCAL',
  CUSTOM = 'CUSTOM',
}

// Fields that are rendered in the "more
export type EnvironmentConfigurationGlobalFields = {
  auth0LoginPageEnabled: boolean;
  countEndpointSlowMode: boolean;
  showEnvironmentSwitcher: boolean;
};

export type EnvironmentConfigurationCustom = {
  type: Environment.CUSTOM;
  coreApiBaseUrl: string;
  accountsApiBaseUrl: string;
};

export type EnvironmentConfigurationLocal = {
  type: Environment.LOCAL;
  port: string;
};

export type EnvironmentConfiguration = EnvironmentConfigurationGlobalFields & (
  | { type: Environment.PRODUCTION }
  | { type: Environment.STAGING }
  | EnvironmentConfigurationLocal
  | EnvironmentConfigurationCustom
);

export type EnvironmentState = {
  workingConfiguration: EnvironmentConfiguration /* working copy of configuration */;
  configuration: EnvironmentConfiguration /* version of the configuration used by the app */;
};

export enum EnvironmentActionTypes {
  ENVIRONMENT_SET_CONFIGURATION = 'ENVIRONMENT_SET_CONFIGURATION',
  ENVIRONMENT_RESET_CONFIGURATION = 'ENVIRONMENT_RESET_CONFIGURATION',
  ENVIRONMENT_COMMIT_CONFIGURATION = 'ENVIRONMENT_COMMIT_CONFIGURATION',
}

export type EnvironmentAction =
  | {
      type: EnvironmentActionTypes.ENVIRONMENT_SET_CONFIGURATION;
      configuration: EnvironmentConfiguration;
    }
  | { type: EnvironmentActionTypes.ENVIRONMENT_RESET_CONFIGURATION }
  | { type: EnvironmentActionTypes.ENVIRONMENT_COMMIT_CONFIGURATION };
