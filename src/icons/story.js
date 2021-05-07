import React from 'react';
import { storiesOf } from '@storybook/react';

import colorVariables from '../../variables/colors.json';
import fontVariables from '../../variables/fonts.json';

import Icons from './index';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';

storiesOf('Icons', module)
  .add('A sample icon', () => (
    <Icons.ImageUpload />
  ))
  .add('A sample icon in "blue" color', () => (
    <Icons.ImageUpload color={colorVariables.blue} />
  ))
  .add('A sample icon in gray300 color', () => (
    <Icons.ImageUpload color={colorVariables.gray300} />
  ))
  .add('A sample icon with color accent', () => (
    <Icons.Alert color={colorVariables.blue} accentColor={colorVariables.red} />
  ))
  .add('A sample icon in a random hex color', () => (
    <Icons.ImageUpload color="#FFBA08" />
  ))
  .add('A sample icon using "currentColor"', () => (
    <Icons.ImageUpload color="currentColor" />
  ))
  .add(`A sample icon that's sized smaller`, () => (
    <Icons.ImageUpload width={10} height={10} />
  ))
  .add(`A sample icon that's sized with percents`, () => (
    <Icons.ImageUpload width="10%" height="10%" />
  ))
  .add('All Icons', () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 275px)',
      gridTemplateRows: 'repeat(100, 30px)',
      gridGap: 10,
      marginLeft: 10,
      marginTop: 10,
    }}>
      {Object.keys(Icons).map(iconName => {
        const IconComponent = Icons[iconName];
        return <div key={iconName} style={{fontFamily: fontVariables.fontBase}}>
          <IconComponent />
          <span style={{marginLeft: 10, fontSize: 14, verticalAlign: 4, color: colorVariables.gray500}}>{iconName}</span>
        </div>;
      })}
    </div>
  ))
