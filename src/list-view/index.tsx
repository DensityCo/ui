import React, { useContext, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { v4 } from 'uuid';

import styles from './styles.module.scss';
import { Icons } from '..';

const TABLE_HEADER = 'TABLE_HEADER',
  TABLE_ROW = 'TABLE_ROW',
  ALIGN_TO_JUSTIFY = {
    'left': 'flex-start',
    'center': 'center',
    'right': 'flex-end'
  },
  SORT_INDICATORS = {
    'asc': <div style={{marginLeft: 8, marginRight: -20}}><Icons.ArrowUp height={12} width={12} /></div>,
    'desc': <div style={{marginLeft: 8, marginRight: -20}}><Icons.ArrowDown height={12} width={12} /></div>
  };

const ListViewContext = React.createContext({} as {
  mode?: typeof TABLE_HEADER | typeof TABLE_ROW,
  height?: number,
  fontSize?: number,
  rowHeaderWidth?: number,
  item?,
  sort?,
  onClickHeader?,
});

export default function ListView({
  data = [],
  sort = [],
  onClickHeader = null,
  onClickRow = null,
  keyTemplate = item => item.id || v4(),

  showHeaders = true,
  fixedWidth = true,
  padOuterColumns = false,
  scrollX = false,

  rowHeight = undefined,
  headerHeight = undefined,
  fontSize = undefined,
  headerFontSize = undefined,
  children = null,
}) {

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
                onClick={onClickRow ? () => onClickRow(item) : null}
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

export function ListViewColumn({
  id,
  title = null,
  template = null as any,
  valueTemplate = null,
  onClick = null,
  disabled = item => false,
  isRowHeader = false,

  width = 'auto' as string | number,
  minWidth = 'auto' as string | number,
  align = 'left'
}) {

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
          onClick={headerClickable ? () => onClickHeader(id, valueTemplate || template) : null}
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
        onClick={cellClickable ? () => onClick(item) : null}
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


export function ListViewColumnSpacer() {
  return <ListViewColumn id={v4()} title=" " width="auto" />;
}


// type ListViewClickableLinkProps = {
//   onClick?: () => any,
//   children: ReactNode
// }

export function ListViewClickableLink({ onClick, children }) {
  return (
    <span role="button" className={styles.listViewClickableLink} onClick={onClick}>
      {children}
    </span>
  );
}


// Helper functions
export function getDefaultSortFunction(sortTemplate, sortDirection, nullsLast = true) {
  return function(a, b) {
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

export function getNextSortDirection(sortDirection) {
  return {
    'desc': 'asc',
    'asc': 'none',
    'none': 'desc'
  }[sortDirection]
};
