import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

import styles from './styles.module.scss';

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

const Button: React.FC<any> = ({
  ref,
  size,
  children,
  disabled,
  variant,
  type,

  width,
  height,

  href,
  ...props
}) => {
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
        forwardedRef={ref}
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
        forwardedRef={ref}
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
export default Button;

export const ButtonGroup: React.FC<any> = ({ children }) => {
  return (
    <div className={styles.buttonGroup}>
      {children}
    </div>
  );
}
ButtonGroup.displayName = 'ButtonGroup';
