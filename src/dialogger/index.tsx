import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import {
  AlertDialog,
  ConfirmDialog,
  PromptDialog,
} from '..';
import { PromptDialogProps, ConfirmDialogProps, AlertDialogProps } from '../dialog';

type AlertDialogOptions = Omit<AlertDialogProps, 'visible' | 'onSubmit'>;
type ConfirmDialogOptions = Omit<ConfirmDialogProps, 'visible' | 'onSubmit' | 'onDismiss'>;
type PromptDialogOptions = Omit<PromptDialogProps, 'visible' | 'onSubmit' | 'onDismiss'>;

type DialogOptions =
  | {
    type: 'ALERT',
    options: AlertDialogOptions,
    resolve: () => void,
  }
  | {
    type: 'CONFIRM',
    options: ConfirmDialogOptions,
    resolve: (confirmed: boolean) => void,
  }
  | {
    type: 'PROMPT',
    options: PromptDialogOptions,
    resolve: (text: string | null) => void,
  };

type OpenDialogState = DialogOptions & {visible: boolean};
type DialoggerState = OpenDialogState | null;

enum DialoggerActionTypes {
  TRANSITION_TO_SHOW_DIALOG = 'TRANSITION_TO_SHOW_DIALOG',
  DIALOG_SHOW = 'DIALOG_SHOW',
  TRANSITION_TO_HIDE_DIALOG = 'TRANSITION_TO_HIDE_DIALOG',
  DIALOG_HIDE = 'DIALOG_HIDE',
}

type DialoggerAction =
  | {
      type: DialoggerActionTypes.TRANSITION_TO_SHOW_DIALOG;
      options: DialogOptions;
    }
  | { type: DialoggerActionTypes.DIALOG_SHOW }
  | { type: DialoggerActionTypes.TRANSITION_TO_HIDE_DIALOG }
  | { type: DialoggerActionTypes.DIALOG_HIDE };

function dialoggerReducer(state: DialoggerState, action: DialoggerAction): DialoggerState {
  switch (action.type) {
    case DialoggerActionTypes.TRANSITION_TO_SHOW_DIALOG:
      return { ...action.options, visible: false };

    case DialoggerActionTypes.DIALOG_SHOW:
      if (state === null) { return state; }
      return { ...state, visible: true };

    case DialoggerActionTypes.TRANSITION_TO_HIDE_DIALOG:
      if (state === null) { return state; }
      return { ...state, visible: false };

    case DialoggerActionTypes.DIALOG_HIDE:
      return null;

    default:
      return state;
  }
}

let dispatch: any = null;

type DialoggerType = React.FunctionComponent & {
  alert: (options: AlertDialogOptions) => Promise<void>,
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>,
  prompt: (options: PromptDialogOptions) => Promise<string | null>,
};

const Dialogger: DialoggerType = () => {
  const [ state, localDispatch ] = useReducer(dialoggerReducer, null);

  // Store a reference of dispatch outside the component. This is so that
  // the alert / confirm / prompt static methods can use this reference to dispatch actions outside
  // of the component's lexical context to open dialogs.
  useEffect(() => {
    if (dispatch !== null) {
      throw new Error(`More than one <Dialogger /> is being rendered - this isn't allowed. Please render a single dialogger.`);
    }
    dispatch = localDispatch;
    return () => {
      dispatch = null;
    }
  });

  const hideDialog = function() {
    dispatch({ type: DialoggerActionTypes.TRANSITION_TO_HIDE_DIALOG });
    setTimeout(() => {
      dispatch({ type: DialoggerActionTypes.DIALOG_HIDE });
    }, 500);
  };

  if (state === null) {
    return null;
  }

  switch (state.type) {
  case 'ALERT':
    return (
      <AlertDialog
        {...state.options}
        visible={state.visible}
        onSubmit={() => {
          hideDialog();
          state.resolve();
        }}
      />
    );
  case 'CONFIRM':
    return (
      <ConfirmDialog
        {...state.options}
        visible={state.visible}
        onSubmit={() => {
          hideDialog();
          state.resolve(true);
        }}
        onDismiss={() => {
          hideDialog();
          state.resolve(false);
        }}
      />
    );
  case 'PROMPT':
    return (
      <PromptDialog
        {...state.options}

        visible={state.visible}
        onSubmit={text => {
          hideDialog();
          state.resolve(text);
        }}
        onDismiss={() => {
          hideDialog();
          state.resolve(null);
        }}
      />
    );
  default:
    return null;
  }
}
Dialogger.displayName = 'Dialogger';
export default Dialogger;

const DISPATCH_UNDEFINED_ERROR = 'Please render a <Dialogger /> component at the root of the application to use the Dialogger.';

Dialogger.alert = async function(options) {
  return new Promise((resolve) => {
    if (!dispatch) {
      throw new Error(DISPATCH_UNDEFINED_ERROR);
    }
    dispatch({
      type: DialoggerActionTypes.TRANSITION_TO_SHOW_DIALOG,
      options: { type: 'ALERT', options, resolve },
    });
    dispatch({ type: DialoggerActionTypes.DIALOG_SHOW });
  });
};
Dialogger.confirm = async function(options) {
  return new Promise((resolve) => {
    if (!dispatch) {
      throw new Error(DISPATCH_UNDEFINED_ERROR);
    }
    dispatch({
      type: DialoggerActionTypes.TRANSITION_TO_SHOW_DIALOG,
      options: { type: 'CONFIRM', options, resolve },
    });
    dispatch({ type: DialoggerActionTypes.DIALOG_SHOW });
  });
};
Dialogger.prompt = async function(options) {
  return new Promise((resolve) => {
    if (!dispatch) {
      throw new Error(DISPATCH_UNDEFINED_ERROR);
    }
    dispatch({
      type: DialoggerActionTypes.TRANSITION_TO_SHOW_DIALOG,
      options: { type: 'PROMPT', options, resolve },
    });
    dispatch({ type: DialoggerActionTypes.DIALOG_SHOW });
  });
};
