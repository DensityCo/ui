import React, { Fragment, useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  EnvironmentSwitcher,
  getEnvironmentFromLocalStorage,

  Switch,
  FormLabel,
  InputBox,
} from '..';
import { Environment } from '.';

import colorVariables from "../../variables/colors.json";

const DEFAULT_LOCAL_CORE_API_PORT = 8000;

const DEFAULT_SETTING_VALUES = {
  featureFlag: false,
};

storiesOf('Environment Switcher', module)
  .add('Basic Example', () => (
    <div style={{padding: 24}}>
      <p>
        The environment switcher is a mechanism for changing the current set of servers a frontend app points to at runtime.
        To open it, press <code>!</code>, <code>!</code>, <code>~</code>, and then <code>&lt;space&gt;</code>.
      </p>

      <p>
        To get the current environment state, run the <code>getEnvironmentFromLocalStorage</code> function.
      </p>
      <p>
        Current environment state: <code>{JSON.stringify(getEnvironmentFromLocalStorage(DEFAULT_SETTING_VALUES))}</code>
      </p>

      <EnvironmentSwitcher
        // Set any fields that should be shown always in the "More options" pane below
        globalSettings={DEFAULT_SETTING_VALUES}
        globalControls={(config, setConfig) => (
          <Fragment>
            <FormLabel
              label="Special app-specific feature flag"
              htmlFor="slow"
              input={
                <Switch
                  value={config.featureFlag}
                  id="slow"
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      featureFlag: e.target.checked,
                    })
                  }
                />
              }
            />
          </Fragment>
        )}

        // Set any fields that should be shown when "local" is selected
        localEnvironmentControls={(selectedEnvironment, setSelectedEnvironment) => (
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
              label="Use special login page"
              htmlFor="loginpage"
              input={
                <Switch
                  value={selectedEnvironment.specialLoginPageEnabled}
                  id="loginpage"
                  onChange={(e) =>
                    setSelectedEnvironment({
                      ...selectedEnvironment,
                      specialLoginPageEnabled: e.target.checked,
                    })
                  }
                />
              }
            />
          </Fragment>
        )}
        localEnvironmentDefaultValue={{
          port: `${DEFAULT_LOCAL_CORE_API_PORT}`,

          ...DEFAULT_SETTING_VALUES,
          specialLoginPageEnabled: false,
        }}

        // Set any fields that should be shown when "custom" is selected
        customEnvironmentControls={(selectedEnvironment, setSelectedEnvironment) => (
          <Fragment>
            <FormLabel
              label="API Base Url"
              htmlFor="api"
              input={
                <InputBox
                  value={selectedEnvironment.apiBaseUrl}
                  id="apu"
                  width="100%"
                  placeholder="ex: https://api.density.io/v2"
                  onChange={(e) =>
                    setSelectedEnvironment({
                      ...selectedEnvironment,
                      apiBaseUrl: e.target.value,
                    })
                  }
                />
              }
            />
            <FormLabel
              label="Use special login page"
              htmlFor="loginpage"
              input={
                <Switch
                  value={selectedEnvironment.specialLoginPageEnabled}
                  id="loginpage"
                  onChange={(e) =>
                    setSelectedEnvironment({
                      ...selectedEnvironment,
                      specialLoginPageEnabled: e.target.checked,
                    })
                  }
                />
              }
            />
          </Fragment>
        )}
        customEnvironmentDefaultValue={{
          type: Environment.CUSTOM as const,
          apiBaseUrl: '',

          ...DEFAULT_SETTING_VALUES,
          specialLoginPageEnabled: false,
        }}
      />
    </div>
  ))
