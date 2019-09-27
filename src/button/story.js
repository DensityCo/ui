import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './styles.scss';
import Button, {
  ButtonContext,
  ButtonGroup,
  BUTTON_TYPE_STYLES,
  BUTTON_VARIANT_STYLES,
} from './index';
import AppBar, { AppBarContext, AppBarSection, AppBarTitle } from '../app-bar';
import colorVariables from '../../variables/colors.json';
import Icons from '../icons';

storiesOf('Button', module)
  .add('Overview', () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${Object.keys(BUTTON_VARIANT_STYLES).length}, 180px)`,
      gridTemplateRows: `repeat(${Object.keys(BUTTON_TYPE_STYLES).length}, 40px)`,
      gridGap: 10,
      marginLeft: 10,
      marginTop: 10,
    }}>
      {Object.keys(BUTTON_TYPE_STYLES).map(type => (
        <Fragment key={type}>
          {Object.keys(BUTTON_VARIANT_STYLES).map(variant => (
            <Button key={`${variant},${type}`} variant={variant} type={type}>
              {type} and {variant}
            </Button>
          ))}
        </Fragment>
      ))}
    </div>
  ))
  .add('Base button', () => (
    <Button onClick={action('Click!')}>Hello world!</Button>
  ))
  .add('Disabled button', () => (
    <Button disabled>Hello world!</Button>
  ))
  .add('Filled button', () => (
    <Button variant="filled">Hello world!</Button>
  ))
  .add('Filled danger button', () => (
    <Button variant="filled" type="danger">Hello world!</Button>
  ))
  .add('Underline button', () => (
    <Button variant="underline">Hello world!</Button>
  ))
  .add('Underline danger button', () => (
    <Button variant="underline" type="danger">Hello world!</Button>
  ))
  // .add('Button with icon', () => (
  //   <Button size="small" width={40} height={40}>
  //     <Icons.Soup />
  //   </Button>
  // ))
  .add('Two buttons in a button group', () => (
    <ButtonGroup>
      <Button variant="underline">Cancel</Button>
      <Button variant="filled">Save</Button>
    </ButtonGroup>
  ))
  .add('Two link buttons in a button group', () => (
    <ButtonGroup>
      <Button href="#" variant="filled">One</Button>
      <Button href="#" variant="filled">Two</Button>
    </ButtonGroup>
  ))
  .add('Two buttons in a button group in a bottom actions app bar', () => (
    <AppBarContext.Provider value="BOTTOM_ACTIONS">
      <AppBar>
        <AppBarSection />
        <AppBarSection>
          <ButtonGroup>
            <Button variant="underline">Cancel</Button>
            <Button variant="filled">Save</Button>
          </ButtonGroup>
        </AppBarSection>
      </AppBar>
    </AppBarContext.Provider>
  ))
  .add('Link Button', () => (
    <Button target="_blank" href="http://example.com">Go to example.com</Button>
  ))
  .add('Button with width=100%', () => (
    <Button width="100%">Hello world!</Button>
  ))
  .add('Small button', () => (
    <Button size="small">Hello world!</Button>
  ))
  .add('Large button', () => (
    <Button size="large">Hello world!</Button>
  ))
