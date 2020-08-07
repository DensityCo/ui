import '!css-loader!normalize.css';
import './styles.module.scss';
import 'moment-timezone';

import { configure, addParameters } from '@storybook/react';
addParameters({
  options: {
    panelPosition: 'bottom',
  },
});

// First story, serves as a "home page"
import '../src/welcome.js';

function loadStories() {
  // This is some stupid webpack magic. Basically, require in all files in '../src/reports.'
  // http://stackoverflow.com/questions/29891458/webpack-require-every-file-in-directory
  let contextualRequire = require.context('../src', true, /story.[jt]sx?$/);
  contextualRequire.keys().forEach(storybook => contextualRequire(storybook));
}

configure(loadStories, module);
