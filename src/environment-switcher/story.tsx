import React, { Fragment, useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  EnvironmentSwitcher,
  Switch,
  FormLabel,
  InputBox,
} from '..';
import { Environment } from '.';

import colorVariables from "../../variables/colors.json";

export enum CustomEnvironment {
  FOO = 'FOO',
}

type EnvironmentConfigurationCustom = {
  type: Environment.CUSTOM;
  coreApiBaseUrl: string;
  accountsApiBaseUrl: string;
};

type EnvironmentConfigurationLocal = {
  type: Environment.LOCAL;
  port: string;
};

const DEFAULT_LOCAL_CORE_API_PORT = 8000;

const DEFAULT_SETTING_VALUES = {
  auth0LoginPageEnabled: true,
  countEndpointSlowMode: false,
  showEnvironmentSwitcher: false,
};

const ENVIRONMENTS = [
  {
    type: Environment.PRODUCTION as const,
    name: 'Production',
    description: 'The environment containing real, up to date customer data.',
    color: undefined,
  },
  {
    type: Environment.STAGING as const,
    name: 'Staging / Lab',
    description:
      'The environment containing mock data used primarily by developers for testing.',
    color: colorVariables.red,
  },
  {
    type: Environment.LOCAL as const,
    name: 'Local',
    description: 'An environment running on localhost.',
    color: colorVariables.yellow,
    controls: (selectedEnvironment: EnvironmentConfigurationLocal, setSelectedEnvironment) => (
      <Fragment>
        <FormLabel
          label="Core API Port:"
          htmlFor="core-port"
          input={
            <InputBox
              placeholder="Core API Port"
              id="core-port"
              value={selectedEnvironment.port}
              width="100%"
              onChange={(e) =>
                setSelectedEnvironment({
                  ...selectedEnvironment,
                  port: e.target.value,
                })
              }
            />
          }
        />
        <FormLabel
          label="Use Auth0 login page"
          htmlFor="loginpage"
          input={
            <Switch
              value={selectedEnvironment.auth0LoginPageEnabled}
              id="loginpage"
              onChange={(e) =>
                setSelectedEnvironment({
                  ...selectedEnvironment,
                  auth0LoginPageEnabled: e.target.checked,
                })
              }
            />
          }
        />
      </Fragment>
    ),
    defaultValue: {
      type: Environment.LOCAL as const,
      port: `${DEFAULT_LOCAL_CORE_API_PORT}`,

      ...DEFAULT_SETTING_VALUES,
      auth0LoginPageEnabled: false,
    },
  },
  {
    type: Environment.CUSTOM as const,
    name: 'Custom',
    description: 'Unusual local setup, a custom dev cluster, etc',
    color: colorVariables.midnight,
    controls: (selectedEnvironment: EnvironmentConfigurationCustom, setSelectedEnvironment) => (
      <Fragment>
        <FormLabel
          label="Core API Base Url"
          htmlFor="core"
          input={
            <InputBox
              value={selectedEnvironment.coreApiBaseUrl}
              id="core"
              width="100%"
              placeholder="ex: https://api.density.io/v2"
              onChange={(e) =>
                setSelectedEnvironment({
                  ...selectedEnvironment,
                  coreApiBaseUrl: e.target.value,
                })
              }
            />
          }
        />
        <FormLabel
          label="Accounts API Base Url"
          htmlFor="accounts"
          input={
            <InputBox
              value={selectedEnvironment.accountsApiBaseUrl}
              id="accounts"
              placeholder="ex: https://accounts.density.io/v2"
              width="100%"
              onChange={(e) =>
                setSelectedEnvironment({
                  ...selectedEnvironment,
                  accountsApiBaseUrl: e.target.value,
                })
              }
            />
          }
        />
        <FormLabel
          label="Use Auth0 login page"
          htmlFor="loginpage"
          input={
            <Switch
              value={selectedEnvironment.auth0LoginPageEnabled}
              id="loginpage"
              onChange={(e) =>
                setSelectedEnvironment({
                  ...selectedEnvironment,
                  auth0LoginPageEnabled: e.target.checked,
                })
              }
            />
          }
        />
      </Fragment>
    ),
    defaultValue: {
      type: Environment.CUSTOM as const,
      coreApiBaseUrl: '',
      accountsApiBaseUrl: '',

      ...DEFAULT_SETTING_VALUES,
      auth0LoginPageEnabled: false,
    },
  },
  {
    type: CustomEnvironment.FOO as const,
    name: 'Foo',
    description: 'Messing around.',
    color: 'red',
    controls: (state: {foo: boolean}, setState) => (
      <Switch
        value={state.foo}
        onChange={e => setState({...state, foo: e.target.checked})}
      />
    ),
    defaultValue: {
      foo: true,
    },
  },
];

storiesOf('Environment Switcher', module)
  .add('Example', () => (
    <EnvironmentSwitcher
      environments={ENVIRONMENTS}
      defaultSettingValues={DEFAULT_SETTING_VALUES}
    />
  ))
