import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

const AppSidebar: React.FC<any> = ({ visible, width=415, children }) => {
  return <div
    className={classnames(styles.appSidebarCollapser, { [styles.visible]: visible })}
    style={{width: visible ? width : undefined}}
  >
    <div className={styles.appSidebar} style={{width}}>{children}</div>
  </div>;
}

AppSidebar.displayName = 'AppSidebar';
export default AppSidebar;
