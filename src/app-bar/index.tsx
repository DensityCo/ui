import React, { useContext } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'TRANSPARENT': styles.contextTransparent,
  'BOTTOM_ACTIONS': styles.contextBottomActions,
  'CARD_HEADER': styles.cardHeader,
};

export const AppBarContext = React.createContext(null);

export function AppBarTitle({ children }: any) {
  return (
    <span className={styles.appBarTitle}>
      {children}
    </span>
  );
}

export function AppBarSection({ children }: any) {
  return (
    <span className={styles.appBarSection}>
      {children}
    </span>
  );
}

export default function AppBar({ padding, children }: any) {
  const context = useContext(AppBarContext);
  const containerClasses = classnames(CONTEXT_CLASSES[context], styles.appBar);
  return (
    <div className={containerClasses} style={{ padding }}>
      {children}
    </div>
  );
}

AppBar.displayName = 'AppBar';
