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
export type AlertDialogProps = DialogBaseProps & {
  prompt: React.ReactNode,
  onSubmit: () => void,

  title?: React.ReactNode,
  confirmText?: React.ReactNode,
};

export const AlertDialog: React.FunctionComponent<AlertDialogProps> = ({
  title='Alert',
  prompt,
  confirmText='OK',
  onSubmit,
  ...modalProps
}) => (
  <Modal width={480} {...modalProps} onBlur={onSubmit} onEscape={onSubmit}>
    <div className={styles.dialogConfirm}>
      <AppBar>
        <AppBarTitle>{title}</AppBarTitle>
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
                {confirmText}
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
export type ConfirmDialogProps = DialogBaseProps & {
  prompt: React.ReactNode,
  onSubmit: () => void,
  onDismiss: () => void,

  title?: React.ReactNode,
  confirmText?: React.ReactNode,
  cancelText?: React.ReactNode,
};

export const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = ({
  title="Confirm",
  prompt,
  confirmText="Confirm",
  cancelText="Cancel",
  onSubmit,
  onDismiss,
  ...modalProps
}) => (
  <Modal width={480} {...modalProps} onBlur={onDismiss} onEscape={onDismiss}>
    <div className={styles.dialogConfirm}>
      <AppBar>
        <AppBarTitle>{title}</AppBarTitle>
      </AppBar>
      <div className={styles.dialogConfirmContent}>
        {prompt}
      </div>
      <AppBarContext.Provider value="BOTTOM_ACTIONS">
        <AppBar>
          <AppBarSection />
          <AppBarSection>
            <ButtonGroup>
              <Button variant="underline" onClick={onDismiss}>{cancelText}</Button>
              <Button
                variant="filled"
                type="primary"
                onClick={() => onSubmit()}
              >
                {confirmText}
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
export type PromptDialogProps = DialogBaseProps & {
  prompt: React.ReactNode,
  onSubmit: (text: string) => void,
  onDismiss: () => void,

  title?: React.ReactNode,
  placeholder?: React.ReactNode,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  confirmText?: React.ReactNode,
  cancelText?: React.ReactNode,
  initialText?: string,
  emptyValueIsInvalid?: boolean,
};

export const PromptDialog: React.FunctionComponent<PromptDialogProps> = ({
  title='Prompt',
  prompt,
  confirmText='Submit',
  cancelText='Cancel',
  onSubmit,
  onDismiss,
  placeholder,
  leftIcon,
  rightIcon,
  initialText,
  emptyValueIsInvalid,
  ...modalProps
}) => {
  const [ text, setText ] = useState(initialText || '');

  // When a prompt is shown, auto focus its text box.
  const textBoxRef = useRef(null);
  useEffect(() => {
    if (textBoxRef && textBoxRef.current) {
      (textBoxRef as any).current.focus();
    }
  }, [modalProps.visible, textBoxRef]);

  const disabled = emptyValueIsInvalid && text.length === 0;

  return (
    <Modal width={480} {...modalProps} onBlur={onDismiss} onEscape={onDismiss}>
      <div className={styles.dialogPrompt}>
        <AppBar>
          <AppBarTitle>{title}</AppBarTitle>
        </AppBar>
        <div className={styles.dialogPromptContent}>
          {prompt ? (
            <div className={styles.dialogPromptLabel}>
              {prompt}
            </div>
          ) : null}
          <InputBox
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={placeholder}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            width="100%"
            onKeyDown={e => {
              if (!disabled && e.key === 'Enter') {
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
                <Button variant="underline" onClick={onDismiss}>{cancelText}</Button>
                <Button
                  variant="filled"
                  type="primary"
                  disabled={disabled}
                  onClick={() => onSubmit(text)}
                >
                  {confirmText}
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
