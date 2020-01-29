import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './styles.module.scss';
import RadioButton, { RadioButtonContext } from './index';
import Icons from '../icons/index';
import colorVariables from '../../variables/colors.json';


storiesOf('RadioButton', module)
  .add('Two radio buttons', () => (
    <div onChange={action('Changed')}>
      <RadioButton text="Foo" name="story" value="foo" />
      <RadioButton text="Bar" name="story" value="bar" />
    </div>
  ))
  .add('Two radio buttons, one locked on, one locked off', () => (
    <div>
      <RadioButton text="Foo" name="story" value="foo" defaultChecked={true} disabled />
      <RadioButton text="Bar" name="story" value="bar" defaultChecked={false} disabled />
    </div>
  ))
  .add('Two radio buttons controlled with click action', () => (
    <div onChange={action('Clicked')}>
      <RadioButton text="Foo" name="story" value="foo" checked={true} />
      <RadioButton text="Bar" name="story" value="bar" checked={false} />
    </div>
  ))
  .add('A single radio button without a specified text value does not have a right margin', () => (
    <div style={{display: 'flex', alignItems: 'center', height: 40, backgroundColor: colorVariables.gray100}}>
      <RadioButton checked={true} />
      <div style={{marginLeft: 8}}>
        <Icons.Building />
      </div>
      <span style={{marginLeft: 8}}>Label here</span>
    </div>
  ))
  .add('With LEGACY context', () => (
    <div>
      <RadioButtonContext.Provider value="LEGACY">
        <RadioButton text="Foo" name="story" value="foo" checked={true} onChange={action('Clicked')} />
        <RadioButton text="Bar" name="story" value="bar" checked={false} onChange={action('Clicked')} />
      </RadioButtonContext.Provider>
    </div>
  ))
