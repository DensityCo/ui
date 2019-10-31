import React, { useContext } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'TRANSPARENT': styles.contextTransparent,
  'BOTTOM_ACTIONS': styles.contextBottomActions,
  'CARD_HEADER': styles.cardHeader,
};

export const AppBarContext = React.createContext<any>(null);

export const AppBarTitle: React.FC<any> = ({ children }) => {
  return (
    <span className={styles.appBarTitle}>
      {children}
    </span>
  );
}

export const AppBarSection: React.FC<any> = ({ children }) => {
  return (
    <span className={styles.appBarSection}>
      {children}
    </span>
  );
}

const AppBar: React.FC<any> = ({ padding, children }) => {
  const context = useContext(AppBarContext);
  const containerClasses = classnames(CONTEXT_CLASSES[context], styles.appBar);
  return (
    <div className={containerClasses} style={{ padding }}>
      {children}
    </div>
  );
}

AppBar.displayName = 'AppBar';
export default AppBar;
