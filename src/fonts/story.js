import React from 'react';
import { storiesOf } from '@storybook/react';

import fontVariables from '../../variables/fonts.json';

import './index';
import iconFont from './index';

storiesOf('Fonts', module)
  .add('Includes fonts into the page', () => (
    <div>
      <h1>Typography</h1>
      <p style={{fontFamily: fontVariables.fontBase}}>
        This component, when imported, adds the Density standard font (Aeonik) into your page.
        Matter of fact, this text is in Aeonik!
      </p>
      <pre style={{
        background: '#eee',
        padding: 20,
        lineHeight: 2,
        borderRadius: 4
        }}>
        // Include in your javascript bundle<br/>
        import '@density/ui';
      </pre>


      <div style ={{
        display: 'flex'
      }}>
        <div style={{flexBasis: '50%', paddingLeft: 12, paddingRight: 12}}>
          <hr/>
          <p> Back of the net.Anti - pattern we have put the apim bol, temporarily so that we can later put the monitors on.Locked and loaded my supervisor didn 't like the latest revision you gave me can you switch back to the first revision? nor teams were able to drive adoption and awareness and drive awareness to increase engagement when does this sunset?.</p>
          <p>Get buy-in optics yet face time I just wanted to give you a heads-up, for deliverables. Blue sky on-brand but completeley fresh, sacred cow, nor reach out. We need to touch base off-line before we fire the new ux experience I have zero cycles for this good optics Bob called an all-hands this afternoon.</p>
          <p>If you like links, <a href="https://roundedco.com">here's your link</a>, enjoy.</p>
          <hr/>
          <p>Density supports a robust custom icon library, and we include it here as a font package in addition to the svg library</p>
          <i className={iconFont.airplay}></i>
        </div>
        <div style={{flexBasis: '50%', paddingLeft: 12, paddingRight: 12}}>
          <hr/>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>

          <p style={{fontFamily: fontVariables.fontBase, fontWeight: 'bold'}}>This text is in Aeonik bold</p>
          <p style={{fontFamily: fontVariables.fontBase, fontWeight: 500}}>This text is in Aeonik medium</p>
          <p style={{fontFamily: fontVariables.fontBase}}>This text is in Aeonik regular</p>
        </div>
        <div style={{flexBasis: '50%', paddingLeft: 12, paddingRight: 12}}>
          <hr/>
          <p>We use a the monospace variant of Aeonik to acheive perfectly aligned numbers when displayed in a tabular format.</p>
          <div style={{fontSize: 24}}>
            <p>1,200,342,002,091</p>
            <p>1,436,441,111</p>
            <p>5,200,342</p>
            <p>3,200</p>
          </div>
        </div>
      </div>
    </div>
  ), {info: {inline: false}})
