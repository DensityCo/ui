import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import Tooltip from './index';

import Card, { CardHeader, CardBody } from '../card/index';
import fontVariables from '../../variables/fonts.json';

import Icons from '../icons';


storiesOf('Tooltip', module)
  .add('Alone', () => (
    <div style={{marginLeft: 50}}>
      <Tooltip
        target={<Icons.Info />}
        contents={<Fragment>
          <h3>Utilization</h3>
          <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
          <br/>
          <img src="https://i.imgur.com/jjQJZOo.png" />
        </Fragment>}
      />
    </div>
  ))
  .add('With text next to it', () => (
    <div>
      <span>
        foo bar baz this needs to be longer yea yea yea<Tooltip
          target={<Icons.Info />}
          contents={<Fragment>
            <h3>Utilization</h3>
            <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
            <br/>
            <img src="https://i.imgur.com/jjQJZOo.png" />
          </Fragment>}
        />
      </span>
    </div>
  ))
  .add('In a header of a card', () => (
    <div style={{width: 800}}>
      <Card>
        <CardHeader>
          My header with quite a long name&nbsp;
          <Tooltip
            target={<Icons.Info />}
            contents={<Fragment>
              <h3>Utilization</h3>
              <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
              <br/>
            </Fragment>}
          />
        </CardHeader>
        <CardBody>
          foo bar baz
        </CardBody>
      </Card>
    </div>
  ))
  .add('With a custom target', () => (
    <span>
      <Tooltip
        contents={<Fragment>
          <h3>Utilization</h3>
          <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
        </Fragment>}
        target={<span style={{fontFamily: fontVariables.fontBase, fontSize: 14}}>
          With custom text hover
        </span>}
      />
    </span>
  ))
  .add('In an absolutely positioned div', () => (
    <div style={{position: 'absolute', left: 300, top: 100}}>
      <Tooltip
        target={<Icons.Info />}
        contents={<Fragment>
          <h3>Utilization</h3>
          <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
        </Fragment>}
      />
    </div>
  ))
  .add('With left anchor', () => (
    <div style={{position: 'absolute', left: 300, top: 100}}>
      <Tooltip
        placement="left"
        contents={<Fragment>
          <h3>Utilization</h3>
          <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
        </Fragment>}
        target={<span style={{fontFamily: fontVariables.fontBase, fontSize: 14}}>
          With left anchor</span>}
      />
    </div>
  ))
