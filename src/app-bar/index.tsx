import React, { useContext } from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

// Classes to merge in, depending on context
const CONTEXT_CLASSES = {
  'TRANSPARENT': styles.contextTransparent,
  'BOTTOM_ACTIONS': styles.contextBottomActions,
  'CARD_HEADER': styles.cardHeader,
};

export const AppBarContext = React.createContext<string | null>(null);

export const AppBarTitle: React.FC = ({ children }) => {
  return (
    <span className={styles.appBarTitle}>
      {children}
    </span>
  );
}

export const AppBarSection: React.FC = ({ children }) => {
  return (
    <span className={styles.appBarSection}>
      {children}
    </span>
  );
}

const AppBar: React.FC<{
  padding?: React.CSSProperties['padding']
}> = ({
  padding,
  children,
}) => {
  const context = useContext(AppBarContext);
  const containerClasses = classnames(context && CONTEXT_CLASSES[context], styles.appBar);
  return (
    <div className={containerClasses} style={{ padding }}>
      {children}
    </div>
  );
}

AppBar.displayName = 'AppBar';
export default AppBar;
