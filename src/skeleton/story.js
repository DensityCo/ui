import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './styles.module.scss';
import Skeleton from './index';
import Button from '../button/index';
import colorVariables from '../../variables/colors.json';

import Icons from '../icons';

storiesOf('Skeleton', module)
  .add('Default skeleton', () => (
    <Skeleton width={300} />
  ))
  .add('Big skeleton', () => (
    <Skeleton width={300} height={24} />
  ))
  .add('Circular skeleton (square skeleton with border radius)', () => (
    <Skeleton width={32} height={32} borderRadius={16} />
  ))
  .add('Primary-colored skeleton', () => (
    <Skeleton color={colorVariables.brandPrimary} width={300} height={24} />
  ))
  .add('Skeleton in Button', () => (
    <Button type="primary" disabled>
      <Skeleton width={100} color="#fff" />
    </Button>
  ))
