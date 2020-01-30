import React, { useContext, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { v4 } from 'uuid';

import styles from './styles.module.scss';
import { Icons } from '..';

const TABLE_HEADER = 'TABLE_HEADER';
const TABLE_ROW = 'TABLE_ROW';
const ALIGN_TO_JUSTIFY = {
  'left': 'flex-start',
  'center': 'center',
  'right': 'flex-end'
};
const SORT_INDICATORS = {
  'asc': <div style={{marginLeft: 8, marginRight: -20}}><Icons.ArrowUp height={12} width={12} /></div>,
  'desc': <div style={{marginLeft: 8, marginRight: -20}}><Icons.ArrowDown height={12} width={12} /></div>
};

export type SortDirection = 'asc' | 'desc' | 'none';

export type SortRule = {
  column: string | null
  direction: SortDirection
}

type ListViewContextType = {
  mode: typeof TABLE_ROW | typeof TABLE_HEADER
  height: React.CSSProperties['height']
  fontSize: React.CSSProperties['fontSize']
  rowHeaderWidth: number
  item?: any
  sort?: SortRule[]
  onClickHeader?: (column: string, value: any) => void
}

// In practice, this should not be used, but a React.Context requires a default value
const DEFAULT_LIST_VIEW_CONTEXT: ListViewContextType = {
  mode: 'TABLE_ROW' as const,
  height: 0,
  fontSize: 0,
  rowHeaderWidth: 0,
}

const ListViewContext = React.createContext<ListViewContextType>(DEFAULT_LIST_VIEW_CONTEXT);

export type ListViewProps<T, C extends string> = {
  data: T[]
  sort?: SortRule[]
  onClickHeader?: (column: C, sortTemplate: (item: T) => SortableValue) => void
  onClickRow?: (item: T) => void
  keyTemplate?: (item: T) => C
  
  showHeaders?: boolean
  fixedWidth?: boolean
  padOuterColumns?: boolean
  scrollX?: boolean

  rowHeight?: React.CSSProperties['height']
  headerHeight?: React.CSSProperties['height']
  fontSize?: React.CSSProperties['fontSize']
  headerFontSize?: React.CSSProperties['fontSize']

  // HACK: this is needed because we're reading `props` out of children,
  //       which isn't defined on all React.ReactNode types (such as string or number)
  children: JSX.Element | JSX.Element[]
  // children: React.ReactNode
}

interface ObjectWithID {
  id: string | number | symbol
}

function isAnObjectWithID(thing: unknown): thing is ObjectWithID {
  if (thing instanceof Object) return thing.hasOwnProperty('id');
  return false;
}

function defaultKeyTemplate<T>(item: T) {
  if (isAnObjectWithID(item)) {
    return item.id;
  } else {
    return v4();
  }
}

/**
 * `T` is the data type of each Row,
 * `C` is the column id type (probably a union of string literals)
 */
export default function ListView<T = any, C extends string = string>(props: ListViewProps<T, C>) {

  const {
    data = [],
    sort = [],
    onClickHeader,
    onClickRow,
    keyTemplate = defaultKeyTemplate,
  
    showHeaders = true,
    fixedWidth = true,
    padOuterColumns = false,
    scrollX = false,
  
    rowHeight,
    headerHeight,
    fontSize,
    headerFontSize,
    children,
  } = props;

  // Handle scrolling with state, refs, and a listener
  const containerRef = useRef<HTMLDivElement>();
  const tableRef = useRef<HTMLTableElement>();
  const [tableShadows, setTableShadows] = useState({left: false, right: false});

  useEffect(() => {
    function shadowHandler() {
      if (scrollX) {
        const container = containerRef.current.getBoundingClientRect();
        const table = tableRef.current.getBoundingClientRect();
        const leftShadow = table.left < container.left;
        const rightShadow = table.right > container.right;
        if (tableShadows.left !== leftShadow || tableShadows.right !== rightShadow) {
          setTableShadows({left: leftShadow, right: rightShadow});
        }
      }
    }
    function cleanup() {
      window.removeEventListener('resize', shadowHandler);
      containerRef.current.removeEventListener('scroll', shadowHandler);
    }
    window.addEventListener('resize', shadowHandler);
    containerRef.current.addEventListener('scroll', shadowHandler);
    shadowHandler();
    return cleanup;
  });

  // Compute total width of "row headers"
  const rowHeaderWidth = React.Children.toArray(children).reduce((a, n) => {
    a += n.props.isRowHeader ? n.props.width : 0;
    return a;
  }, 0);

  return (
    <div className={classnames(styles.listView, {[styles.scrollX]: scrollX})}>
      <div
        ref={containerRef}
        className={classnames(styles.listViewContainer, {
          [styles.scrollX]: scrollX,
          [styles.leftShadow]: tableShadows.left,
          [styles.rightShadow]: tableShadows.right 
        })}
        style={{marginLeft: rowHeaderWidth}}
      >
        <table
          ref={tableRef}
          className={classnames(styles.listViewTable, {
            [styles.fixedWidth]: fixedWidth,
            [styles.padOuterColumns]: padOuterColumns
          })}
        >
          {showHeaders ? (
            <thead>
              <tr className={styles.listViewRow}>
                <ListViewContext.Provider value={{
                  mode: TABLE_HEADER,
                  height: headerHeight,
                  fontSize: headerFontSize,
                  rowHeaderWidth,
                  sort,
                  onClickHeader,
                }}>
                  {children}
                </ListViewContext.Provider>
              </tr>
            </thead>
          ) : null}
          <tbody>
            {data.map(item => (
              <tr
                key={keyTemplate(item)}
                className={classnames(styles.listViewRow, {
                  [styles.clickable]: Boolean(onClickRow)
                })}
                onClick={onClickRow ? () => onClickRow(item) : undefined}
              >
                <ListViewContext.Provider value={{
                  mode: TABLE_ROW,
                  height: rowHeight,
                  fontSize: fontSize,
                  rowHeaderWidth,
                  item,
                }}>
                  {children}
                </ListViewContext.Provider>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type ListViewColumnProps<T, V> = {
  id: string
  title?: React.ReactNode
  template?: (item: T) => React.ReactNode
  valueTemplate?: (item: T) => V
  onClick?: (item: T) => void
  disabled?: (item: T) => boolean
  isRowHeader?: boolean
  width?: React.CSSProperties['width']
  minWidth?: React.CSSProperties['minWidth']
  align?: keyof typeof ALIGN_TO_JUSTIFY
}

/**
 * `T` is the data type of each Row,
 * `V` is the value type returned from the valueTemplate prop
 */
export function ListViewColumn<T = any, V = any>(props: ListViewColumnProps<T, V>) {

  const {
    id,
    title = null,
    template = () => null,
    valueTemplate,
    onClick = () => {},
    disabled = () => false,
    isRowHeader = false,
  
    width = 'auto',
    minWidth = 'auto',
    align = 'left'
  } = props;

  const {
    mode,
    height,
    fontSize,
    rowHeaderWidth,
    item,
    sort,
    onClickHeader,
  } = useContext(ListViewContext);
  
  const headerClickable = Boolean(onClickHeader);
  const cellClickable = item && !disabled(item) && Boolean(onClick);
  if (mode === TABLE_HEADER) {
    const sortRuleIndex = sort.findIndex(x => x.column === id);
    const sortRule = sortRuleIndex > -1 ? sort[sortRuleIndex] : null;
    const sortIndicator = sortRule && ['asc', 'desc'].indexOf(sortRule.direction) > -1 ?
      SORT_INDICATORS[sortRule.direction] : null;
    return (
      <th
        key={id}
        className={classnames({ [styles.listViewRowHeader]: isRowHeader })}
        style={{width, minWidth, marginLeft: isRowHeader ? (-1 * rowHeaderWidth) : undefined}}
      >
        <div
          onClick={headerClickable ? () => onClickHeader(id, valueTemplate || template) : undefined}
          className={classnames(styles.listViewHeader, { [styles.clickable]: headerClickable })}
          style={{height, fontSize, justifyContent: ALIGN_TO_JUSTIFY[align]}}
        >
          {title || id}
          {sortIndicator}
        </div>
      </th>
    );
  } else {
    const contents = (
      <div
        onClick={cellClickable ? () => onClick(item) : undefined}
        className={classnames(styles.listViewCell, { [styles.clickable]: cellClickable })}
        style={{height, fontSize, justifyContent: ALIGN_TO_JUSTIFY[align]}}
      >
        {Boolean(template) && template(item)}
      </div>
    );
    return isRowHeader ? (
      <th
        scope="row"
        key={id}
        className={styles.listViewRowHeader}
        style={{width, minWidth, marginLeft: -1 * rowHeaderWidth}}
      >
        {contents}
      </th>
    ) : (
      <td key={id} style={{width, minWidth}}>
        {contents}
      </td>
    );
  }
}


export const ListViewColumnSpacer: React.FC = () => {
  return <ListViewColumn id={v4()} title=" " width="auto" />;
}

export const ListViewClickableLink: React.FC<{
  onClick: (evt: React.MouseEvent<HTMLSpanElement>) => void
}> = ({
  onClick,
  children,
}) => {
  return (
    <span role="button" className={styles.listViewClickableLink} onClick={onClick}>
      {children}
    </span>
  );
}

export type SortableValue = number | string | boolean | null | undefined;
// Helper functions
export function getDefaultSortFunction<T>(sortTemplate: (item: T) => SortableValue, sortDirection: SortDirection, nullsLast = true) {
  return function(a: T, b: T) {
    // Short circuit and return initial order if sorting is toggled off
    if (sortDirection !== 'asc' && sortDirection !== 'desc') { return 1; }

    // Pass each item through the sortTemplate function
    const aValue = sortTemplate(a),
          bValue = sortTemplate(b);

    // Invert sorting if mode is descending
    const sortMultiplier = sortDirection === 'desc' ? -1 : 1;

    // Use coercion trick to check for either null or undefined
    if (aValue == null && bValue == null) {
      return 0;
    } else if (aValue == null) {
      return nullsLast ? -1 : 1;
    } else if (bValue == null) {
      return nullsLast ? 1 : -1;
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return (aValue > bValue ? 1 : aValue < bValue ? -1 : 0) * sortMultiplier;
    } else {
      return String(aValue).localeCompare(String(bValue)) * sortMultiplier;
    }
  }
}

export function getNextSortDirection(sortDirection: SortDirection) {
  return {
    'desc': 'asc',
    'asc': 'none',
    'none': 'desc'
  }[sortDirection] as SortDirection
};
