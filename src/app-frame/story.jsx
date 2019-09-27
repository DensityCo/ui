import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AppFrame from './';

storiesOf('AppFrame', module)
  .add('With a text body', () => (
    <AppFrame><span>Test!</span></AppFrame>
  ))
