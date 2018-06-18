import * as React from 'react';
import classnames from 'classnames';

import { IconChevronDown } from '@density/ui-icons';

export default function InputBox(props) {
  switch (props.type) {
  // Selects need a custom class added to them so that they'll hide the caret and add some padding
  // to the right.
  case 'select':
    return <SelectBox {...props} />;
  case 'textarea':
    return <textarea
      {...props}
      className={classnames(
        'input-box',
        'input-box-textarea',
        props.className
      )}
    />;
  default:
    return <input
      {...props}
      className={classnames(
        'input-box',
        props.disabled ? 'input-box-disabled' : null,
        props.className
      )}
    />;
  }
}


export class SelectBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
    };

    // Called when the user focuses either the value or an item in the menu part of the box.
    this.onMenuFocus = () => {
      this.setState({opened: true});
    };

    // Called when the user blurs either the value or an item in the menu part of the box.
    this.onMenuBlur = () => {
      this.setState({opened: false});
    };

    // Called when the user selects an item within the menu of the select box.
    this.onMenuItemSelected = choice => {
      this.setState({opened: false}, () => {
        if (this.props.onChange) {
          const isDefault = String(choice.id).toLowerCase() === 'default';
          this.props.onChange(isDefault ? null : choice);
        }
      });
    }
  }

  render() {
    const { value, choices, className, id, disabled } = this.props;
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

    return <div className={classnames('input-box-select-box', className)}>
      <div
        id={id}
        ref={r => { this.selectBoxValueRef = r; }}
        className={classnames(`input-box-select-box-value`, {disabled, opened})}
        tabIndex={disabled ? -1 : 0}
        aria-expanded={opened}
        aria-autocomplete="list"

        onFocus={this.onMenuFocus}
        onBlur={this.onMenuBlur}
        onKeyDown={e => {
          if (e.keyCode === 27 /* escape */) {
            /* Blur the select value box, which closes the dropdown */
            e.target.blur();
          }
        }}
        onMouseDown={e => {
          if (this.state.opened) {
            /* Prevent the default "focus" handler from re-opening the dropdown */
            e.preventDefault();
            /* Blur the select value box, which closes the dropdown */
            this.selectBoxValueRef.blur();
          }
        }}
      >
        {selectedValue ?
          <span>{selectedValue.label}</span> :
          <span className="input-box-select-placeholder">No selection</span>
        }
        <div className="input-box-caret">
          <IconChevronDown color="primary" width={12} height={12} />
        </div>
      </div>

      <div
        role="listbox"
        className={classnames('input-box-select-box-menu', {opened})}
      >
        <ul>
          {(choices || []).map(choice => {
            const { id, label, disabled } = choice;
            return <li
              key={id}
              id={`input-box-select-${String(id).replace(' ', '-')}`}
              role="option"
              className={classnames('input-box-select-box-menu-item', { disabled })}
              tabIndex={!choice.disabled && opened ? 0 : -1}
              aria-selected={selectedValue && selectedValue.id === choice.id}

              onFocus={this.onMenuFocus}
              onBlur={this.onMenuBlur}
              onKeyDown={e => {
                if (e.keyCode === 13 /* enter */) {
                  /* Select this item in the menu */
                  this.onMenuItemSelected(choice);
                } else if (e.keyCode === 27 /* escape */) {
                  /* Blur this item, which closes the dropdown */
                  e.target.blur();
                }
              }}
              onMouseDown={e => {
                /* Prevent click from focusing disabled elements */
                if (choice.disabled) { e.preventDefault(); }
              }}
              onClick={() => {
                /* Allow click to select elements that aren't disabled */
                if (!choice.disabled) { this.onMenuItemSelected(choice); }
              }}
            >
              {label}
            </li>;
          })}
        </ul>
      </div>
    </div>;
  }
}
