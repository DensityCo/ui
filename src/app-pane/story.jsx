import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AppPane from './';

storiesOf('AppPane', module)
  .add('With a text body', () => (
    <AppPane>Hello world!</AppPane>
  ))
