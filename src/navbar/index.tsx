import styles from './styles.module.scss';
import Icons from '../icons';

import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import colorVariables from '../../variables/colors.json';


// Context and components for app navbar menu
export const NavbarMenuContext = React.createContext({} as any);


function NavbarMenu({
  header,
  children,
}: {
  header: React.ReactNode,
  children: React.ReactNode,
}) {
  const [opened, setOpened] = useState(false);
  const selectBoxValueRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.NavbarMenu}>
      <div
        ref={selectBoxValueRef}
        className={classnames(styles.NavbarMenuTarget, {
          [styles.opened]: opened,
        })}
        tabIndex={0}
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        onMouseDown={(e) => {
          if (opened) {
            e.preventDefault();
            selectBoxValueRef.current?.blur();
            setOpened(false);
          }
        }}
      >
        {header}
      </div>
      <nav
        className={classnames(styles.NavbarMenuItems, {
          [styles.opened]: opened,
        })}
      >
        <NavbarMenuContext.Provider
          value={{
            onMenuFocus: () => setOpened(true),
            onMenuBlur: () => setOpened(false),
          }}
        >
          {children}
        </NavbarMenuContext.Provider>
      </nav>
    </div>
  );
}


function NavbarMenuItem({
  path,
  text,
  icon,
  selected,
}: {
  path: string;
  text: string;
  icon: React.ReactNode;
  selected: boolean;
}) {
  return (
    <NavbarMenuContext.Consumer>
      {(context) => (
        <a
          className={classnames(styles.NavbarMenuItem, {
            [styles.selected]: selected,
          })}
          style={{ paddingLeft: 2 }}
          href={path}
          tabIndex={0}
          onFocus={context.onMenuFocus}
          onBlur={context.onMenuBlur}
          onClick={context.onMenuBlur}
        >
          <span className={styles.NavbarMenuItemIcon}>{icon}</span>
          {text}
        </a>
      )}
    </NavbarMenuContext.Consumer>
  );
}

// Component for top-level app navbar item
export function NavbarItem({
  selected,
  icon,
  path = undefined,
  text = undefined,
  style = {},
  onClick = undefined,
  targetBlank = false,
  beta = false,
}: {
  selected: boolean;
  icon: React.ReactNode;
  path?: string;
  text?: string | undefined;
  style?: React.CSSProperties;
  onClick?: ((event: any) => void) | undefined;
  targetBlank?: boolean;
  beta?: boolean
}) {
  return (
    <li
      className={classnames(styles.NavbarItem, {
        [styles.selected]: selected,
        [styles.iconOnly]: !text,
      })}
      style={style}
    >
      <a
        href={path}
        onClick={onClick}
        target={targetBlank ? '_blank' : undefined}
        rel="noreferrer"
      >
        {icon ? <span className={styles.NavbarIcon}>{icon}</span> : null}
        {text ? <span className={styles.NavbarText}>{text}</span> : null}
      </a>
      {beta &&
        <div className={styles.NavBarItemBetaTag}>
          Beta
        </div>
      }
    </li>
  );
}

// Define the real app navbar here
export default function Navbar({
  path,
  showPortfolio,
  showAdminMenu,
  showDevTools,
  showSensorList,
  onPrem = false,
  impersonate = null,
  environmentSwitcher = null,
  logoutUrl = 'https://densityio.auth0.com/v2/logout?returnTo=https%3A%2F%2Fdashboard.density.io%2F%23%2Flogout',
  portfolioHost = 'portfolio.density.io',
  dashboardHost = 'dashboard.density.io',
  displayHost = 'safe.density.io',
  openAreaHost = 'oa.density.io',
  supportHost = 'help.density.io',
}: {
  path: string;
  showPortfolio: boolean;
  showAdminMenu: boolean;
  showDevTools: boolean;
  showSensorList: boolean;
  onPrem?: boolean;
  impersonate?: React.ReactNode;
  environmentSwitcher?: React.ReactNode;
  logoutUrl?: string;
  portfolioHost?: string,
  dashboardHost?: string,
  displayHost?: string,
  openAreaHost?: string,
  supportHost?: string,
}) {

  // Path definitions for each navbar link
  const navbarPaths = {
    portfolio: `https://${portfolioHost}`,
    spaces: `https://${dashboardHost}/#/spaces`,
    analytics: `https://${dashboardHost}/#/analytics`,
    dashboards: `https://${dashboardHost}/#/dashboards`,
    live: `https://${dashboardHost}/#/spaces/live`,
    display: `https://${displayHost}`,
    openArea: `https://${openAreaHost}`,
    support: `https://${supportHost}`,
    admin: `https://${dashboardHost}/#/admin`,
    adminLocations: `https://${dashboardHost}/#/admin/locations`,
    adminUserManagement: `https://${dashboardHost}/#/admin/user-management`,
    adminIntegrations: `https://${dashboardHost}/#/admin/integrations`,
    adminDeveloper: `https://${dashboardHost}/#/admin/developer`,
    adminSensorStatus: `https://${dashboardHost}/#/admin/device-status`,
    account: `https://${dashboardHost}/#/account`,
  }

  return (
    <div className={styles.NavbarContainer}>
      <div className={styles.Navbar}>
        <ul className={styles.NavbarLeft}>
          <div className={styles.NavbarLogo}>
            <Icons.DensityMark
              color={colorVariables.white}
              height={14}
              width={14}
            />
          </div>
          {showPortfolio ? (
            <NavbarItem
              selected={path.startsWith(navbarPaths.portfolio)}
              path={navbarPaths.portfolio}
              icon={<Icons.Globe height={22} width={22} color="currentColor" />}
              text="Portfolio"
            />
          ) : null}
          <NavbarItem
            selected={path.startsWith(navbarPaths.spaces) && !path.startsWith(navbarPaths.live)}
            path={navbarPaths.spaces}
            icon={<Icons.Space height={22} width={22} color="currentColor" />}
            text="Spaces"
          />
          <NavbarItem
            selected={path.startsWith(navbarPaths.analytics)}
            path={navbarPaths.analytics}
            icon={<Icons.Report height={22} width={22} color="currentColor" />}
            text="Analytics"
          />
          <NavbarItem
            selected={path.startsWith(navbarPaths.dashboards)}
            path={navbarPaths.dashboards}
            icon={<Icons.Dashboard height={22} width={22} color="currentColor" />}
            text="Dashboards"
          />
          <NavbarItem
            selected={path.startsWith(navbarPaths.live)}
            path={navbarPaths.live}
            icon={<Icons.StopWatch height={22} width={22} color="currentColor" />}
            text="Live"
          />
          <NavbarItem
            selected={path.startsWith(navbarPaths.display)}
            path={navbarPaths.display}
            icon={<Icons.PersonHuddle height={22} width={22} color="currentColor" />}
            text="Displays"
          />
          <NavbarItem
            selected={path.startsWith(navbarPaths.openArea)}
            path={navbarPaths.openArea}
            icon={<Icons.DeviceSide height={22} width={22} color="currentColor" />}
            text={`Open\u00A0Area`}
            beta={true}
          />
        </ul>

        <ul className={styles.NavbarRight}>
          {environmentSwitcher}
          {impersonate}

          {/* Support link (opens in new tab) */}
          {!onPrem ? (
            <NavbarItem
              selected={path.startsWith(navbarPaths.support)}
              path={navbarPaths.support}
              targetBlank={true}
              icon={<Icons.Chat height={22} width={22} color="currentColor" />}
            />
          ) : null}

          {/* Desktop menus */}
          {showAdminMenu ? (
            <NavbarMenu
              header={
                <NavbarItem
                  selected={path.startsWith(navbarPaths.admin)}
                  icon={<Icons.Cog height={22} width={22} color="currentColor" />}
                />
              }
            >
              <NavbarMenuItem
                path={navbarPaths.adminLocations}
                text="Locations"
                icon={<Icons.Globe height={22} width={22} color="currentColor" />}
                selected={path.startsWith(navbarPaths.adminLocations)}
              />
              <NavbarMenuItem
                path={navbarPaths.adminUserManagement}
                text="User Management"
                icon={<Icons.Team height={22} width={22} color="currentColor" />}
                selected={path.startsWith(navbarPaths.adminUserManagement)}
              />
              {showDevTools && !onPrem ? (
                <NavbarMenuItem
                  path={navbarPaths.adminIntegrations}
                  text="Integrations"
                  icon={<Icons.Integrations2 height={22} width={22} color="currentColor" />}
                  selected={path.startsWith(navbarPaths.adminIntegrations)}
                />
              ) : null}
              {showDevTools ? (
                <NavbarMenuItem
                  path={navbarPaths.adminDeveloper}
                  text="Developer"
                  icon={<Icons.Code height={22} width={22} color="currentColor" />}
                  selected={path.startsWith(navbarPaths.adminDeveloper)}
                />
              ) : null}
              {showSensorList ? (
                <NavbarMenuItem
                  path={navbarPaths.adminSensorStatus}
                  text="Sensor Status"
                  icon={<Icons.Heartbeat height={22} width={22} color="currentColor" />}
                  selected={path.startsWith(navbarPaths.adminSensorStatus)}
                />
              ) : null}
            </NavbarMenu>
          ) : null}
          <NavbarMenu
            header={
              <NavbarItem
                selected={path.startsWith(navbarPaths.account)}
                icon={<Icons.Person height={22} width={22} color="currentColor" />}
              />
            }
          >
            <NavbarMenuItem
              path={navbarPaths.account}
              text="Your Account"
              icon={<Icons.Person height={22} width={22} color="currentColor" />}
              selected={path.startsWith(navbarPaths.account)}
            />
            <NavbarMenuItem
              path={logoutUrl}
              text="Logout"
              icon={<Icons.Power height={22} width={22} color="currentColor" />}
              selected={false}
            />
          </NavbarMenu>
        </ul>
      </div>
    </div>
  );
}