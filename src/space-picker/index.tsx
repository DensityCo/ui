import React, { useContext, useState, Component, Fragment } from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';

import {
  Icons,
  InputBox,
  AppBar,
  RadioButton,
  AppBarContext,
} from '..';
import Checkbox from '../checkbox';

import colorVariables from '../../variables/colors.json';

import { spaceHierarchySearcher } from '@density/lib-space-helpers';
import { DisplaySpaceHierarchyNode } from '@density/lib-space-helpers/types';

export enum SpacePickerSelectControlTypes {
  RADIOBUTTON = 'RADIOBUTTON',
  CHECKBOX = 'CHECKBOX',
  NONE = 'NONE',
};

type SpacePickerProps = {
  value: Array<DisplaySpaceHierarchyNode> | Array<string> | DisplaySpaceHierarchyNode | string | null,
  onChange: (SpaceHierarchyDisplayItem) => any,
  formattedHierarchy: Array<DisplaySpaceHierarchyNode>,

  showSearchBox?: boolean,
  searchBoxPlaceholder?: string,
  placeholder?: string,
  height?: React.ReactText,
  canSelectMultiple?: boolean,
  selectControl?: SpacePickerSelectControlTypes,
  isItemDisabled?: (SpaceHierarchyDisplayItem) => boolean,
  onCloseDropdown?: () => void,
  disabled?: boolean,
};

function convertValueToSpaceIds(
  value: Array<DisplaySpaceHierarchyNode> | Array<string> | DisplaySpaceHierarchyNode | string | null,
  canSelectMultiple: boolean,
): Array<string> {
  // Extract the id out of value
  if (canSelectMultiple) {
    if (!Array.isArray(value)) {
      throw new Error('Space Picker value prop is not an array, but `canSelectMultiple` is true! This is not a valid state.');
    }
    if (value.length === 0) {
      return [];
    } else if (typeof value[0] === 'string') {
      // An array of ids: ['spc_xxx', 'spx_abc']
      return value as Array<string>;
    } else {
      // An array of formatted hierarchy items:
      // - [{space: {id: 'spc_xxx', ...}, ...}]
      return (value as Array<DisplaySpaceHierarchyNode>).map(v => v.space.id);
    }
  } else {
    if (Array.isArray(value)) {
      throw new Error('Space Picker value prop is an array, but `canSelectMultiple` is false! This is not a valid state.');
    }
    if (!value) {
      // No value is selected
      return [];
    } else if (typeof value === 'string') {
      // A single id: 
      return [value];
    } else {
      // An single formatted hierarchy item:
      // - {space: {id: 'spc_xxx', ...}, ...}
      return [value.space.id];
    }
  }
}

export const SpacePickerContext = React.createContext<"CARD_PICKER" | null>(null);

export const SpacePicker: React.FunctionComponent<SpacePickerProps> = ({
  value,
  onChange,
  formattedHierarchy,

  canSelectMultiple=false,
  isItemDisabled=(s) => false,
  height,
  showSearchBox=true,
  searchBoxPlaceholder=`ex: "New York"`,
  onCloseDropdown=() => {},
  selectControl=undefined,
  disabled=false,
}) => {
  const cardPickerContext = useContext(SpacePickerContext) === 'CARD_PICKER';
  const [searchText, setSearchText] = useState('');

  const selectedSpaceIds = convertValueToSpaceIds(value, canSelectMultiple);

  // The select control is the control to the left of each space that can be clicked to select it.
  const defaultSelectControl = canSelectMultiple ? SpacePickerSelectControlTypes.CHECKBOX : SpacePickerSelectControlTypes.RADIOBUTTON;
  selectControl = selectControl || defaultSelectControl;

  if (searchText.length > 0) {
    formattedHierarchy = spaceHierarchySearcher(formattedHierarchy, searchText);
  }

  // This function normalizes the difference between when `canSelectMultiple` is set or unset.
  function callOnChange(item, isChecked) {
    if (canSelectMultiple) {
      if (isChecked) {
        onChange(
          [...selectedSpaceIds, item.space.id]
          .map(id => formattedHierarchy.find(h => h.space.id === id))
        );
      } else {
        onChange(
          selectedSpaceIds
          .filter(id => id !== item.space.id)
          .map(id => formattedHierarchy.find(h => h.space.id === id))
        );
      }
    } else {
      onChange(item);
    }
  }

  return (
    <Fragment>
      {showSearchBox ? <div className={styles.searchBar} style={{backgroundColor: cardPickerContext ? 'transparent' : undefined}}>
        <AppBarContext.Provider value={cardPickerContext ? 'TRANSPARENT' : 'NORMAL'}>
          <AppBar padding={cardPickerContext ? 0 : undefined}>
            <InputBox
              type="text"
              leftIcon={<Icons.Search />}
              placeholder={searchBoxPlaceholder}
              width="100%"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              disabled={disabled}
            />
          </AppBar>
        </AppBarContext.Provider>
      </div> : null}

      <div className={styles.scrollContainer} style={{height}}>
        {formattedHierarchy.map(item => {
          const spaceDisabled = disabled || !item.space.has_purview || isItemDisabled(item);
          const isChecked = Boolean(selectedSpaceIds.find(id => id === item.space.id));

          return (
            <div
              key={item.space.id}
              className={classnames(styles.item, `space-type-${item.space.space_type}`, {
                [styles.depth0]: item.depth === 0,
                [styles.disabled]: spaceDisabled,
              })}
              style={{marginLeft: item.depth * 24, paddingLeft: cardPickerContext ? 0 : undefined}}
              onMouseUp={e => {
                if (!spaceDisabled) {
                  callOnChange(item, !isChecked);
                }
                // If only one item can be selected, close the dropdown if this control is in a dropdown.
                if (!canSelectMultiple) {
                  onCloseDropdown();
                }
              }}
            >
              {selectControl === SpacePickerSelectControlTypes.RADIOBUTTON ? (
                <RadioButton
                  disabled={spaceDisabled}
                  checked={isChecked}
                  onChange={e => {}}
                />
              ) : null}
              {selectControl === SpacePickerSelectControlTypes.CHECKBOX ? (
                <Checkbox
                  disabled={spaceDisabled}
                  checked={isChecked}
                  color={colorVariables.blue}
                  onChange={e => {}}
                />
              ) : null}

              {item.space.space_type === 'building' ? (
                <span className={styles.itemIcon}>
                  <Icons.Building
                    color={isChecked ? colorVariables.midnight : colorVariables.gray500}
                  />
                </span>
              ) : null}
              {item.space.space_type === 'floor' ? (
                <span className={styles.itemIcon}>
                  <Icons.Floor
                    color={isChecked ? colorVariables.midnight : colorVariables.gray500}
                  />
                </span>
              ) : null}
              {item.space.space_type === 'space' && selectControl === SpacePickerSelectControlTypes.NONE ? (
                <span className={styles.itemIcon} style={{transform: `translate(0, -4px)`}}>
                  <Icons.L
                    color={isChecked ? colorVariables.midnight : colorVariables.gray500}
                  />
                </span>
              ) : null}

              <span
                className={classnames(styles.itemName, {
                  [styles.bold]: ['campus', 'building', 'floor'].includes(item.space.space_type),
                  [styles.disabled]: spaceDisabled,
                  [styles.selected]: selectControl === SpacePickerSelectControlTypes.NONE && isChecked,
                })}
              >
                {item.space.name}
              </span>
            </div>
          );
        })}
      </div>
    </Fragment>
  )
}
export default SpacePicker;

type SpacePickerDropdownProps = SpacePickerProps & {
  width?: React.ReactText,
  dropdownWidth?: React.ReactText;
};

export class SpacePickerDropdown extends Component<SpacePickerDropdownProps, {opened: boolean}> {
  state = {
    opened: false,
  };

  render() {
    let {
      value,
      placeholder,
      width,
      height,
      dropdownWidth,
      searchBoxPlaceholder,
      formattedHierarchy,
      canSelectMultiple,
      isItemDisabled,
      onChange,
    } = this.props;

    isItemDisabled = typeof isItemDisabled === 'undefined' ? s => false : isItemDisabled;
    canSelectMultiple = typeof canSelectMultiple === 'undefined' ? false : canSelectMultiple;
    height = typeof height === 'undefined' ? 256 : height;

    const { opened } = this.state;

    // Calculate a list of space names for all spaces that this space picker has selected
    const selectedSpaceNames = convertValueToSpaceIds(value, canSelectMultiple)
      .map(id => formattedHierarchy.find(h => h.space.id === id))
      .filter(hierarchyItem => typeof hierarchyItem !== 'undefined')
      .map((hierarchyItem: any) => hierarchyItem.space.name);

    return (
      <Fragment>
        <div
          className={classnames(styles.backdrop, {[styles.visible]: opened})}
          onClick={() => this.setState({opened: false})}
        />

        <div className={styles.spacePicker} style={{width}}>
          <div
            className={classnames(styles.box, {[styles.focus]: opened})}
            // When focused, open the select box
            tabIndex={0}
            onFocus={e => {
              e.preventDefault();
              this.setState({opened: true});
            }}
            onMouseDown={() => {
              this.setState({opened: !opened});
            }}
          >
            {selectedSpaceNames.length > 0 ? (
              <span>{selectedSpaceNames.length > 1 ? `${selectedSpaceNames.length} spaces selected` : selectedSpaceNames[0]}</span>
            ) : (
              <span className={styles.placeholder}>
                {placeholder || `No ${canSelectMultiple ? 'spaces' : 'space'} selected`}
              </span>
            )}
            <span className={classnames(styles.chevron)}>
              <Icons.ChevronDown color={colorVariables.gray700} />
            </span>
          </div>

            <div className={classnames(styles.popup, {[styles.visible]: opened})} style={{width: dropdownWidth}}>
              <SpacePicker
                value={value}
                onChange={onChange}

                searchBoxPlaceholder={searchBoxPlaceholder}
                formattedHierarchy={formattedHierarchy}
                canSelectMultiple={canSelectMultiple}
                isItemDisabled={isItemDisabled}
                height={height}
                onCloseDropdown={() => this.setState({opened: false})}
              />
            </div>
        </div>
      </Fragment>
    );
  }
}
