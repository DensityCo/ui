import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'TRANSPARENT': styles.contextTransparent,
  'BOTTOM_ACTIONS': styles.contextBottomActions,
  'CARD_HEADER': styles.cardHeader,
};

// This is a union of all the values of the CONTEXT_CLASSEiS
type ContextValues = typeof CONTEXT_CLASSES[keyof typeof CONTEXT_CLASSES];

export const AppBarContext: React.Context<ContextValues | null> = React.createContext(null);

export const AppBarTitle: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <span className={styles.appBarTitle}>
      {children}
    </span>
  );
}
AppBarTitle.displayName = 'AppBarTitle';

export const AppBarSection: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <span className={styles.appBarSection}>
      {children}
    </span>
  );
}
AppBarSection.displayName = 'AppBarSection';

const AppBar: React.FunctionComponent<{padding?: number}> = ({ padding, children }) => {
  const context = React.useContext<ContextValues>(AppBarContext);
  const containerClasses = classnames(CONTEXT_CLASSES[context], styles.appBar);
  return (
    <div className={containerClasses} style={{ padding }}>
      {children}
    </div>
  );
}
export default AppBar;
AppBar.displayName = 'AppBar';
