import React from 'react';
import { storiesOf } from '@storybook/react';

import './styles.module.scss';
import {InputStackGroup, InputStackItem} from './index';

storiesOf('InputStack', module)
  .add('With a bunch of text and password inputs', () => (
    <InputStackGroup>
      <InputStackItem type="text" placeholder="Text box" />
      <InputStackItem type="password" placeholder="Password box" />
      <InputStackItem type="password" placeholder="Another password box" />
    </InputStackGroup>
  ))
  .add('With a an invalid input', () => (
    <InputStackGroup>
      <InputStackItem type="text" placeholder="Text box" />
      <InputStackItem invalid type="text" value="I'm invalid :(" />
      <InputStackItem type="password" placeholder="Another password box" />
    </InputStackGroup>
  ))
  .add('With a single input', () => (
    <InputStackGroup>
      <InputStackItem type="text" placeholder="What's your name?" />
    </InputStackGroup>
  ))
