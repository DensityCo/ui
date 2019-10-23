import React, { Fragment, useState } from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from './index';

function State({ initialState, hide, children }) {
  const [state, setState] = useState(initialState);
  return (
    <Fragment>
      {children(state, setState)}
      {!hide ? (
        <Fragment>
          <br />
          <br />
          <strong>State:</strong>
          <br />
          <pre style={{height: 300, overflow: 'auto', padding: 8, background: '#eee'}}>
            {JSON.stringify(state, null, 2)}
          </pre>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

storiesOf('Checkbox', module)
  .add('Default', () => (
    <State hide initialState={true}>
      {(state, setState) => (
        <Checkbox
          label="My Checkbox"
          checked={state}
          onChange={(e) => setState(e.target.checked)}
        />
    )}
    </State>
  ))
  .add('Disabled State', () => (
    <Fragment>
      <Checkbox
        label="Disabled Checked Checkbox"
        disabled
        checked={true}
        onChange={e => {}}
      />
      <br />
      <Checkbox
        label="Disabled Unchecked Checkbox"
        disabled
        checked={false}
        onChange={e => {}}
      />
    </Fragment>
  ))
  .add('Custom Colored Checkbox', () => (
    <State hide initialState={true}>
      {(state, setState) => (
        <Checkbox
          label="My Checkbox"
          color="#FF0000"
          checked={state}
          onChange={(e) => setState(e.target.checked)}
        />
    )}
    </State>
  ))
