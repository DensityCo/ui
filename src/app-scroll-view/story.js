import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AppScrollView from './';

storiesOf('AppScrollView', module)
  .add('With a text body', () => (
    <AppScrollView>Hello, world!</AppScrollView>
  ))
