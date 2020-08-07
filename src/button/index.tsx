import React, { Fragment } from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

import styles from './styles.module.scss';

export const ButtonContext = React.createContext<any>(null);

export const BUTTON_SIZE_STYLES = {
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

type ButtonPropsBase = {
  size?: keyof typeof BUTTON_SIZE_STYLES
  variant?: keyof typeof BUTTON_VARIANT_STYLES
  type?: keyof typeof BUTTON_TYPE_STYLES
  disabled?: boolean
  width?: React.CSSProperties['width']
  height?: React.CSSProperties['height']
  href?: React.HTMLProps<HTMLAnchorElement>['href']
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
};

type NativeButtonProps = React.HTMLProps<HTMLButtonElement>;

// Allow passing native button props, but Omit those that we define in ButtonPropsBase so they don't conflict
type ButtonProps = Omit<NativeButtonProps, keyof ButtonPropsBase> & ButtonPropsBase;

const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const {
    size,
    variant = 'default',
    type = 'primary',
    disabled,
    leftIcon,
    rightIcon,
    
    width,
    height,
    
    href,
    children,
    ...otherProps
  } = props;

  let contents = children;
  if (leftIcon) {
    contents = (
      <Fragment>
        <div className={classnames(styles.icon, styles.left)}>
          {leftIcon}
        </div>
        {contents}
      </Fragment>
    );
  }
  if (rightIcon) {
    contents = (
      <Fragment>
        {contents}
        <div className={classnames(styles.icon, styles.right)}>
          {rightIcon}
        </div>
      </Fragment>
    );
  }

  if (href) {
    return (
      <a
        className={classnames(
          styles.button,
          BUTTON_TYPE_STYLES[type],
          BUTTON_VARIANT_STYLES[variant],
          size && BUTTON_SIZE_STYLES[size],
        )}
        style={{ width, height }}
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(otherProps as any as React.HTMLProps<HTMLAnchorElement>)}
      >
        {contents}
      </a>
    );
  } else {
    return (
      <button
        disabled={disabled}
        className={classnames(
          styles.button,
          BUTTON_TYPE_STYLES[type],
          BUTTON_VARIANT_STYLES[variant],
          size && BUTTON_SIZE_STYLES[size],
        )}
        style={{ width, height }}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...otherProps}
      >
        {contents}
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

export const ButtonGroup: React.FunctionComponent = ({ children }) => {
  return (
    <div className={styles.buttonGroup}>
      {children}
    </div>
  );
}
ButtonGroup.displayName = 'ButtonGroup';
