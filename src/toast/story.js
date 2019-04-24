import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import './styles.scss';
import Toast, { ToastContext } from './index';

import Icons from '../icons';

storiesOf('Toast', module)
  .add('Default Toast', () => (
    <Toast visible onDismiss={action('onDismiss')}>
      To link a doorway with a space, drag the doorway from below to a space on the left.
    </Toast>
  ))
  .add('Error toast', () => (
    <Toast type="error" visible onDismiss={action('onDismiss')}>
      Error performing action
    </Toast>
  ))
  .add('Default Toast with multiline context', () => (
    <div style={{maxWidth: 400, width: '100%'}}>
      <ToastContext.Provider value="multiline">
        <Toast visible onDismiss={action('onDismiss')}>
          To link a doorway with a space, drag the doorway from below to a space on the left.
        </Toast>
      </ToastContext.Provider>
    </div>
  ))
  .add('Default Toast fading in and out', () => {
    function ToastCycle() {
      const [visible, set] = useState(false);
      useEffect(() => {
        const interval = window.setInterval(() => set(!visible), 2000);
        return () => window.clearInterval(interval);
      }, [visible]);

      return (
        <Toast visible={visible} onDismiss={action('onDismiss')}>
          To link a doorway with a space, drag the doorway from below to a space on the left.
        </Toast>
      );
    }
    return (
      <ToastCycle />
    );
  })
