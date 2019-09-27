import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import styles from './styles.scss';

type ModalProps = {
	visible: boolean,
	width?: React.ReactText,
	height?: React.ReactText,
	onBlur?: () => void,
	onEscape?: () => void,
};

const Modal: React.FunctionComponent<ModalProps> = ({
  visible,
  width, 
  height,
  children,
  onBlur,
  onEscape,
}) => {
  const dialog = useRef(null);
  const container = useRef(null);
  useEffect(() => {
    dialog.current.focus();
    container.current.scrollTop = 0;
  }, [visible]);

  const inlineStyle: Any<FixInRefactor> = {};
  if (width) {
    inlineStyle.width = '100%';
    inlineStyle.maxWidth = width;
  }
  if (height) {
    inlineStyle.height = height;
  }

  return ReactDOM.createPortal(
    <div
      tabIndex={0}
      className={classnames(styles.dashboardModalBackdrop, {[styles.visible]: visible})}
      onKeyDown={e => e.keyCode === 27 && onEscape && onEscape()}
      onMouseDown={() => onBlur()}
      ref={container}
    >
      <div
        ref={dialog}
        tabIndex={0}
        className={styles.dashboardModalDialog}
        style={inlineStyle}
        onMouseDown={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

Modal.displayName = 'Modal';
export default Modal;
