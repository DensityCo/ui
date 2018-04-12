import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './styles.scss';
import PercentageBar from './';

const INFINITELY_LARGE_BREAK_WIDTH = 9999999999999999999;

storiesOf('PercentageBar', module)
  .addWithInfo('Just a one-hot-encoded percentage', () => (
    <div>
      <PercentageBar percentage={0} percentageFormatter={n => null} />
      <PercentageBar percentage={0} />
      <PercentageBar percentage={0.1} />
      <PercentageBar percentage={0.2} />
      <PercentageBar percentage={0.3} />
      <PercentageBar percentage={0.4} />
      <PercentageBar percentage={0.5} />
      <PercentageBar percentage={0.6} />
      <PercentageBar percentage={0.7} />
      <PercentageBar percentage={0.8} />
      <PercentageBar percentage={0.9} />
      <PercentageBar percentage={1} />
    </div>
  ))
  .addWithInfo('Custom percentageFormatter props', () => (
    <div>
      <PercentageBar percentage={0.1} percentageFormatter={n => '10%'} />
      <PercentageBar percentage={0.5} percentageFormatter={n => ':)'}/>
      <PercentageBar percentage={0.99} percentageFormatter={n => `${Math.round(n * 100)}%`} />
    </div>
  ))
  .addWithInfo('When percentage=null', () => (
    <div>
      <span style={{fontFamily: 'Sailec'}}>A null percentage:</span>
      <PercentageBar percentage={null} />
      <span style={{fontFamily: 'Sailec'}}>A null percentage + percentageFormatter that returns null:</span>
      <PercentageBar percentage={null} percentageFormatter={n => null} />
    </div>
  ))
  .addWithInfo('When collapsed', () => (
    <div>
      <PercentageBar percentage={0} percentageFormatter={n => null} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={0} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={0.1} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={0.2} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={0.3} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={0.4} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={0.5} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={0.6} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={0.7} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={0.8} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={0.9} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
      <PercentageBar percentage={1} breakWidth={INFINITELY_LARGE_BREAK_WIDTH} />
    </div>
  ))