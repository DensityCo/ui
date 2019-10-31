import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './styles.scss';
import InfoPopup, { InfoPopupCardWellHighlight } from './index';

import Card, { CardHeader, CardBody, CardWell, CardWellHighlight } from '../card/index';
import fontVariables from '../../variables/fonts.json';


storiesOf('InfoPopup', module)
  .add('Alone', () => (
    <div style={{marginLeft: 50}}>
      <InfoPopup>
        <h3>Utilization</h3>
        <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
        <br/>
        <img src="https://i.imgur.com/jjQJZOo.png" />
      </InfoPopup>
    </div>
  ))
  .add('With text next to it', () => (
    <div>
      <span>
        foo bar baz this needs to be longer yea yea yea<InfoPopup>
          <h3>Utilization</h3>
          <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
          <br/>
          <img src="https://i.imgur.com/jjQJZOo.png" />
        </InfoPopup>
      </span>
    </div>
  ))
  .add('In a header of a card', () => (
    <div style={{width: 800}}>
      <Card>
        <CardHeader>
          My header&nbsp;
          <InfoPopup>
            <h3>Utilization</h3>
            <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
            <br/>
          </InfoPopup>
        </CardHeader>
        <CardWell>
          The distance from the earth to the{' '}
          <InfoPopupCardWellHighlight verticalPopupOffset={-5} target="moon" singleLine>
            A thing in space
          </InfoPopupCardWellHighlight> is <CardWellHighlight>384,400 km</CardWellHighlight>.
        </CardWell>
        <CardBody>
          foo bar baz
        </CardBody>
      </Card>
    </div>
  ))
  .add('With a custom target', () => (
    <span>
      <InfoPopup target={<span style={{fontFamily: fontVariables.fontBase, fontSize: 14}}>
        With custom text hover
      </span>}>
        <h3>Utilization</h3>
        <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
      </InfoPopup>
    </span>
  ))
  .add('In an absolutely positioned div', () => (
    <div style={{position: 'absolute', left: 300, top: 100}}>
      <InfoPopup>
        <h3>Utilization</h3>
        <p>A measure of lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam orci, lacinia ac vestibulum ut, vehicula at eros. Pellentesque molestie eu odio nec volutpat. Fusce cursus sapien quis massa tincidunt pellentesque. Sed molestie orci a augue auctor iaculis. Donec pharetra fringilla sem in convallis. Maecenas diam nisi, hendrerit rhoncus aliquam et, bibendum et felis. Nunc nec tortor interdum, mattis lectus nec, aliquet lectus. Vivamus hendrerit pharetra metus ut pulvinar.</p>
      </InfoPopup>
    </div>
  ))
