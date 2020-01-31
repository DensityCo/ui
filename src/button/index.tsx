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

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  size?: keyof typeof BUTTON_SIZE_STYLES
  variant?: keyof typeof BUTTON_VARIANT_STYLES
  type?: keyof typeof BUTTON_TYPE_STYLES
  disabled?: boolean
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
  href?: React.HTMLProps<HTMLAnchorElement>['href']
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(({
  size,
  children,
  disabled,
  variant = 'default',
  type = 'primary',

  width,
  height,

  href,
  ...props
}, ref) => {
  if (href) {
    return (
      <a
        {...(props as any as React.HTMLProps<HTMLAnchorElement>)}
        className={classnames(
          styles.button,
          BUTTON_TYPE_STYLES[type],
          BUTTON_VARIANT_STYLES[variant],
          BUTTON_SIZE_STYLES[size],
        )}
        style={{ width, height }}
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
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
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        {children}
      </button>
    );
  }
});
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

export const ButtonGroup: React.FC = ({ children }) => {
  return (
    <div className={styles.buttonGroup}>
      {children}
    </div>
  );
}
ButtonGroup.displayName = 'ButtonGroup';
