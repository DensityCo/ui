import React, { Fragment, useReducer, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";

import {
  AppBar,
  AppBarTitle,
  AppBarContext,
  AppBarSection,
  Button,
  ButtonGroup,
  Modal,
  RadioButton,
  InputBox,
  Icons,
  Switch,
  FormLabel
} from "..";
import colorVariables from "../../variables/colors.json";

export enum Environment {
  PRODUCTION = 'PRODUCTION',
  STAGING = 'STAGING',
  LOCAL = 'LOCAL',
  CUSTOM = 'CUSTOM',
}

// Put any environment configuration settings that all environments have in here.
export type EnvironmentConfigurationBase = {
  showEnvironmentSwitcher: boolean;
};
const BASE_CONFIGURATION_INITIAL_VALUES: EnvironmentConfigurationBase = {
  showEnvironmentSwitcher: false,
};


export function getEnvironmentFromLocalStorage<T extends EnvironmentConfigurationBase>(
  globalSettings: T,
  key = 'environment',
): any {
  const stringData = window.localStorage.getItem(key);
  if (stringData !== null) {
    let data: any;
    try {
      data = JSON.parse(stringData);
    } catch (err) {
      // If decoding from localStrage failed, then try again with the data removed from localStorage
      window.localStorage.removeItem(key);
      return getEnvironmentFromLocalStorage(globalSettings, key);
    }
    return data;
  } else {
    // Return the default depending on the hostname
    let data: any;
    if (window.location.hostname.endsWith('density.rodeo')) {
      data = { type: Environment.STAGING, ...BASE_CONFIGURATION_INITIAL_VALUES, ...globalSettings };
    } else {
      data = { type: Environment.PRODUCTION, ...BASE_CONFIGURATION_INITIAL_VALUES, ...globalSettings };
    }

    window.localStorage.setItem(key, JSON.stringify(data));
    return data;
  }
}

function saveEnvironmentToLocalStorage<C extends EnvironmentConfigurationBase>(
  environment: C,
  key = 'environment',
) {
  window.localStorage.setItem(key, JSON.stringify(environment));
}

// ----------------------------------------------------------------------------
// State management
//
// Using the typical rx-state stuff here would require including rxjs in this
// library, which we've historically avoided.
// ----------------------------------------------------------------------------

enum EnvironmentSwitcherActionTypes {
  ENVIRONMENT_SET_CONFIGURATION = 'ENVIRONMENT_SET_CONFIGURATION',
  ENVIRONMENT_RESET_CONFIGURATION = 'ENVIRONMENT_RESET_CONFIGURATION',
  ENVIRONMENT_COMMIT_CONFIGURATION = 'ENVIRONMENT_COMMIT_CONFIGURATION',
}

type EnvironmentSwitcherAction<C extends EnvironmentConfigurationBase> =
  | {
      type: EnvironmentSwitcherActionTypes.ENVIRONMENT_SET_CONFIGURATION;
      configuration: C;
    }
  | { type: EnvironmentSwitcherActionTypes.ENVIRONMENT_RESET_CONFIGURATION }
  | { type: EnvironmentSwitcherActionTypes.ENVIRONMENT_COMMIT_CONFIGURATION };

type EnvironmentSwitcherState<C extends EnvironmentConfigurationBase> = {
  workingConfiguration: C /* working copy of configuration */;
  configuration: C /* version of the configuration used by the app */;
};


type EnvironmentSwitcherProps<
  L extends object,
  C extends object,
  G extends object,
> = {
  // Settings shown in "More options" panel
  globalSettings: G;
  globalControls?: (
    config: { type: Environment } & G & EnvironmentConfigurationBase,
    setConfig: (config: { type: Environment } & G & EnvironmentConfigurationBase) => void,
  ) => React.ReactNode;

  // Settings shown when "local" environment is selected
  localEnvironmentControls: (
    config: { type: Environment.LOCAL } & L & G & EnvironmentConfigurationBase,
    setConfig: (config: L & G & EnvironmentConfigurationBase) => void,
  ) => React.ReactNode;
  localEnvironmentDefaultValue: L,

  // Settings shown when "custom" environment is selected
  customEnvironmentControls: (
    config: { type: Environment.CUSTOM } & C & G & EnvironmentConfigurationBase,
    setConfig: (config: C & G & EnvironmentConfigurationBase) => void,
  ) => React.ReactNode;
  customEnvironmentDefaultValue: C,
};

// See https://stackoverflow.com/a/63279565/4115328 for more info on this syntax
type EnvironmentSwitcherComponentType = <
  L extends object, // Local configuration shape
  C extends object, // Custom configuration shape
  G extends EnvironmentConfigurationBase, // Global configuration shape
>(p: EnvironmentSwitcherProps<L, C, G>) => React.ReactElement;

export const EnvironmentSwitcher: EnvironmentSwitcherComponentType = ({
  localEnvironmentControls,
  localEnvironmentDefaultValue,
  customEnvironmentControls,
  customEnvironmentDefaultValue,

  globalControls,
  globalSettings,
}) => {
  const [ open, setOpen ] = useState(false);

  // TODO: This is a hack that should be upstreamed into the modal. Now that the modal is used more
  // extensively, requiring every application to manage whether it's "rendered" or "opened" seems
  // like a bad decision.
  const [ openModal, setOpenModal ] = useState(true);
  const [ renderModal, setRenderModal ] = useState(false);
  useEffect(() => {
    let unmounted = false;
    if (open) {
      setRenderModal(true);
      setOpenModal(true);
    } else {
      setOpenModal(false);
      setTimeout(() => {
        if (!unmounted) {
          setRenderModal(false);
        }
      }, 500);
    }

    return () => { unmounted = true; }
  }, [ open ]);

  const environments = [
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
        'A pre-production environment used primarily by developers for testing.',
      color: colorVariables.red,
    },
    {
      type: Environment.LOCAL as const,
      name: 'Local',
      description: 'An environment running on localhost.',
      color: colorVariables.yellow,
      controls: localEnvironmentControls,
      defaultValue: localEnvironmentDefaultValue,
    },
    {
      type: Environment.CUSTOM as const,
      name: 'Custom',
      description: 'Unusual local setup, a custom dev cluster, etc',
      color: colorVariables.midnight,
      controls: customEnvironmentControls,
      defaultValue: customEnvironmentDefaultValue,
    },
  ];

  // NOTE: This needs to be inside here so this this type can vary based on the types of some of the props.
  type EnvironmentDefinition = (
    | { type: Environment.PRODUCTION} & typeof globalSettings
    | { type: Environment.STAGING } & typeof globalSettings
    | { type: Environment.LOCAL } & typeof localEnvironmentDefaultValue & typeof globalSettings
    | { type: Environment.CUSTOM } & typeof customEnvironmentDefaultValue & typeof globalSettings
  );

  const initialConfiguration = getEnvironmentFromLocalStorage(globalSettings);
  const initialState: EnvironmentSwitcherState<EnvironmentDefinition> = {
    workingConfiguration: initialConfiguration,
    configuration: initialConfiguration,
  };

  function reducer(state: EnvironmentSwitcherState<EnvironmentDefinition>, action: EnvironmentSwitcherAction<EnvironmentDefinition>) {
    switch (action.type) {
      case EnvironmentSwitcherActionTypes.ENVIRONMENT_SET_CONFIGURATION:
        return { ...state, workingConfiguration: action.configuration };
      case EnvironmentSwitcherActionTypes.ENVIRONMENT_COMMIT_CONFIGURATION:
        return { ...state, configuration: state.workingConfiguration };
      case EnvironmentSwitcherActionTypes.ENVIRONMENT_RESET_CONFIGURATION:
        return { ...state, workingConfiguration: state.configuration };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  // Listen for a special sequence of keys to open the environment switcher.
  //
  // This is to both maintain backwards compatibility with the old environment switcher, as well as
  // so that if the navbar button isn't visible, then it can still be opened.
  useEffect(() => {
    const keys = ['!', '!', '`', ' '];
    let indexInKeys = 0;
    const onKeyDown = (e) => {
      if (keys[indexInKeys] === e.key) {
        if (indexInKeys === keys.length - 1) {
          indexInKeys = 0;
          setOpen(true);
        }
        indexInKeys += 1;
      } else {
        // Wasn't the right key, do nothing.
        indexInKeys = 0;
      }
      // Reset after a couple seconds
      setTimeout(() => {
        indexInKeys = 0;
      }, 5000);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [ dispatch, open ]);

  const configurationForSelectedEnvironment = environments.find(
    (conf) => conf.type === state.configuration.type,
  );
  if (!configurationForSelectedEnvironment) {
    return null;
  }

  const showEnvironmentSwitcherButton =
    state.configuration.type !== Environment.PRODUCTION ||
    state.configuration.showEnvironmentSwitcher;

  const button = showEnvironmentSwitcherButton ? (
    <button
      className={classnames(styles.environment, {
        [styles.nonProductionEnvironment]:
          state.configuration.type !== Environment.PRODUCTION,
      })}
      style={{ backgroundColor: configurationForSelectedEnvironment.color }}
      onClick={() => setOpen(true)}
      // Since this is a developer feature, don't make it accessible by tab navigation
      // for regular users.
      tabIndex={-1}
    >
      {configurationForSelectedEnvironment.name}
    </button>
  ) : null;

  if (!renderModal) {
    return button;
  }

  const onClose = () => {
    dispatch({ type: EnvironmentSwitcherActionTypes.ENVIRONMENT_RESET_CONFIGURATION });
    setOpen(false);
  };

  return (
    <Fragment>
      {button}
      <Modal
        visible={openModal}
        onEscape={onClose}
        onBlur={onClose}
        width={500}
      >
        <AppBar>
          <AppBarTitle>Switch Environment</AppBarTitle>
        </AppBar>
        <p className={styles.environmentDescription}>
          This is a function intended for developers!&nbsp;
          <strong style={{ color: colorVariables.red }}>
            If you opened this by mistake, click cancel to return to the app.
          </strong>
        </p>

        <ul className={styles.environmentChoiceList}>
          {environments.map((environment) => (
            <div
              className={styles.environmentChoiceWrapper}
              key={environment.type}
            >
              <li
                className={classnames(styles.environmentChoice, {
                  [styles.selected]:
                    state.workingConfiguration.type === environment.type,
                })}
                onClick={() => {
                  // Extract the current values of all global settings, so that
                  // when the environment is changed, these values will not be
                  // overridden.
                  const currentGlobalSettingValues = Object.fromEntries(
                    Object.keys(globalSettings).map((key) => [
                      key,
                      state.workingConfiguration[key],
                    ]),
                  );
                  dispatch({
                    type: EnvironmentSwitcherActionTypes.ENVIRONMENT_SET_CONFIGURATION,
                    configuration: {
                      ...BASE_CONFIGURATION_INITIAL_VALUES,
                      ...globalSettings,
                      ...(environment.defaultValue || {}),
                      ...currentGlobalSettingValues,
                      type: environment.type as any,
                    },
                  });
                }}
              >
                <RadioButton
                  checked={state.workingConfiguration.type === environment.type}
                  onChange={() => {}}
                />
                <div>
                  <h3>{environment.name}</h3>
                  <span>{environment.description}</span>
                </div>
              </li>
              {state.workingConfiguration.type === environment.type && environment.controls ? (
                <div className={styles.environmentChoiceControls}>
                  {environment.controls(
                    state.workingConfiguration as any,
                    (configuration) =>
                      dispatch({
                        type:
                          EnvironmentSwitcherActionTypes.ENVIRONMENT_SET_CONFIGURATION,
                        configuration,
                      }),
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </ul>
        <details className={styles.environmentGlobalControls}>
          <summary>More options</summary>
          <div className={styles.environmentGlobalControlsInner}>
            <FormLabel
              label="Show environment switcher button"
              input={
                <Switch
                  value={state.workingConfiguration.showEnvironmentSwitcher}
                  id="visible"
                  onChange={(e) => {
                    dispatch({
                      type: EnvironmentSwitcherActionTypes.ENVIRONMENT_SET_CONFIGURATION,
                      configuration: {
                        ...state.workingConfiguration,
                        showEnvironmentSwitcher: e.target.checked,
                      },
                    });
                  }}
                />
              }
            />
            {globalControls ? globalControls(
              state.workingConfiguration as any,
              (configuration) =>
                dispatch({
                  type: EnvironmentSwitcherActionTypes.ENVIRONMENT_SET_CONFIGURATION,
                  configuration,
                }),
            ) : null}
          </div>
        </details>

        <AppBarContext.Provider value="BOTTOM_ACTIONS">
          <AppBar>
            <AppBarSection>
              <Button
                variant="underline"
                type="muted"
                onClick={() => {
                  window.localStorage.removeItem('environment');
                  // Refresh to reload the app with the new hosts
                  // Delay is here to give feedback that it worked by letting the modal close
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }}
              >
                Reset to default
              </Button>
            </AppBarSection>
            <AppBarSection>
              <ButtonGroup>
                <Button variant="underline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="filled"
                  onClick={() => {
                    dispatch({
                      type:
                        EnvironmentSwitcherActionTypes.ENVIRONMENT_COMMIT_CONFIGURATION,
                    });
                    saveEnvironmentToLocalStorage(state.workingConfiguration);
                    setOpen(false);
                    // Refresh to reload the app with the new hosts
                    // Delay is here to give feedback that it worked by letting the modal close
                    setTimeout(() => {
                      window.location.reload();
                    }, 100);
                  }}
                >
                  Save
                </Button>
              </ButtonGroup>
            </AppBarSection>
          </AppBar>
        </AppBarContext.Provider>
      </Modal>
    </Fragment>
  );
};

export default EnvironmentSwitcher;
