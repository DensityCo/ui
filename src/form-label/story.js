import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { FormLabel, ButtonGroup, InputBox, Button } from '..';

storiesOf('FormLabel', module)
  .add('Form Example', () => (
    <div>
      <p>
        A FormLabel is a mechanism for rendering a label above a form component, such as an InputBox
        or FormLabel. They are meant to be stacked vertically like this:
      </p>
      <div style={{width: 300}}>
        <FormLabel
          label="Name"
          // Just like on a HTML <label>, the `htmlFor` prop  sets the id of the element the
          // label references for accessibility purposes.
          htmlFor="name"
          input={
            <InputBox
              type="text"
              id="name" // <-- ID here
              placeholder="Joan Mccarty"
              width="100%"
            />
          }
        />
        <FormLabel
          label="Address"
          htmlFor="address1"
          input={
            <InputBox
              type="text"
              id="address1"
              placeholder="123 Oak Street"
              width="100%"
            />
          }
        />
        <FormLabel
          label="City, State, and Zip"
          htmlFor="address2"
          input={
            <InputBox
              type="text"
              id="address2"
              placeholder="New York, NY, 10001"
              width="100%"
            />
          }
        />
        <FormLabel
          label="Some Binary Choice"
          htmlFor="binary"
          input={
            <ButtonGroup>
              <Button variant="filled">Choice 1</Button>
              <Button variant="underline">Choice 2</Button>
            </ButtonGroup>
          }
        />
      </div>
    </div>
  ))
  .add('Required Input', () => (
    <div style={{width: 300}}>
      <FormLabel
        label="Name"
        htmlFor="name"
        required
        input={
          <InputBox
            type="text"
            id="name"
            placeholder="I am REQUIRED!"
            width="100%"
          />
        }
      />
    </div>
  ))
