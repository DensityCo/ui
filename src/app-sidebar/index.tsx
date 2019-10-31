import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

export default function AppSidebar({ visible, width=415, children }: any) {
  return <div
    className={classnames(styles.appSidebarCollapser, { [styles.visible]: visible })}
    style={{width: visible ? width : undefined}}
  >
    <div className={styles.appSidebar} style={{width}}>{children}</div>
  </div>;
}

AppSidebar.displayName = 'AppSidebar';
