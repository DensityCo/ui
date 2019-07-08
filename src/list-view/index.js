import React, { useContext } from 'react';
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
  SORT_ICONS = {
    'asc': <Icons.ArrowUp height={10} />,
    'desc': <Icons.ArrowDown height={10} />
  };

const ListViewContext = React.createContext({});

export default function ListView({
  data = [],
  keyTemplate = item => item.id,
  showHeaders = true,
  sortColumn = null,
  sortDirection = null,
  onChangeSort = () => null,
  children = null,
}) {
  return (
    <table className={styles.listView}>
      {showHeaders ? (
        <thead>
          <tr>
            <ListViewContext.Provider value={{
              mode: TABLE_HEADER,
              sortColumn,
              sortDirection,
              onChangeSort
            }}>
              {children}
            </ListViewContext.Provider>
          </tr>
        </thead>
      ) : null}
      <tbody>
        {data.map(item => (
          <tr key={keyTemplate(item)}>
            <ListViewContext.Provider value={{ mode: TABLE_ROW, item }}>
              {children}
            </ListViewContext.Provider>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


// type ListViewColumnProps = {
//   id?: any,
//   title?: any,
//   template?: any,
//   onClick?: (any) => any,
//   disabled?: (any) => boolean,
//   width?: string | number,
//   minWidth?: string | number,
// }

export function ListViewColumn(props) {

  const {
    id,
    title = null,
    template = null,
    onClick = null,
    disabled = item => false,
  
    width = 'auto',
    minWidth = 'auto',
    align = 'left'
  } = props;

  const {
    mode,
    item,
    sortColumn,
    sortDirection,
    onChangeSort
  } = useContext(ListViewContext);
  
  const headerClickable = Boolean(onChangeSort);
  const cellClickable = item && !disabled(item) && Boolean(onClick);

  return mode === TABLE_HEADER ? (
    <th key={id} style={{width, minWidth}}>
      <div
        onClick={headerClickable ? () => onChangeSort(id, template) : null}
        className={classnames(styles.listViewHeader, { [styles.clickable]: headerClickable })}
        style={{justifyContent: ALIGN_TO_JUSTIFY[align]}}
      >
        {title || id}
        {(sortColumn === id && sortDirection !== 'none') ? <div style={{marginLeft: 8}}>
          {SORT_ICONS[sortDirection]}
        </div> : null}
      </div>
    </th>
  ) : (
    <td key={id} style={{width, minWidth}}>
      <div
        onClick={cellClickable ? () => onClick(item) : null}
        className={classnames(styles.listViewCell, { [styles.clickable]: cellClickable })}
        style={{justifyContent: ALIGN_TO_JUSTIFY[align]}}
      >
        {Boolean(template) && template(item)}
      </div>
    </td>
  );
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
export function getDefaultSort(sortTemplate, sortDirection, nullsLast = true) {
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
    'asc': 'desc',
    'desc': 'none',
    'none': 'asc'
  }[sortDirection]
};
