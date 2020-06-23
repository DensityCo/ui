import React, { useRef, useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

import {
  AppBar,
  AppBarTitle,
  AppBarSection,
  AppBarContext,
  ButtonGroup,
  Button,
  Modal,
  InputBox,
} from '..';

type DialogBaseProps = {
  // From modal
  visible: boolean,
  width?: React.ReactText,
  height?: React.ReactText,
};

// ----------------------------------------------------------------------------
// ALERT DIALOG
// ----------------------------------------------------------------------------
type AlertDialogProps = DialogBaseProps & {
  prompt: React.ReactNode,
  onSubmit: () => void,

  title?: React.ReactNode,
  confirmText?: React.ReactNode,
};

export const AlertDialog: React.FunctionComponent<AlertDialogProps> = ({title, prompt, confirmText, onSubmit, ...modalProps}) => (
  <Modal width={480} {...modalProps} onBlur={onSubmit} onEscape={onSubmit}>
    <div className={styles.dialogConfirm}>
      <AppBar>
        <AppBarTitle>{title || 'Alert'}</AppBarTitle>
      </AppBar>
      <div className={styles.dialogConfirmContent}>
        {prompt}
      </div>
      <AppBarContext.Provider value="BOTTOM_ACTIONS">
        <AppBar>
          <AppBarSection />
          <AppBarSection>
            <ButtonGroup>
              <Button
                variant="filled"
                type="primary"
                onClick={() => onSubmit()}
              >
                {confirmText || 'OK'}
              </Button>
            </ButtonGroup>
          </AppBarSection>
        </AppBar>
      </AppBarContext.Provider>
    </div>
  </Modal>
);
AlertDialog.displayName = 'AlertDialog';

// ----------------------------------------------------------------------------
// CONFIRM DIALOG
// ----------------------------------------------------------------------------
type ConfirmDialogProps = DialogBaseProps & {
  prompt: React.ReactNode,
  onSubmit: () => void,
  onDismiss: () => void,

  title?: React.ReactNode,
  confirmText?: React.ReactNode,
};

export const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = ({title, prompt, confirmText, onSubmit, onDismiss, ...modalProps}) => (
  <Modal width={480} {...modalProps} onBlur={onDismiss} onEscape={onDismiss}>
    <div className={styles.dialogConfirm}>
      <AppBar>
        <AppBarTitle>{title || 'Confirm'}</AppBarTitle>
      </AppBar>
      <div className={styles.dialogConfirmContent}>
        {prompt}
      </div>
      <AppBarContext.Provider value="BOTTOM_ACTIONS">
        <AppBar>
          <AppBarSection />
          <AppBarSection>
            <ButtonGroup>
              <Button variant="underline" onClick={onDismiss}>Cancel</Button>
              <Button
                variant="filled"
                type="primary"
                onClick={() => onSubmit()}
              >
                {confirmText || 'Confirm'}
              </Button>
            </ButtonGroup>
          </AppBarSection>
        </AppBar>
      </AppBarContext.Provider>
    </div>
  </Modal>
);
ConfirmDialog.displayName = 'ConfirmDialog';

// ----------------------------------------------------------------------------
// PROMPT DIALOG
// ----------------------------------------------------------------------------
type PromptDialogProps = DialogBaseProps & {
  prompt: React.ReactNode,
  onSubmit: (text: string) => void,
  onDismiss: () => void,

  title?: React.ReactNode,
  placeholder?: React.ReactNode,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  confirmText?: React.ReactNode,
};

export const PromptDialog: React.FunctionComponent<PromptDialogProps> = ({title, prompt, confirmText, onSubmit, onDismiss, placeholder, leftIcon, rightIcon, ...modalProps}) => {
  const [ text, setText ] = useState('');

  // When a prompt is shown, auto focus its text box.
  const textBoxRef = useRef(null);
  useEffect(() => {
    if (textBoxRef && textBoxRef.current) {
      (textBoxRef as any).current.focus();
    }
  }, [modalProps.visible, textBoxRef]);

  return (
    <Modal width={480} {...modalProps} onBlur={onDismiss} onEscape={onDismiss}>
      <div className={styles.dialogPrompt}>
        <AppBar>
          <AppBarTitle>{title || 'Prompt'}</AppBarTitle>
        </AppBar>
        <div className={styles.dialogPromptContent}>
          {prompt ? (
            <div className={styles.dialogPromptLabel}>
              {prompt}
            </div>
          ) : null}
          <InputBox
            type="text"
            value={text || ''}
            onChange={e => setText(e.target.value)}
            placeholder={placeholder}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            width="100%"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                onSubmit(text);
              }
            }}
            ref={textBoxRef}
          />
        </div>
        <AppBarContext.Provider value="BOTTOM_ACTIONS">
          <AppBar>
            <AppBarSection></AppBarSection>
            <AppBarSection>
              <ButtonGroup>
                <Button variant="underline" onClick={onDismiss}>Cancel</Button>
                <Button
                  variant="filled"
                  type="primary"
                  onClick={() => onSubmit(text)}
                >
                  {confirmText || 'Submit'}
                </Button>
              </ButtonGroup>
            </AppBarSection>
          </AppBar>
        </AppBarContext.Provider>
      </div>
    </Modal>
  );
};
PromptDialog.displayName = 'PromptDialog';
