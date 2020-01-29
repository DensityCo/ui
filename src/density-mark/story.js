import React from 'react';
import { storiesOf } from '@storybook/react';

import DensityMark, { DensityLogo } from './index';
import { midnight } from '../../variables/colors.json';

storiesOf('DensityMark', module)
  .add('Mark', () => (
    <DensityMark />
  ))
  .add('Small Mark', () => (
    <DensityMark size={50} />
  ))
  .add('Small Mark and white', () => (
    <div style={{background: midnight, padding: 20}}>
      <DensityMark size={25} color="#fff" />
    </div>
  ))
  .add('Logo', () => (
    <DensityLogo />
  ))
  .add('Small Logo', () => (
    <DensityLogo size={25} />
  ))
  .add('Small Logo and white', () => (
    <div style={{background: midnight, padding: 20}}>
      <DensityLogo size={25} color="#fff" />
    </div>
  ))
