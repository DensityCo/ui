import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import styles from './styles.scss';
import InputBox from '../input-box';
import PhoneInputBox from './index';

storiesOf('PhoneInputBox', module)
  .add('Empty', () => (
    <div style={{display: 'flex'}}>
      <InputBox placeholder="Phone number" />
      <PhoneInputBox placeholder="Phone number" />
    </div>
  ))
  .add('With value', () => (
    <PhoneInputBox placeholder="Phone number" value="123123123" />
  ))
