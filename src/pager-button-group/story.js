import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './styles.module.scss';
import PagerButtonGroup from './index';


storiesOf('PagerButtonGroup', module)
  .add('Default view', () => (
    <PagerButtonGroup
      onClickNext={action('next')}
      onClickPrevious={action('previous')}
    />
  ))
  .add('First and last buttons', () => (
    <PagerButtonGroup
      onClickNext={action('next')}
      onClickPrevious={action('previous')}
      showFirstLastButtons
    />
  ))
  .add('Click handlers', () => (
    <PagerButtonGroup
      showFirstLastButtons
      onClickNext={action('next')}
      onClickPrevious={action('previous')}
      onClickStart={action('start')}
      onClickEnd={action('end')}
    />
  ))
  .add('Disabled buttons', () => (
    <PagerButtonGroup
      showFirstLastButtons

      disabledNext={true}
      disabledStart={true}
      disabledPrevious={true}
      disabledEnd={false}

      onClickNext={action('next')}
      onClickPrevious={action('previous')}
      onClickStart={action('start')}
      onClickEnd={action('end')}
    />
  ))
