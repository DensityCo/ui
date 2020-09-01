import React, { Fragment, useReducer, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";

// import showModal from '../../rx-actions/modal/show';
// import hideModal from '../../rx-actions/modal/hide';
// import ActiveModalStore from '../../rx-stores/active-modal';

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

// import {
//   Environment,
//   EnvironmentConfiguration,
//   EnvironmentConfigurationLocal,
//   EnvironmentConfigurationCustom,
//   EnvironmentSwitcherActionTypes,
//   EnvironmentConfigurationGlobalFields,
// } from '../../rx-actions/environment';
// import EnvironmentStore, {
//   DEFAULT_LOCAL_SETTINGS,
//   DEFAULT_CUSTOM_SETTINGS,
//   DEFAULT_SETTING_VALUES,
// } from '../../rx-stores/environment';

// This is a list of all environments selectable in the environment switcher
// const ENVIRONMENTS = [PRODUCTION, STAGING, LOCAL, CUSTOM];

// These controls are rendered in the "More options" menu at the bottom of the environment switcher
// They are persistant no matter the environment selected.
// const GLOBAL_ENVIRONMENT_CONTROLS = (
//   selectedEnvironment: EnvironmentConfiguration,
//   setSelectedEnvironment,
// ) => (
//   <Fragment>
//     <FormLabel
//       label={
//         <InfoPopup
//           target={
//             <div className={styles.environmentGlobalControlsTooltipTarget}>
//               Always show environment switcher button in navbar&nbsp;
//               <Icons.Info />
//             </div>
//           }
//           contents={
//             <Fragment>
//               By default, the environment switcher button is only hidden when
//               connected to production. When this setting is enabled, it's always
//               shown - this can be helpful for developers who switch environments
//               regularly.
//               <br />
//               <img alt="" src={environmentSwitcherButton} style={{ height: 64 }} />
//             </Fragment>
//           }
//         />
//       }
//       htmlFor="visible"
//       input={
//         <Switch
//           value={selectedEnvironment.showEnvironmentSwitcher}
//           id="visible"
//           onChange={(e) =>
//             setSelectedEnvironment({
//               ...selectedEnvironment,
//               showEnvironmentSwitcher: e.target.checked,
//             })
//           }
//         />
//       }
//     />
//     <FormLabel
//       label={
//         <InfoPopup
//           target={
//             <div className={styles.environmentGlobalControlsTooltipTarget}>
//               Use 'slow mode' when requesting space counts&nbsp;
//               <Icons.Info />
//             </div>
//           }
//           contents={
//             <Fragment>
//               By default, the dashboard receives cached count data from the API.
//               When this option is turned on, the additional "&slow=true" query
//               parameter is included in all "GET /v2/spaces/:id/counts" API
//               requests, which instead forces the API to skip the cache and
//               manually recalculate count data for every request.
//             </Fragment>
//           }
//         />
//       }
//       htmlFor="slow"
//       input={
//         <Switch
//           value={selectedEnvironment.countEndpointSlowMode}
//           id="slow"
//           onChange={(e) =>
//             setSelectedEnvironment({
//               ...selectedEnvironment,
//               countEndpointSlowMode: e.target.checked,
//             })
//           }
//         />
//       }
//     />
//   </Fragment>
// );

export enum Environment {
  PRODUCTION = 'PRODUCTION',
  STAGING = 'STAGING',
  LOCAL = 'LOCAL',
  CUSTOM = 'CUSTOM',
}

export type EnvironmentDefinition<T extends string, C extends EnvironmentConfigurationBase<T>> = {
  type: Environment | T;
  name: string;
  description: string;
  color?: string;
  controls?: (config: C, setConfig: (config: C) => void) => React.ReactNode;
  defaultValue?: C;
};

export type EnvironmentConfigurationBase<T extends string> = {
  type: Environment | T;
  showEnvironmentSwitcher: boolean;
};

enum EnvironmentSwitcherActionTypes {
  ENVIRONMENT_SET_CONFIGURATION = 'ENVIRONMENT_SET_CONFIGURATION',
  ENVIRONMENT_RESET_CONFIGURATION = 'ENVIRONMENT_RESET_CONFIGURATION',
  ENVIRONMENT_COMMIT_CONFIGURATION = 'ENVIRONMENT_COMMIT_CONFIGURATION',
}

type EnvironmentSwitcherAction<T extends string, C extends EnvironmentConfigurationBase<T>> =
  | {
      type: EnvironmentSwitcherActionTypes.ENVIRONMENT_SET_CONFIGURATION;
      configuration: C;
    }
  | { type: EnvironmentSwitcherActionTypes.ENVIRONMENT_RESET_CONFIGURATION }
  | { type: EnvironmentSwitcherActionTypes.ENVIRONMENT_COMMIT_CONFIGURATION };

type EnvironmentSwitcherState<T extends string, C extends EnvironmentConfigurationBase<T>> = {
  workingConfiguration: C /* working copy of configuration */;
  configuration: C /* version of the configuration used by the app */;
};

function getEnvironmentFromLocalStorage<T extends string, C extends EnvironmentConfigurationBase<T>>(
  defaultSettingValues: C,
  key = 'environment',
): C {
  const stringData = window.localStorage.getItem(key);
  if (stringData !== null) {
    let data: any;
    try {
      data = JSON.parse(stringData);
    } catch (err) {
      // If decoding from localStrage failed, then try again with the data removed from localStorage
      window.localStorage.removeItem(key);
      return getEnvironmentFromLocalStorage(defaultSettingValues, key);
    }
    return data;
  } else {
    // Return the default depending on the hostname
    let data: C;
    if (window.location.hostname.endsWith('density.rodeo')) {
      data = { type: Environment.STAGING, ...defaultSettingValues };
    } else {
      data = { type: Environment.PRODUCTION, ...defaultSettingValues };
    }

    window.localStorage.setItem(key, JSON.stringify(data));
    return data;
  }
}

export function saveEnvironmentToLocalStorage<T extends string, C extends EnvironmentConfigurationBase<T>>(
  environment: C,
  key = 'environment',
) {
  window.localStorage.setItem(key, JSON.stringify(environment));
}

function reducer<T extends string, C extends EnvironmentConfigurationBase<T>>(state: EnvironmentSwitcherState<T, C>, action: EnvironmentSwitcherAction<T, C>) {
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

type EnvironmentSwitcherProps<T extends string, C extends EnvironmentConfigurationBase<T>> = {
  environments: Array<EnvironmentDefinition<T, C>>;
  defaultSettingValues: C;
  globalControls?: (
    environment: C,
    setSelectedEnvironment: (e: C) => void
  ) => React.ReactNode;
};

// See https://stackoverflow.com/a/63279565/4115328 for more info on this syntax
export const EnvironmentSwitcher: <T extends string, C extends EnvironmentConfigurationBase<T>>(
  p: EnvironmentSwitcherProps<T, C>
) => React.ReactElement = ({ environments, defaultSettingValues, globalControls }) => {
  // FIXME: fix modal
  const visible = true;
  const [ open, setOpen ] = useState(false);

  const initialConfiguration = getEnvironmentFromLocalStorage(defaultSettingValues);
  const initialState = {
    workingConfiguration: initialConfiguration,
    configuration: initialConfiguration,
  };
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

  if (!open) {
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
        visible={visible}
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
                    Object.keys(defaultSettingValues).map((key) => [
                      key,
                      state.workingConfiguration[key],
                    ]),
                  );
                  dispatch({
                    type: EnvironmentSwitcherActionTypes.ENVIRONMENT_SET_CONFIGURATION,
                    configuration: {
                      ...defaultSettingValues,
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
                  <p>{environment.description}</p>
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
