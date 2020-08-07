import React, { Fragment, Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Dialogger, Button, ButtonGroup } from '..';

storiesOf('Dialogger', module)
  .add('Dialogger Test', () => (
    <Fragment>
      {/* The Dialogger should be rendered at the root of the app, and never rendered conditionally. */}
      {/* If the Dialogger is not rendered and you call any of the static methods on the Dialogger, an error will be raised! */}
      <Dialogger />

      <p>
        Click any of the below buttons to open a dialog.
      </p>
      <ButtonGroup>
        <Button onClick={() => {
          Dialogger.alert({ prompt: "Foo" }).then(() => {
            console.log('Alert closed!');
          });
        }}>
          Open Alert
        </Button>
        <Button onClick={() => {
          Dialogger.confirm({
            title: "Save changes",
            prompt: "Would you like to leave without saving?",
            confirmText: "Leave",
          }).then(confirmed => {
            console.log('Confirmed:', confirmed);
          });
        }}>
          Open Confirm
        </Button>
        <Button onClick={() => {
          Dialogger.prompt({
            title: "Favorite Ice Cream",
            prompt: "What is your favorite ice cream?",
            confirmText: "Give me some!",
            placeholder: "ex: Chocolate",
          }).then(result => {
            console.log('Typed text:', result);
          });
        }}>
          Open Prompt
        </Button>
      </ButtonGroup>
    </Fragment>
  ))
