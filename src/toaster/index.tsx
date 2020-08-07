import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import { Toast } from '..';

type ToastId = string;
type ToastOptions = {
  text: React.ReactNode,
  id: ToastId,
  type: 'default' | 'error',
  timeout: number | null,
};
type ToasterState = Array<ToastOptions & {visible: boolean}>;

// Toasts go through a few lifecycle states:
enum ToasterActionTypes {
  // - "TRANSITION_TO_SHOW_TOAST" - render the toast on screen, but invisible
  TRANSITION_TO_SHOW_TOAST = 'TRANSITION_TO_SHOW_TOAST',

  // - "TOAST_SHOW" - fade the toast in; on completion of this step, it's officially "shown"
  TOAST_SHOW = 'TOAST_SHOW',

  // - "TRANSITION_TO_HIDE_TOAST" - fade the toast out,
  TRANSITION_TO_HIDE_TOAST = 'TRANSITION_TO_HIDE_TOAST',

  // - "TOAST_SHOW" - remove the toast from the dom; on completion of this step it's officially "hidden"
  TOAST_HIDE = 'TOAST_HIDE',
}

type ToasterAction =
  | {
      type: ToasterActionTypes.TRANSITION_TO_SHOW_TOAST;
      options: ToastOptions;
    }
  | { type: ToasterActionTypes.TOAST_SHOW; id: ToastId }
  | { type: ToasterActionTypes.TRANSITION_TO_HIDE_TOAST; id: ToastId }
  | { type: ToasterActionTypes.TOAST_HIDE; id: ToastId };

function toasterReducer(state: ToasterState, action: ToasterAction): ToasterState {
  switch (action.type) {
    case ToasterActionTypes.TRANSITION_TO_SHOW_TOAST:
      return [...state, { ...action.options, visible: false }];
    case ToasterActionTypes.TOAST_SHOW:
      return state.map((toast) => {
        if (toast.id === action.id) {
          return { ...toast, visible: true };
        } else {
          return toast;
        }
      });
    case ToasterActionTypes.TRANSITION_TO_HIDE_TOAST:
      return state.map((toast) => {
        if (toast.id === action.id) {
          return { ...toast, visible: false };
        } else {
          return toast;
        }
      });
    case ToasterActionTypes.TOAST_HIDE:
      return state.filter((x) => x.id !== action.id);
    default:
      return state;
  }
}

let dispatch: React.Dispatch<ToasterAction> | null = null;

type ToasterType = React.FunctionComponent<{width?: number, top?: React.ReactText}> & {
  showToast: (options: Partial<ToastOptions>) => ToastId,
  hideToast: (id: ToastId) => void,
};
const Toaster: ToasterType = ({width=360, top=40}) => {
  const [ state, localDispatch ] = useReducer(toasterReducer, []);

  // Store a reference of dispatch outside the component. This is so that
  // showToast / hideToast can use this reference to dispatch actions outside of the
  // component's lexical context.
  useEffect(() => {
    if (dispatch !== null) {
      throw new Error(`More than one <Toaster /> is being rendered - this isn't allowed. Please render a single toaster.`);
    }

    dispatch = localDispatch;
    return () => {
      dispatch = null;
    }
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top,
        left: '50%',

        marginLeft: -1 * (width / 2),
        width,
      }}
    >
      {state.map((toast, index) => {
        const type = toast.type || 'default';
        return (
          <div key={index} style={{
            transition: 'all 100ms ease-in-out',
            height: toast.visible ? 50 : 0,
          }}>
            <Toast
              key={toast.id}
              type={type}
              visible={toast.visible}
              onDismiss={() => Toaster.hideToast(toast.id)}
            >
              {toast.text}
            </Toast>
          </div>
        );
      })}
    </div>,
    document.body,
  );
}
Toaster.displayName = 'Toaster';

Toaster.showToast = function showToast(options: Partial<ToastOptions>): ToastId {
  if (!dispatch) {
    throw new Error('Before calling Toaster.showToast, please render a <Toaster /> component.');
  }

  const optionsWithDefaults: ToastOptions = {
    text: options.text || '',
    id: options.id || uuidv4(),
    type: options.type || 'default',
    timeout: typeof options.timeout !== 'undefined' ? options.timeout : 3000,
  };

  // Add the toast to the screen, but keep it invisible
  dispatch({
    type: ToasterActionTypes.TRANSITION_TO_SHOW_TOAST,
    options: optionsWithDefaults,
  });

  // Fade in the toast so it's visible
  dispatch({
    type: ToasterActionTypes.TOAST_SHOW,
    id: optionsWithDefaults.id,
  });

  if (optionsWithDefaults.timeout !== null) {
    setTimeout(() => Toaster.hideToast(optionsWithDefaults.id), optionsWithDefaults.timeout);
  }

  return optionsWithDefaults.id;
};

Toaster.hideToast = async function hideToast(id: ToastId) {
  return new Promise((resolve) => {
    if (!dispatch) {
      throw new Error('Before calling Toaster.hideToast, please render a <Toaster /> component.');
    }
    const notNullDispatch = dispatch;

    // Fade out the toast but keep it in the dom
    dispatch({ type: ToasterActionTypes.TRANSITION_TO_HIDE_TOAST, id });

    // After fading it out is complete, then remove it.
    setTimeout(() => {
      notNullDispatch({ type: ToasterActionTypes.TOAST_HIDE, id });
      resolve();
    }, 500);
  });
};

export default Toaster;
