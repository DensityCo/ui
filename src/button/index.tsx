import React, { useContext } from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

import styles from './styles.scss';

export const ButtonContext = React.createContext<any>(null);

const BUTTON_SIZE_STYLES = {
  small: styles.small,
  large: styles.large,
};

export const BUTTON_VARIANT_STYLES = {
  default: styles.default,
  filled: styles.filled,
  underline: styles.underline,
};

export const BUTTON_TYPE_STYLES = {
  primary: styles.primary,
  danger: styles.danger,
  warning: styles.warning,
  success: styles.success,
  muted: styles.muted,
};

export default function Button({
  size,
  children,
  disabled,
  variant,
  type,

  width,
  height,

  href,
  ...props
}: any) {
  const context = useContext(ButtonContext);
  if (href) {
    return (
      <a
        {...props}
        disabled={disabled}
        className={classnames(
          styles.button,
          BUTTON_TYPE_STYLES[type],
          BUTTON_VARIANT_STYLES[variant],
          BUTTON_SIZE_STYLES[size],
        )}
        style={{ width, height }}
        href={href}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        {...props}
        disabled={disabled}
        className={classnames(
          styles.button,
          BUTTON_TYPE_STYLES[type],
          BUTTON_VARIANT_STYLES[variant],
          BUTTON_SIZE_STYLES[size],
        )}
        style={{ width, height }}
      >
        {children}
      </button>
    );
  }
}
Button.displayName = 'Button';
Button.defaultProps = {
  variant: 'default',
  type: 'primary',
};
Button.propTypes = {
  variant: propTypes.oneOf(['default', 'filled', 'underline']),
  type: propTypes.oneOf([
    'primary',
    'danger',
    'warning',
    'success',
    'muted',
  ]),
};

export function ButtonGroup({ children }: any) {
  return (
    <div className={styles.buttonGroup}>
      {children}
    </div>
  );
}
ButtonGroup.displayName = 'ButtonGroup';
