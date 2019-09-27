import React from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

const AppSidebar: React.FunctionComponent<{visible: boolean, width: number | string}> = ({
	visible,
	width=415,
	children,
}) => (
  <div
    className={classnames(styles.appSidebarCollapser, { [styles.visible]: visible })}
    style={{width: visible ? width : undefined}}
  >
    <div className={styles.appSidebar} style={{width}}>{children}</div>
  </div>
);

AppSidebar.displayName = 'AppSidebar';
export default AppSidebar;
