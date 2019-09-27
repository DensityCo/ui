import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

export const ButtonContext = React.createContext(null);

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

type ButtonProps = {
	size?: 'small' | 'large',
	disabled?: boolean,
	variant?: keyof typeof BUTTON_VARIANT_STYLES,
	type?: keyof typeof BUTTON_TYPE_STYLES,
	width?: number | string,
	height?: number | string,
	href?: string,
	[otherProp: string]: any,
};

export const Button: React.FunctionComponent<ButtonProps> = ({
  size,
  children,
  disabled,
  variant = 'default',
  type = 'primary',

  width,
  height,

  href,
  ...props
}) => {
  const context = React.useContext(ButtonContext);
  if (href) {
    return (
      <a
        {...props}
        aria-disabled={disabled}
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
export default Button;

export const ButtonGroup: React.FunctionComponent<{}> = ({ children }) => (
	<div className={styles.buttonGroup}>
		{children}
	</div>
);
ButtonGroup.displayName = 'ButtonGroup';
