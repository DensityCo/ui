import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import styles from './styles.module.scss';
import InputBox from '../input-box';
import Navbar from './index';

import Icons from '../icons';

storiesOf('Navbar', module)
  .add('Minimum Navbar', () => (
    <div style={{display: 'flex'}}>
      <Navbar
        path='test'
        showPortfolio={false}
        showAdminMenu={false}
        showDevTools={false}
        showSensorList={false}
      />
    </div>
  ))
  .add('Navbar with app', () => (
    <div style={{display: 'flex'}}>
      <Navbar
        path='test'
        showPortfolio={true}
        showAdminMenu={true}
        showDevTools={true}
        showSensorList={true}
      />
    </div>
  ))
  .add('Navbar with nonfunctional impersonate icons', () => (
    <div style={{display: 'flex'}}>
      <Navbar
        path='test'
        showPortfolio={false}
        showAdminMenu={true}
        showDevTools={true}
        showSensorList={false}
        impersonate={
          <div style={{padding: '0px 8px'}}>
            <Icons.Security3 />
          </div>}
      />
    </div>
  ))
