import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

import Icons from '../icons';

import styles from './styles.module.scss';
import colors from '../../variables/colors.json';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'COMPACT_GRAY': styles.contextCompactGray,
  'TIME_PICKER': styles.contextTimePicker,
  'LIST_VIEW': styles.contextListView,
  'NAVBAR_INLINE': styles.contextNavbarInline,
  'ANALYTICS_CONTROL_BAR': styles.contextAnalyticsControlBar,
  'SPACE_DETAIL_CARD': styles.contextSpaceDetailCard,
  'OPEN_AREA_APP_BAR': styles.contextOpenAreaAppBar,
};

export const ANCHOR_RIGHT = 'ANCHOR_RIGHT',
  ANCHOR_LEFT = 'ANCHOR_LEFT';

export const InputBoxContext = React.createContext<string | null>(null);

const InputBoxRaw: React.FC<any> = ({leftIcon, rightIcon, forwardedRef, invalid, ...props}) => {
  const [focused, setFocus] = useState(false);
  const defaultInputRef = useRef();
  const input = forwardedRef || defaultInputRef;

  switch (props.type) {

  case 'select':
    return <SelectBox invalid={invalid} {...props} />;

  case 'textarea':
    return <textarea
      {...props}
      style={{width: props.width, height: props.height}}
      className={styles.inputBoxTextarea}
      ref={input}
    />;

  default:
    return (
      <InputBoxContext.Consumer>{context => (
        <div
          className={classnames(context && CONTEXT_CLASSES[context], styles.inputBox, {
            [styles.inputBoxDisabled]: props.disabled,
            [styles.inputBoxFocused]: focused,
            [styles.inputBoxContainsLeftIcon]: Boolean(leftIcon),
            [styles.inputBoxContainsRightIcon]: Boolean(rightIcon),
            [styles.invalid]: invalid,
          })}
          style={{width: props.width}}
          onClick={() => {
            if (input && input.current) {
              input.current.focus();
            }
          }}
        >
          {leftIcon ? <div className={styles.leftIcon}>{leftIcon}</div> : null}
          <input
            {...props}
            ref={input}
            onFocus={(...args) => {
              setFocus(true);
              if (props.onFocus) { props.onFocus(...args); }
            }}
            onBlur={(...args) => {
              setFocus(false);
              if (props.onBlur) { props.onBlur(...args); }
            }}
          />
          {rightIcon ? <div className={styles.rightIcon}>{rightIcon}</div> : null}
        </div>
      )}</InputBoxContext.Consumer>
    );
  }
};

const InputBox = React.forwardRef((props: any, ref) => (
  <InputBoxRaw {...props} forwardedRef={ref} />
));
InputBox.displayName = 'InputBox';
InputBox.propTypes = {
  type: propTypes.string,
  value: propTypes.any,
  choices: propTypes.arrayOf(propTypes.shape({
    id: propTypes.any,
    label: propTypes.node,
    disabled: propTypes.bool,
  })),
};
export default InputBox;

export class SelectBox extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
    };

    // Called when the user focuses either the value or an item in the menu part of the box.
    (this as any).onMenuFocus = () => {
      this.setState({opened: true});
    };

    // Called when the user blurs either the value or an item in the menu part of the box.
    (this as any).onMenuBlur = (e) => {
      this.setState({opened: false});
    };

    // Called when the user selects an item within the menu of the select box.
    (this as any).onMenuItemSelected = choice => {
      this.setState({opened: false}, () => {
        if (this.props.onChange) {
          const isDefault = String(choice.id).toLowerCase() === 'default';
          this.props.onChange(isDefault ? null : choice);
        }
      });
    }
  }

  render() {
    const {
      width,
      listBoxWidth,
      anchor,
      value,
      choices,
      id,
      disabled,
      placeholder,
      menuMaxHeight,
      invalid
    } = this.props;
    const { opened } = this.state;

    // Allow `value` to either be:
    // 1. The raw element in `choices` (ie, choices.indexOf(value) isn't -1)
    // 2. An id of an element in `choices`
    let selectedValue;
    if (value && !(value.id === undefined || value.id === null)) {
      selectedValue = value;
    } else if (choices) {
      selectedValue = choices.find(i => i.id === value);
    } else {
      selectedValue = null;
    }

    return <InputBoxContext.Consumer>{context => (
      <div className={classnames(context && CONTEXT_CLASSES[context], styles.inputBoxSelectBox, {
        [styles.inputBoxSelectBoxOpened]: opened,
      })} style={{width}}>
        <div
          id={id}
          ref={r => { (this as any).selectBoxValueRef = r; }}
          className={classnames(context && CONTEXT_CLASSES[context], styles.inputBoxSelectBoxValue, {
            [styles.inputBoxSelectBoxValueDisabled]: disabled,
            [styles.inputBoxSelectBoxValueOpened]: opened,
            [styles.invalid]: invalid,
          })}
          tabIndex={disabled ? -1 : 0}
          aria-expanded={opened}
          aria-autocomplete="list"

          onFocus={(this as any).onMenuFocus}
          onBlur={(this as any).onMenuBlur}
          onKeyDown={e => {
            if (e.keyCode === 27 /* escape */) {
              /* Blur the select value box, which closes the dropdown */
              (e.target as any).blur();
            }
          }}
          onMouseDown={e => {
            if (this.state.opened) {
              /* Prevent the default "focus" handler from re-opening the dropdown */
              e.preventDefault();
              /* Blur the select value box, which closes the dropdown */
              (this as any).selectBoxValueRef.blur();
            }
          }}
        >
          {selectedValue ?
            <span>{selectedValue.label}</span> :
            <span className={styles.inputBoxSelectPlaceholder}>
              {placeholder || 'No selection'}
            </span>
          }
          <div className={styles.inputBoxSelectBoxValueCaret}>
            <Icons.ChevronDown
              width={context === 'SPACE_DETAIL_CARD' ? 16 : undefined}
              color={context === 'SPACE_DETAIL_CARD' ? colors.midnightOpaque40 : undefined} />
          </div>
        </div>

        <div
          role="listbox"
          className={classnames(context && CONTEXT_CLASSES[context], styles.inputBoxSelectBoxMenu, {
            [styles.inputBoxSelectBoxMenuOpened]: opened,
            [styles.inputBoxSelectBoxMenuAnchorLeft]: (anchor || ANCHOR_LEFT) === ANCHOR_LEFT,
            [styles.inputBoxSelectBoxMenuAnchorRight]: anchor === ANCHOR_RIGHT,
          })}
          style={{
            width: listBoxWidth || width,
            maxHeight: menuMaxHeight,
          }}
        >
          <ul className={styles.inputBoxSelectBoxMenuUl}>
            {(choices || []).map(choice => {
              const { id, label, disabled } = choice;
              return <li
                key={id}
                id={`input-box-select-${String(id).replace(' ', '-')}`}
                role="option"
                className={classnames(context && CONTEXT_CLASSES[context], styles.inputBoxSelectBoxMenuLi, {
                  [styles.inputBoxSelectBoxMenuLiDisabled]: disabled,
                })}
                tabIndex={!choice.disabled && opened ? 0 : -1}
                aria-selected={selectedValue && selectedValue.id === choice.id}

                onFocus={(this as any).onMenuFocus}
                onBlur={(this as any).onMenuBlur}
                onKeyDown={e => {
                  if (e.keyCode === 13 /* enter */) {
                    /* Select this item in the menu */
                    (this as any).onMenuItemSelected(choice);
                  } else if (e.keyCode === 27 /* escape */) {
                    /* Blur this item, which closes the dropdown */
                    (e.target as any).blur();
                  }
                }}
                onMouseDown={e => {
                  /* Prevent click from focusing disabled elements */
                  if (choice.disabled) { e.preventDefault(); }
                }}
                onClick={() => {
                  /* Allow click to select elements that aren't disabled */
                  if (!choice.disabled) { (this as any).onMenuItemSelected(choice); }
                }}
              >
                {label}
              </li>;
            })}
          </ul>
        </div>
      </div>
    )}</InputBoxContext.Consumer>;
  }
}

// SelectBox.displayName = 'SelectBox';
// SelectBox.propTypes = {
//   value: propTypes.any,
//   choices: propTypes.arrayOf(propTypes.shape({
//     id: propTypes.any,
//     label: propTypes.node,
//     disabled: propTypes.bool,
//   })),
//   menuMaxHeight: propTypes.number,
//   placeholder: propTypes.string,
// };
