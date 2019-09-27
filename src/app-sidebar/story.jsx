import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AppFrame from '../app-frame';
import AppPane from '../app-pane';
import AppSidebar from './';
import Button from '../button';

storiesOf('AppSidebar', module)
  .add('Default', () => (
    <div style={{height: 300}}>
      <AppFrame>
        <AppSidebar visible={true}>
          This is the sidebar
        </AppSidebar>
        <AppPane>
          This is a pane
        </AppPane>
      </AppFrame>
    </div>
  ))
  .add('With expand/collapse functionality', () => {
    function Wrapper() {
      const [visible, set] = useState(true);
      return (
        <div style={{height: 500}}>
          <AppFrame>
            <AppSidebar visible={visible}>
              This is the sidebar, collapse me by clicking on the button
            </AppSidebar>
            <AppPane>
              <p style={{padding: 12}}>This is a pane</p>
              <div style={{padding: 12}}>
                <Button width={200} onClick={() => set(!visible)}>Toggle sidebar</Button>
              </div>
            </AppPane>
          </AppFrame>
        </div>
      );
    }

    return (
      <Wrapper />
    );
  })
  .add('With a bigger width', () => (
    <div style={{height: 500}}>
      <AppFrame>
        <AppSidebar visible={true} width={600}>
          This is the sidebar
        </AppSidebar>
        <AppPane>
          This is a pane
        </AppPane>
      </AppFrame>
    </div>
  ))
  .add('With a smaller width', () => (
    <div style={{height: 500}}>
      <AppFrame>
        <AppSidebar visible={true} width={200}>
          This is the sidebar
        </AppSidebar>
        <AppPane>
          This is a pane
        </AppPane>
      </AppFrame>
    </div>
  ))
