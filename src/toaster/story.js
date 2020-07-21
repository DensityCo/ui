import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Toaster from './index';

import { Button, ButtonGroup, Icons } from '..';

storiesOf('Toaster', module)
  .add('Toaster Demo', () => (
    <div>
      {/* The toaster should be rendered at the root of the app, and never rendered conditionally. */}
      {/* If the Toaster is not rendered and you call `Toaster.showToast`, an error will be raised! */}
      <Toaster />

      <p>
        Click either of the below buttons to render a toast on screen.
      </p>
      <p>
        Clicking the buttons multiple times will show a stacked list of toasts.
      </p>
      <ButtonGroup>
        <Button onClick={() => Toaster.showToast({text: 'Foo'})}>Show a toast</Button>
        <Button onClick={() => Toaster.showToast({text: 'Error!', type: 'error'})}>
          Show an error toast
        </Button>
      </ButtonGroup>
    </div>
  ))
